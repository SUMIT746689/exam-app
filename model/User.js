import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  selector_id: {
    type: String,
    required: true
  },
  agree_of_terms: {
    type: Boolean,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

export default User