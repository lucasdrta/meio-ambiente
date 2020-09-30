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

    it('should return error when a field is missing', async () => {
      const newUser = {
        email: 'john@mail.com',
        password: '1234'
      }

      const response = await global.testRequest.post('/users').send(newUser)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        code: 400,
        message: 'User validation failed: name: Path `name` is required.'
      })
    })
  })

  describe('When autheticate a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234'
      }
      await new User(newUser).save()
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: newUser.email, password: newUser.password })

      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      )
    })

    it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: 'some-email@mail.com', password: '1234' })

      expect(response.status).toBe(401)
    })

    it('Should return ANAUTHORIZED if the user is found but the password does not match', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234'
      }
      await new User(newUser).save()
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: newUser.email, password: 'Any Password' })

      expect(response.status).toBe(401)
    })
  })

  describe('When getting user profile info', () => {
    it('Should return the token\'s owner profile information', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234'
      }
      const user = await new User(newUser).save()
      const token = AuthService.generateToken(user.toJSON())
      const { body, status } = await global.testRequest
        .get('/users/me')
        .set({ 'x-access-token': token })

      expect(status).toBe(200)
      expect(body).toMatchObject(JSON.parse(JSON.stringify({ user })))
    })

    it('Should return Not Found, when the user is not found', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234'
      }

      // Usuario não perscitido no banco
      const user = new User(newUser)
      const token = AuthService.generateToken(user.toJSON())
      const { body, status } = await global.testRequest
        .get('/users/me')
        .set({ 'x-access-token': token })

      expect(status).toBe(404)
      expect(body.message).toBe('User not found!')
    })
  })
})
