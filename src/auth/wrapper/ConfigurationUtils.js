"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationUtils = void 0;
const msal_node_1 = require("@azure/msal-node");
const Constants_1 = require("./Constants");
class ConfigurationUtils {
}
exports.ConfigurationUtils = ConfigurationUtils;
/**
 * Validates the fields in the custom JSON configuration file
 * @param {AppSettings} config: configuration file
 */
ConfigurationUtils.validateAppSettings = (config) => {
    if (!config.credentials.clientId || config.credentials.clientId === "Enter_the_Application_Id_Here") {
        throw new Error("No clientId is provided!");
    }
    if (!config.credentials.tenantId || config.credentials.tenantId === "Enter_the_Tenant_Info_Here") {
        throw new Error("No tenantId is provided!");
    }
    if (!config.credentials.clientSecret || config.credentials.clientSecret === "Enter_the_Client_Secret_Here") {
        throw new Error("No clientSecret is provided!");
    }
    if (!config.settings.redirectUri || config.settings.redirectUri === "Enter_the_Redirect_Uri_Here") {
        throw new Error("No redirectUri is provided!");
    }
    if (!config.settings.postLogoutRedirectUri || config.settings.postLogoutRedirectUri === "Enter_the_Post_Logout_Redirect_Uri_Here") {
        throw new Error("No postLogoutRedirectUri is provided!");
    }
    if (!config.settings.homePageRoute) {
        throw new Error("No homePageRoute is provided!");
    }
};
/**
 * Maps the custom JSON configuration file to configuration
 * object expected by MSAL Node ConfidentialClientApplication
 * @param {AppSettings} config: configuration file
 * @param {ICachePlugin} cachePlugin: passed at initialization
 */
ConfigurationUtils.getMsalConfiguration = (config, cachePlugin = null) => {
    return {
        auth: {
            clientId: config.credentials.clientId,
            authority: config.policies ? config.policies.signUpSignIn.authority : Constants_1.AuthorityStrings.AAD + config.credentials.tenantId,
            clientSecret: config.credentials.clientSecret,
            knownAuthorities: config.policies ? [config.policies.authorityDomain] : [], // in B2C scenarios
        },
        cache: {
            cachePlugin,
        },
        system: {
            loggerOptions: {
                loggerCallback(loglevel, message, containsPii) {
                    console.log(message);
                },
                piiLoggingEnabled: false,
                logLevel: msal_node_1.LogLevel.Verbose,
            }
        }
    };
};
//# sourceMappingURL=ConfigurationUtils.js.map