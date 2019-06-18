import Joi from 'joi';


// signup
const validateUserSignup = {

  validation(newUser) {
    const newUserSchema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
      first_name: Joi.string().trim().min(3).required(),
      last_name: Joi.string().trim().min(3).required(),
      password: Joi.string().min(6).max(12).required(),
      address: Joi.string().trim().required(),
    };
    return Joi.validate(newUser, newUserSchema);
  },

};

export default validateUserSignup;
