import responseLevel1Fixture from '../fixture/response-level-1-fixture.json'

describe('Plantations functional test', () => {
  it('should return a list of plantations with owner', async () => {
    const resposne = await global.testRequest.get('/plantations')

    expect(resposne.status).toBe(200)
    expect(resposne.body).toEqual(expect.arrayContaining(responseLevel1Fixture))
  })

  it('should return successfully when create a plantation', async () => {
    const plantation = {
      owner: 'John Doe',
      location: 'Av. Paulista, 233',
      pesticide: ['a1', 'b2', 'c3', 'd4']
    }

    const response = await global.testRequest.post('/plantations').send(plantation)
    console.log(response.body)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining(plantation))
  })
})
