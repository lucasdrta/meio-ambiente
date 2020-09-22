import responseLevel1Fixture from '../fixture/response-level-1-fixture.json'

describe('Plantations functional test', () => {
  it('should return a list of plantations with owner', async () => {
    const resposne = await global.testRequest.get('/plantations')

    expect(resposne.status).toBe(200)
    expect(resposne.body).toEqual(expect.arrayContaining(responseLevel1Fixture))
  })
})
