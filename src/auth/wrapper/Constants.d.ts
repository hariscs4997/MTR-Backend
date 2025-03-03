/**
 * Basic authentication stages used to determine
 * appropriate action after redirect occurs
 */
export declare const AppStages: {
    SIGN_IN: string;
    SIGN_OUT: string;
    ACQUIRE_TOKEN: string;
};
/**
 * OpenID Connect scopes
 */
export declare const OIDCScopes: {
    OPENID: string;
    PROFILE: string;
    OFFLINE_ACCESS: string;
};
/**
 * String constants related to AAD Authority
 */
export declare const AADAuthorityConstants: {
    COMMON: string;
    ORGANIZATIONS: string;
    CONSUMERS: string;
};
/**
 * Global AAD cloud authority
 */
export declare const AuthorityStrings: {
    AAD: string;
};
/**
 * AAD Error codes
 * For more information, visit: https://login.microsoftonline.com/error
 */
export declare const ErrorCodes: {
    65001: string;
    90118: string;
};
/**
 * Various error constants
 */
export declare const ErrorMessages: {
    NOT_PERMITTED: string;
    INVALID_TOKEN: string;
    CANNOT_DETERMINE_APP_STAGE: string;
    NONCE_MISMATCH: string;
    INTERACTION_REQUIRED: string;
    TOKEN_NOT_FOUND: string;
    TOKEN_NOT_DECODED: string;
    TOKEN_NOT_VERIFIED: string;
    KEYS_NOT_OBTAINED: string;
    STATE_NOT_FOUND: string;
};
