// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext, NextFunction } from '../declarations'
import { logger } from '../logger';
export const logRuntime = async (context: HookContext, next: NextFunction) => {
  const startTime = Date.now()
  // Run everything else (other hooks and service call)
  await next();
  console.log(`Running hook log-runtime on ${context.path}.${context.method}`)
  await next()
}
