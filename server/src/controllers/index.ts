import { Response } from 'express'
import mongoose from 'mongoose'
import { CUSTOM_VALIDATION } from '@src/models/user'

export abstract class BaseController {
  protected sendErrorResponse (
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error)
      res.status(clientErrors.code).send({
        code: clientErrors.code,
        message: clientErrors.error
      })
    } else {
      res.status(500).send({
        code: 500,
        message: 'Something went wrong!'
      })
    }
  }

  private handleClientErrors (
    error: mongoose.Error.ValidationError
  ): { code: number; error: string } {
    const duplicatedKindError = Object.values(error.errors).filter(
      (err) => err.kind === CUSTOM_VALIDATION.DUPLICATED
    )
    if (duplicatedKindError.length) {
      return { code: 409, error: error.message }
    }
    return { code: 400, error: error.message }
  }
}
