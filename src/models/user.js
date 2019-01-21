import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.unique({ email }),
      message: ({ value }) => `Email ${value} already exists` // To do security
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.unique({ username }),
      message: ({ value }) => `Username ${value} already exists` // To do security
    }
  },
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

userSchema.statics.unique = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const User = mongoose.model('User', userSchema)
export default User
