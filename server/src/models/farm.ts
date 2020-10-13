import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IFarm {
  _id?: string,
  owner: string,
  location: string,
  pesticide: string[]
  culture: string[],
  cnpj: string,
  donation: boolean
}

interface FarmModel extends Omit<IFarm, '_id'>, Document {}

const schema = new Schema({
  owner: {
    type: String,
    trim: true,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    trim: true
  },
  donation: {
    type: Boolean,
    required: true,
    default: false
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  culture: {
    type: [String],
    required: true,
    trim: true
  },
  pesticide: {
    type: [String],
    required: true
  }
}, {
  toJSON: {
    transform: (_, ret): void => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

export const Farm: Model<FarmModel> = mongoose.model('Farm', schema)
