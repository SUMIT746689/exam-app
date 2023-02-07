import mongoose from "mongoose";

const { Schema } = mongoose;

const sectorSchema = new Schema({
  role: {
    type: String,
    enum: ['category', 'sub-category'],
    default: 'sub-category',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  childs: [{ type: Schema.Types.ObjectId, ref: 'Sector' }]
})

const Sector = mongoose.model('Sector', sectorSchema)

export default Sector