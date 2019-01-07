import Joi from 'joi'

export default Joi.object().keys({
  email: Joi.string().email().label('Email'),
  username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).label('Password').options({
    language: {
      string: {
        regex: {
          base: 'Strong Password Please! aA1@'
        }
      }
    }
  })
})
