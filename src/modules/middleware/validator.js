import { schemas } from './validationSchemas.js';

/**
 * Generic validation middleware factory
 * Creates a middleware function for validating with the specified schema
 * 
 * @param {string} schemaName - Name of the schema to use from the schemas object
 * @returns {Function} Express middleware function
 */
export function validate(schemaName) {
  if (!schemas[schemaName]) {
    throw new Error(`Schema '${schemaName}' not found`);
  }
  
  return (req, res, next) => {
    // Ensure we have a body to validate
    // if (!req.body || Object.keys(req.body).length === 0) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Request body is empty',
    //     errors: [{ field: 'body', message: 'Request body is required' }]
    //   });
    //   // Make sure next() is not called
    //   return;
    // }
    
    const schema = schemas[schemaName];
    const options = {
      abortEarly: false,
      stripUnknown: true
    };
    
    try {
      const { error, value } = schema.validate(req.body, options);
      
      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message.replace(/["]/g, "'")
        }));
        
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
        // Make sure next() is not called
        return;
      }
      
      // Replace req.body with validated and sanitized data
      req.body = value;
      next();
    } catch (err) {
      // Handle any unexpected errors in validation
      console.error('Validation error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error during validation'
      });
      // Make sure next() is not called
      return;
    }
  };
}