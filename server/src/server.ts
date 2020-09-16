import { Server } from '@overnightjs/core'
import express, { Application } from 'express'

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
    this.addControllers([])
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
