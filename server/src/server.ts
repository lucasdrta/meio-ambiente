import './utils/module-alias'
import { Server } from '@overnightjs/core'
import cors from 'cors'
import express, { Application } from 'express'
import { FarmsController } from '@src/controllers/farm'
import { UsersController } from './controllers/users'
import * as database from './database'
import bodyParser from 'body-parser'
import multer from 'multer'
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
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use('/users', multer().single('file'))
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
