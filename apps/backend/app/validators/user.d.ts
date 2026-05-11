export declare const signupValidator: import("@vinejs/vine").VineValidator<import("@vinejs/vine").VineObject<{
    fullName: import("@vinejs/vine/schema/base/literal").NullableModifier<import("@vinejs/vine").VineString>;
    email: import("@vinejs/vine").VineString;
    password: import("@vinejs/vine").VineString;
    passwordConfirmation: import("@vinejs/vine").VineString;
}, {
    email: string;
    fullName: string | null;
    password: string;
    passwordConfirmation: string;
}, {
    email: string;
    fullName: string | null;
    password: string;
    passwordConfirmation: string;
}, {
    email: string;
    fullName: string | null;
    password: string;
    passwordConfirmation: string;
}>, Record<string, any> | undefined>;
export declare const loginValidator: import("@vinejs/vine").VineValidator<import("@vinejs/vine").VineObject<{
    email: import("@vinejs/vine").VineString;
    password: import("@vinejs/vine").VineString;
}, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>, Record<string, any> | undefined>;
