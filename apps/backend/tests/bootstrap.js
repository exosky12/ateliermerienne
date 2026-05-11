import { assert } from '@japa/assert';
import { apiClient } from '@japa/api-client';
import app from '@adonisjs/core/services/app';
import { pluginAdonisJS } from '@japa/plugin-adonisjs';
import { dbAssertions } from '@adonisjs/lucid/plugins/db';
import testUtils from '@adonisjs/core/services/test_utils';
import { authApiClient } from '@adonisjs/auth/plugins/api_client';
import { sessionApiClient } from '@adonisjs/session/plugins/api_client';
export const plugins = [
    assert(),
    pluginAdonisJS(app),
    dbAssertions(app),
    apiClient(),
    sessionApiClient(app),
    authApiClient(app),
];
export const runnerHooks = {
    setup: [],
    teardown: [],
};
export const configureSuite = (suite) => {
    if (['browser', 'functional', 'e2e'].includes(suite.name)) {
        return suite.setup(() => testUtils.httpServer().start());
    }
};
//# sourceMappingURL=bootstrap.js.map