import { TokenClaims } from "@azure/msal-common";
import { AccountInfo, AuthorizationUrlRequest, AuthorizationCodeRequest } from "@azure/msal-node";
declare module "express-session" {
    interface SessionData {
        authCodeRequest: AuthorizationUrlRequest;
        tokenRequest: AuthorizationCodeRequest;
        account: AccountInfo;
        nonce: string;
        isAuthenticated?: boolean;
        resources?: {
            [resource: string]: Resource;
        };
    }
}
export declare type AuthCodeParams = {
    authority: string;
    scopes: string[];
    state: string;
    redirect: string;
    prompt?: string;
    account?: AccountInfo;
};
export declare type Resource = {
    endpoint: string;
    scopes: string[];
};
export declare type Credentials = {
    clientId: string;
    tenantId: string;
    clientSecret: string;
};
export declare type Settings = {
    homePageRoute: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
};
export declare type AppSettings = {
    credentials: Credentials;
    settings: Settings;
    resources: {
        [resource: string]: Resource;
    };
    policies: any;
    protected: any;
};
export declare type IdTokenClaims = TokenClaims & {
    aud?: string;
};
