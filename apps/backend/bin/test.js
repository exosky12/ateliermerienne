var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
process.env.NODE_ENV = 'test';
import 'reflect-metadata';
import { Ignitor, prettyPrintError } from '@adonisjs/core';
import { configure, processCLIArgs, run } from '@japa/runner';
const APP_ROOT = new URL('../', import.meta.url);
const IMPORTER = (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return import(__rewriteRelativeImportExtension(new URL(filePath, APP_ROOT).href));
    }
    return import(__rewriteRelativeImportExtension(filePath));
};
new Ignitor(APP_ROOT, { importer: IMPORTER })
    .tap((app) => {
    app.booting(async () => {
        await import('#start/env');
    });
    app.listen('SIGTERM', () => app.terminate());
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate());
})
    .testRunner()
    .configure(async (app) => {
    const { runnerHooks, ...config } = await import('../tests/bootstrap.js');
    processCLIArgs(process.argv.splice(2));
    configure({
        ...app.rcFile.tests,
        ...config,
        ...{
            setup: runnerHooks.setup,
            teardown: runnerHooks.teardown.concat([() => app.terminate()]),
        },
    });
})
    .run(() => run())
    .catch((error) => {
    process.exitCode = 1;
    prettyPrintError(error);
});
//# sourceMappingURL=test.js.map