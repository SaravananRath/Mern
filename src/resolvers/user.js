import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'
import { SignUp } from '../schemas_joi'
export default {
  Query: {
    users: (root, args, context, info) => {
      // TO DO auth, projection, pagination, sanitization
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // To do auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid userID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TO DO chech not auth, Validation
      await Joi.validate(args, SignUp, { abortEarly: false })
      return User.create(args)
    }
  }
}
