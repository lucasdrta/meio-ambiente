import { Controller, Get, Post } from '@overnightjs/core'
import { Farm } from '@src/models/farm'
import { Request, Response } from 'express'
import { BaseController } from '.'

@Controller('farms')
export class FarmsController extends BaseController {
  @Get('')
  public async getFarms (req: Request, res: Response): Promise<void> {
    try {
      const farms = await Farm.find()
      res.status(200).send(farms)
    } catch (error) {
      this.sendErrorResponse(res, error)
    }
  }

  @Post('')
  public async create (req: Request, res: Response): Promise<void> {
    try {
      const farm = await new Farm(req.body).save()
      res.status(201).send(farm)
    } catch (error) {
      this.sendErrorResponse(res, error)
    }
  }
}
