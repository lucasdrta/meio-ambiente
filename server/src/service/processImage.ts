import { Express } from 'express'
import fs from 'fs'

export class ProcessImage {
  public async saveImage (image: Express.Multer.File, email: string): Promise<void> {
    fs.writeFile(`./uploads/${email}.jpeg`, image.buffer, (err) => {
      if (err) console.log(err)
    })
  }
}
