import { ServerSetup } from '@src/server'
import supertest from 'supertest'

let server: ServerSetup

beforeAll(async () => {
  server = new ServerSetup()
  await server.init()
  global.testRequest = supertest(server.getApp())
})

// afterAll(async () => {
//   await server.close()
// })
