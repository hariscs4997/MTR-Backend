import { Request, Response, NextFunction } from "express";
import { ConfidentialClientApplication, Configuration, ICachePlugin } from '@azure/msal-node';
import { AppSettings } from './Types';
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
export declare class AuthProvider {
    appSettings: AppSettings;
    msalConfig: Configuration;
    msalClient: ConfidentialClientApplication;
    private cryptoProvider;
    constructor(appSettings: AppSettings, cache?: ICachePlugin);
    /**
     * Initiate sign in flow
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     */
    signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Initiate sign out and clean the session
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     */
    signOut: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    /**
     * Middleware that handles redirect depending on request state
     * There are basically 2 stages: sign-in and acquire token
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     */
    handleRedirect: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    /**
     * Middleware that gets tokens and calls web APIs
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     */
    getToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Check if authenticated in session
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     */
    isAuthenticated: (req: Request, res: Response, next: NextFunction) => Response | void;
    /**
     * This method is used to generate an auth code request
     * @param {Request} req: express request object
     * @param {Response} res: express response object
     * @param {NextFunction} next: express next
     * @param {AuthCodeParams} params: modify auth code url request
     */
    private getAuthCode;
    /**
     * Util method to get the resource name (appSettings.json)
     * @param {string} path: route path
     */
    private getResourceName;
}
