import { Router } from 'express';
import { validate } from '../middleware/validator.js';
import axios from 'axios';
const router = Router();


// Add more routes as needed
router.post('/fmt', validate("regoFmt"), async (req, res) => {
  try {
    // Log the request for debugging
    
    // Set a specific timeout and headers
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5 seconds timeout
    };
    
    const response = await axios.post(
      'https://play.openpolicyagent.org/v1/fmt', 
      req.body,
      axiosConfig
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error calling OPA API:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: 'Request to OPA API timed out. The service may be unavailable.'
      });
    }
    
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      return res.status(error.response.status).json({
        success: false,
        message: 'Error from OPA API',
        details: error.response.data
      });
    }
    
    if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        success: false,
        message: 'No response received from OPA API'
      });
    }
    
    // Something else caused the error
    res.status(500).json({
      success: false,
      message: 'Error connecting to OPA API',
      error: error.message
    });
  }
});

router.post('/lint', validate("regoFmt"), async (req, res) => {
  try {
    // Log the request for debugging
    
    // Set a specific timeout and headers
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5 seconds timeout
    };
    
    const response = await axios.post(
      'https://play.openpolicyagent.org/v1/lint', 
      req.body,
      axiosConfig
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error calling OPA API:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: 'Request to OPA API timed out. The service may be unavailable.'
      });
    }
    
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      return res.status(error.response.status).json({
        success: false,
        message: 'Error from OPA API',
        details: error.response.data
      });
    }
    
    if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        success: false,
        message: 'No response received from OPA API'
      });
    }
    
    // Something else caused the error
    res.status(500).json({
      success: false,
      message: 'Error connecting to OPA API',
      error: error.message
    });
  }
});


router.post('/run', validate("regoRun"), async (req, res) => {
  try {
    // Log the request for debugging
    
    // Set a specific timeout and headers
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5 seconds timeout
    };
    
    const response = await axios.post(
      'https://play.openpolicyagent.org/v1/data', 
      req.body,
      axiosConfig
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error calling OPA API:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: 'Request to OPA API timed out. The service may be unavailable.'
      });
    }
    
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      return res.status(error.response.status).json({
        success: false,
        message: 'Error from OPA API',
        details: error.response.data
      });
    }
    
    if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        success: false,
        message: 'No response received from OPA API'
      });
    }
    
    // Something else caused the error
    res.status(500).json({
      success: false,
      message: 'Error connecting to OPA API',
      error: error.message
    });
  }
});


// Export the router
export const regoRouter = router;