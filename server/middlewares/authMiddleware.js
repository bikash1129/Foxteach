const jwt=require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is missing',
        success: false,
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.id = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid or expired token',
        success: false,
      });
    }
  };
  module.exports=isAuthenticated;