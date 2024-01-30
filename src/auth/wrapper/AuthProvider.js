"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const msal_common_1 = require("@azure/msal-common");
const msal_node_1 = require("@azure/msal-node");
const ConfigurationUtils_1 = require("./ConfigurationUtils");
const Constants_1 = require("./Constants");
const constants = __importStar(require("./Constants"));
/**
 * A simple wrapper around MSAL Node ConfidentialClientApplication object.
 * It offers a collection of middleware and utility methods that automate
 * basic authentication and authorization tasks in Express MVC web apps.
 *
 * You must have express and express-sessions packages installed. Middleware here
 * can be used with express sessions in route controllers.
 *
 * Session variables accessible are as follows:
    * req.session.isAuthenticated: boolean
    * req.session.account: AccountInfo
    * req.session.<resourceName>.accessToken: string
 */
class AuthProvider {
    constructor(appSettings, cache = null) {
        // ========== MIDDLEWARE ===========
        /**
         * Initiate sign in flow
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         */
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /**
             * Request Configuration
             * We manipulate these two request objects below
             * to acquire a token with the appropriate claims
             */
            if (!req.session["authCodeRequest"]) {
                req.session.authCodeRequest = {
                    authority: "",
                    scopes: [],
                    state: {},
                    redirectUri: "",
                };
            }
            if (!req.session["tokenRequest"]) {
                req.session.tokenRequest = {
                    authority: "",
                    scopes: [],
                    redirectUri: "",
                    code: "",
                };
            }
            // signed-in user's account
            if (!req.session["account"]) {
                req.session.account = {
                    homeAccountId: "",
                    environment: "",
                    tenantId: "",
                    username: "",
                    idTokenClaims: {},
                };
            }
            // random GUID for csrf check 
            req.session.nonce = this.cryptoProvider.createNewGuid();
            /**
             * The OAuth 2.0 state parameter can be used to encode information of the app's state before redirect.
             * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
             * MSAL allows you to pass your custom state as state parameter in the request object. For more information, visit:
             * https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request
             */
            const state = this.cryptoProvider.base64Encode(JSON.stringify({
                stage: constants.AppStages.SIGN_IN,
                path: req.route.path,
                nonce: req.session.nonce
            }));
            const params = {
                authority: this.msalConfig.auth.authority,
                scopes: msal_common_1.OIDC_DEFAULT_SCOPES,
                state: state,
                redirect: this.appSettings.settings.redirectUri,
                prompt: msal_common_1.PromptValue.SELECT_ACCOUNT,
            };
            // initiate the first leg of auth code grant to get token
            this.getAuthCode(req, res, next, params);
        });
        /**
         * Initiate sign out and clean the session
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         */
        this.signOut = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /**
             * Construct a logout URI and redirect the user to end the
             * session with Azure AD/B2C. For more information, visit:
             * (AAD) https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc#send-a-sign-out-request
             * (B2C) https://docs.microsoft.com/azure/active-directory-b2c/openid-connect#send-a-sign-out-request
             */
            const logoutURI = `${this.msalConfig.auth.authority}/oauth2/v2.0/logout?post_logout_redirect_uri=${this.appSettings.settings.postLogoutRedirectUri}`;
            req.session.isAuthenticated = false;
            req.session.destroy(() => {
                res.redirect(logoutURI);
            });
        });
        /**
         * Middleware that handles redirect depending on request state
         * There are basically 2 stages: sign-in and acquire token
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         */
        this.handleRedirect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.query.state) {
                const state = JSON.parse(this.cryptoProvider.base64Decode(req.query.state));
                // check if nonce matches
                if (state.nonce === req.session.nonce) {
                    switch (state.stage) {
                        case constants.AppStages.SIGN_IN: {
                            // token request should have auth code
                            req.session.tokenRequest.code = req.query.code;
                            try {
                                // exchange auth code for tokens
                                const tokenResponse = yield this.msalClient.acquireTokenByCode(req.session.tokenRequest);
                                // assign session variables
                                req.session.account = tokenResponse.account;
                                req.session.isAuthenticated = true;
                                return res.redirect(302, this.appSettings.settings.homePageRoute);
                            }
                            catch (error) {
                                console.log(error);
                                next(error);
                            }
                            break;
                        }
                        case constants.AppStages.ACQUIRE_TOKEN: {
                            // get the name of the resource associated with scope
                            const resourceName = this.getResourceName(state.path);
                            req.session.tokenRequest.code = req.query.code;
                            try {
                                const tokenResponse = yield this.msalClient.acquireTokenByCode(req.session.tokenRequest);
                                // console.log("\nResponse: \n:", tokenResponse);
                                req.session[resourceName].accessToken = tokenResponse.accessToken;
                                req.session.save();
                                return res.status(200).redirect(state.path);
                            }
                            catch (error) {
                                // console.log(error);
                                next(error);
                            }
                            break;
                        }
                        default:
                            res.status(500).send(Constants_1.ErrorMessages.CANNOT_DETERMINE_APP_STAGE);
                            break;
                    }
                }
                else {
                    // console.log(Constants_1.ErrorMessages.NONCE_MISMATCH);
                    res.status(401).send(Constants_1.ErrorMessages.NOT_PERMITTED);
                }
            }
            else {
                // console.log(Constants_1.ErrorMessages.STATE_NOT_FOUND);
                res.status(401).send(Constants_1.ErrorMessages.NOT_PERMITTED);
            }
        });
        /**
         * Middleware that gets tokens and calls web APIs
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         */
        this.getToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // get scopes for token request
            const scopes = this.appSettings.resources.graphAPI.scopes;
            const resourceName = this.getResourceName(req.route.path);
            if (!req.session[resourceName]) {
                req.session[resourceName] = {
                    accessToken: null,
                };
            }
            try {
                const tokenCache = yield this.msalClient.getTokenCache();
                const account = yield tokenCache.getAccountByHomeId(req.session.account.homeAccountId);
                const silentRequest = {
                    account: account,
                    scopes: scopes,
                };
                try {
                    // acquire token silently to be used in resource call
                    const tokenResponse = yield this.msalClient.acquireTokenSilent(silentRequest);
                    // console.log("\nSuccessful silent token acquisition:\n Response: \n:", tokenResponse);
                    // In B2C scenarios, sometimes an access token is returned empty.
                    // In that case, we will acquire token interactively instead.
                    if (tokenResponse.accessToken.length === 0) {
                        // console.log(Constants_1.ErrorMessages.TOKEN_NOT_FOUND);
                        throw new msal_common_1.InteractionRequiredAuthError(Constants_1.ErrorMessages.INTERACTION_REQUIRED);
                    }
                    req.session[resourceName].accessToken = tokenResponse.accessToken;
                }
                catch(ex) {
                    // Token couldn't be accessed, but account exists
                    // This could happen with guest accounts
                    if (!account) {
                        throw ex;
                    }
                    else {
                        console.log("Guest Account Detected!");
                    }
                }
                next();
            }
            catch (error) {
                // in case there are no cached tokens, initiate an interactive call
                if (error instanceof msal_common_1.InteractionRequiredAuthError) {
                    const state = this.cryptoProvider.base64Encode(JSON.stringify({
                        stage: constants.AppStages.ACQUIRE_TOKEN,
                        path: req.route.path,
                        nonce: req.session.nonce
                    }));
                    const params = {
                        authority: this.msalConfig.auth.authority,
                        scopes: scopes,
                        state: state,
                        redirect: this.appSettings.settings.redirectUri,
                        account: req.session.account,
                    };
                    // initiate the first leg of auth code grant to get token
                    this.getAuthCode(req, res, next, params);
                }
                else {
                    next(error);
                }
            }
        });
        // ============== GUARD ===============
        /**
         * Check if authenticated in session
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         */
        this.isAuthenticated = (req, res, next) => {
            if (req.session) {
                if (!req.session.isAuthenticated) {
                    return res.status(401).send(Constants_1.ErrorMessages.NOT_PERMITTED);
                }
                next();
            }
            else {
                res.status(401).send(Constants_1.ErrorMessages.NOT_PERMITTED);
            }
        };
        // ============== UTILS ===============
        /**
         * This method is used to generate an auth code request
         * @param {Request} req: express request object
         * @param {Response} res: express response object
         * @param {NextFunction} next: express next
         * @param {AuthCodeParams} params: modify auth code url request
         */
        this.getAuthCode = (req, res, next, params) => __awaiter(this, void 0, void 0, function* () {
            // prepare the request
            req.session.authCodeRequest.authority = params.authority;
            req.session.authCodeRequest.scopes = params.scopes;
            req.session.authCodeRequest.state = params.state;
            req.session.authCodeRequest.redirectUri = params.redirect;
            req.session.tokenRequest.authority = params.authority;
            req.session.tokenRequest.redirectUri = params.redirect;
            req.session.tokenRequest.scopes = params.scopes;
            // request an authorization code to exchange for tokens
            try {
                const response = yield this.msalClient.getAuthCodeUrl(req.session.authCodeRequest);
                res.redirect(response);
            }
            catch (error) {
                // console.log(JSON.stringify(error));
                next(error);
            }
        });
        /**
         * Util method to get the resource name for a given (appSettings.json)
         * @param {string} path: route path
         */
        this.getResourceName = (path) => {
            return "graphAPI";
        };
        ConfigurationUtils_1.ConfigurationUtils.validateAppSettings(appSettings);
        this.cryptoProvider = new msal_node_1.CryptoProvider();
        this.appSettings = appSettings;
        this.msalConfig = ConfigurationUtils_1.ConfigurationUtils.getMsalConfiguration(appSettings, cache);
        this.msalClient = new msal_node_1.ConfidentialClientApplication(this.msalConfig);
    }
}
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=AuthProvider.js.map