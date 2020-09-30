import { ServerSetup } from './server'
import config from 'config'

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  )
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason
});

(async (): Promise<void> => {
  const server = new ServerSetup(config.get('App.port'))
  await server.init()
  server.start()
})()
