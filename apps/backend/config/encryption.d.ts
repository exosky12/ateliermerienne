declare const encryptionConfig: import("@adonisjs/core/types").ConfigProvider<{
    default?: "gcm" | undefined;
    list: {
        gcm: import("@adonisjs/core/types/encryption").EncryptionConfig;
    };
}>;
export default encryptionConfig;
declare module '@adonisjs/core/types' {
    interface EncryptorsList extends InferEncryptors<typeof encryptionConfig> {
    }
}
