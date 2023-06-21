"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRuntime = void 0;
const logRuntime = async (context, next) => {
    const startTime = Date.now();
    // Run everything else (other hooks and service call)
    await next();
    console.log(`Running hook log-runtime on ${context.path}.${context.method}`);
    await next();
};
exports.logRuntime = logRuntime;
//# sourceMappingURL=log-runtime.js.map