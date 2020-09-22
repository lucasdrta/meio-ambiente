import './utils/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import { PlantationsController } from '@src/controllers/plantations'

export class ServerSetup extends Server {
  constructor (private port = 3000) {
    super()
  }

  public async init (): Promise<void> {
    this.setupExpress()
    this.setupControllers()
  }

  private setupExpress (): void {
    this.app.use(express.json())
  }

  private setupControllers (): void {
    const plantationsController = new PlantationsController()
    this.addControllers([plantationsController])
  }

  public start (): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }

  public getApp (): Application {
    return this.app
  }
}
