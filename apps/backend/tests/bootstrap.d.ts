import type { Config } from '@japa/runner/types';
import type { Registry } from '../.adonisjs/client/registry/schema.d.ts';
declare module '@japa/api-client/types' {
    interface RoutesRegistry extends Registry {
    }
}
export declare const plugins: Config['plugins'];
export declare const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>>;
export declare const configureSuite: Config['configureSuite'];
