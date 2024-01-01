const router = require('express').Router();
const AuthController = require('./controllers/auth-controller')
const ActivateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const authController = require('./controllers/auth-controller');




router.post('/api/send-otp' , AuthController.sentOtp);
router.post('/api/verify-otp',AuthController.verifyOtp);
router.post('/api/activate' ,authMiddleware, ActivateController.activate)
router.get('/api/refresh',AuthController.refresh);
router.post('/api/logout',authMiddleware,authController.logout)


module.exports = router;