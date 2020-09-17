import { ServerSetup } from './server'
import config from 'config'

(async (): Promise<void> => {
  const server = new ServerSetup(config.get('App.port'))
  await server.init()
  await server.start()
})()
