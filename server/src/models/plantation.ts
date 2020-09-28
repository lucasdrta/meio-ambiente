import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IPlantation {
  _id?: string,
  owner: string,
  location: string,
  pesticide: string[]
}

interface PlantationModel extends Omit<IPlantation, '_id'>, Document {}

const schema = new Schema({
  owner: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: String,
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

export const Plantation: Model<PlantationModel> = mongoose.model('Plantation', schema)
