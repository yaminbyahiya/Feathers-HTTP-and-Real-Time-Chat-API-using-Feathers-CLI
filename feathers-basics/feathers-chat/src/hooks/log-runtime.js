import { logger } from "../logger"
export const logRuntime = async (context, next) => {
  const startTime = Date.now();
  await next();
  const duration = Date.now() - startTime;
  logger.info(`Calling ${context.method} on ${context.path} took ${duration}ms`);
  console.log(`Running hook log-runtime on ${context.path}.${context.method}`)
  // await next()
}
