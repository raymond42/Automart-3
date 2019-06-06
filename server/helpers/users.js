import Joi from 'joi';


// signup
const validateUserSignup = {

  validation(newUser) {
    const newUserSchema = {
      email: Joi.string().email().trim().required(),
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().min(3).required(),
      password: Joi.string().min(6).max(12).required(),
      address: Joi.string().required(),
      is_admin: Joi.boolean(),
    };
    return Joi.validate(newUser, newUserSchema);
  },

};

export default validateUserSignup;
