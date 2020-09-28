import { Controller, Get, Post } from '@overnightjs/core'
import { Plantation } from '@src/models/plantation'
import { Request, Response } from 'express'

@Controller('plantations')
export class PlantationsController {
  @Get('')
  public async getPlantations (req: Request, res: Response): Promise<void> {
    res.status(200).send([
      {
        id: '632g323832g',
        location: 'Av Paulista, 2500',
        owner: 'Francisco da Silva Santos'
      },
      {
        id: 'rry48d334fr832g',
        location: 'Av Rebouças, 200',
        owner: 'Mario de Andrade'
      },
      {
        id: '3fhu95423832g',
        location: 'Rua da Consolação, 678',
        owner: 'Augusto Soares'
      },
      {
        id: '456465f95423832g',
        location: 'Rua da Consolação, 678',
        owner: 'Silvia Maria'
      }
    ]
    )
  }

  @Post('')
  public async create (req: Request, res: Response): Promise<void> {
    try {
      const plantation = await new Plantation(req.body).save()
      res.status(201).send(plantation)
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message
      })
    }
  }
}
