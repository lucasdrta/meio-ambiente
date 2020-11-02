import './utils/module-alias'
import { Server } from '@overnightjs/core'
import cors from 'cors'
import express, { Application } from 'express'
import { FarmsController } from '@src/controllers/farm'
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
    this.app.use(cors())
  }

  private setupControllers (): void {
    const plantationsController = new FarmsController()
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
