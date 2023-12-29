const router = require('express').Router();
const authController = require('./controllers/auth-controller');
const AuthController = require('./controllers/auth-controller')



router.post('/api/send-otp' , AuthController.sentOtp);
router.post('/api/verify-otp',AuthController.verifyOtp);


module.exports = router;