import { User } from '@src/models/user'
import AuthService from '@src/service/auth'

describe('User functional test', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('When create a user', () => {
    it('should successfully create a new user with encrypted password', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234'
      }

      const response = await global.testRequest.post('/users').send(newUser)

      expect(response.status).toBe(201)
      await expect(
        AuthService.comparePasswords(newUser.password, response.body.password)
      ).resolves.toBeTruthy()
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ password: expect.any(String) }
        })
      )
    })
  })
})
