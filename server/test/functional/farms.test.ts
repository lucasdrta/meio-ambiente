import { Farm } from '@src/models/farm'

describe('Farm functional test', () => {
  beforeEach(async () => {
    await Farm.deleteMany({})
  })

  it('should return a list of farms with owner', async () => {
    const farm = {
      location: 'Av Paulista, 2500',
      owner: 'Francisco da Silva Santos',
      pesticide: ['a1', 'a2', 'a3', 'a4'],
      donation: true,
      cnpj: '35358070000109',
      culture: ['soja']
    }

    await new Farm(farm).save()
    const resposne = await global.testRequest.get('/farms')

    expect(resposne.status).toBe(200)
    expect(resposne.body).toEqual(
      expect.arrayContaining([
        {
          ...farm,
          ...{ id: expect.any(String) }
        }
      ])
    )
  })

  it('should return successfully when create a farm', async () => {
    const farm = {
      location: 'Av Paulista, 2500',
      owner: 'Francisco da Silva Santos',
      pesticide: ['a1', 'a2', 'a3', 'a4'],
      donation: true,
      cnpj: '35358070000109',
      culture: ['soja']
    }

    const response = await global.testRequest.post('/farms').send(farm)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining(farm))
  })
})
