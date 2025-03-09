import Joi from 'joi';

/**
 * Collection of validation schemas for different routes
 */
export const schemas = {
  // Schema for rego validation endpoint
  regoFmt: Joi.object({
    rego_version: Joi.number().required(),
    rego_module: Joi.string().trim().required()
  }),
  
  regoRun:Joi.object({
    rego_modules: Joi.object().pattern(
      Joi.string(), 
      Joi.string().required() 
    ).required(),
    
    input: Joi.object().required(),
    
    data: Joi.object().required(),
    
    strict: Joi.boolean().default(true),
    rego_version: Joi.number().integer().required()
  })
  
};