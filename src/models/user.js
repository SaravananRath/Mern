import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.where({ email }).countDocuments() === 0,
      message: ({ value }) => `${value} already exists`
    }
  },
  username: String,
  name: String,
  password: String
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

const User = mongoose.model('User', userSchema)
export default User
