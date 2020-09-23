import './utils/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import { PlantationsController } from '@src/controllers/plantations'
import { UsersController } from './controllers/users'
import * as database from './database'

export class ServerSetup extends Server {
  constructor (private port = 3000) {
    super()
  }

  public async init (): Promise<void> {
    this.setupExpress()
    this.setupControllers()
    await this.setupDatabase()
  }

  private setupExpress (): void {
    this.app.use(express.json())
  }

  private setupControllers (): void {
    const plantationsController = new PlantationsController()
    const usersController = new UsersController()
    this.addControllers([plantationsController, usersController])
  }

  private async setupDatabase (): Promise<void> {
    await database.connect()
  }

  public async close (): Promise<void> {
    await database.close()
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
