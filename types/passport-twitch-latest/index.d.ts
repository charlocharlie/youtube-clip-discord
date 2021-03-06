// Type definitions for passport-twitch-latest 1.0
// Project: https://github.com/sascha-beloborodov/passport-twitch
// Definitions by: Charlie Laabs <https://github.com/claabs>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.5
declare module 'passport-twitch-latest' {

    import PassportOauth2 from 'passport-oauth2';
    import * as passport from 'passport';
    import * as e from 'express';


    export class Strategy extends PassportOauth2 {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);

        userProfile(accessToken: string, done: (err?: Error | null, profile?: TwitchProfile) => void): void;
        authorize(strategy: string | string[], callback?: (...args: any[]) => any): AuthenticateRet;
        authorize(
            strategy: string | string[],
            options: AuthenticateOptions,
            callback?: (...args: any[]) => any,
        ): AuthenticateRet;
        authenticate(req: e.Request, options?: AuthenticateOptions): void;
    }

    export class OAuth2Strategy extends Strategy {}

    export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

    export type StrategyOptions = Optional<PassportOauth2.StrategyOptions, 'authorizationURL' | 'tokenURL'>;
    export type StrategyOptionsWithRequest = Optional<
        PassportOauth2.StrategyOptionsWithRequest,
        'authorizationURL' | 'tokenURL'
    >;

    export type VerifyFunction =
        | ((
            accessToken: string,
            refreshToken: string,
            profile: TwitchProfile,
            verified: PassportOauth2.VerifyCallback,
        ) => void)
        | ((
            accessToken: string,
            refreshToken: string,
            results: any,
            profile: TwitchProfile,
            verified: PassportOauth2.VerifyCallback,
        ) => void);
    export type VerifyFunctionWithRequest =
        | ((
            req: e.Request,
            accessToken: string,
            refreshToken: string,
            profile: TwitchProfile,
            verified: PassportOauth2.VerifyCallback,
        ) => void)
        | ((
            req: e.Request,
            accessToken: string,
            refreshToken: string,
            results: any,
            profile: TwitchProfile,
            verified: PassportOauth2.VerifyCallback,
        ) => void);

    export interface TwitchProfile {
        id: string;
        login: string;
        display_name: string;
        type: string;
        broadcaster_type: string;
        description: string;
        profile_image_url: string;
        offline_image_url: string;
        view_count: number;
        provider: string;
    }

    export interface AuthenticateOptions extends passport.AuthenticateOptions {
        forceVerify?: boolean;
    }

    export interface AuthenticateRet {
        force_verify?: boolean;
    }

}