import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  year: Joi.number().min(1900).max(2024).required(),
  gender: Joi.string().valid('male', 'female').required(),
  onDuty: Joi.boolean(),
});

export const replaceStudentSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  year: Joi.number().min(1900).max(2024),
  gender: Joi.string().valid('male', 'female'),
  onDuty: Joi.boolean(),
});
