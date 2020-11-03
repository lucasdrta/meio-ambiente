import AuthService from '@src/service/auth'
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  position: string,
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

interface UserModel extends Omit<IUser, '_id'>, Document {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, 'Email must be unique']
    },
    position: {
      type: String,
      required: true,
      trim: true,
      default: 'public'
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)

schema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email })
    return !emailCount
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
)

schema.pre<UserModel>('save', async function (): Promise<void> {
  if (!this.password || !this.isModified('password')) return

  try {
    const hashedPassword = await AuthService.hashPassword(this.password)
    this.password = hashedPassword
  } catch (error) {
    console.error(`Error hashing the password for the user ${this.name}`)
  }
})

export const User: Model<UserModel> = mongoose.model('User', schema)
