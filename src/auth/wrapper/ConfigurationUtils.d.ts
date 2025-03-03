import { Configuration, ICachePlugin } from '@azure/msal-node';
import { AppSettings } from './Types';
export declare class ConfigurationUtils {
    /**
     * Validates the fields in the custom JSON configuration file
     * @param {AppSettings} config: configuration file
     */
    static validateAppSettings: (config: AppSettings) => void;
    /**
     * Maps the custom JSON configuration file to configuration
     * object expected by MSAL Node ConfidentialClientApplication
     * @param {AppSettings} config: configuration file
     * @param {ICachePlugin} cachePlugin: passed at initialization
     */
    static getMsalConfiguration: (config: AppSettings, cachePlugin?: ICachePlugin) => Configuration;
}
