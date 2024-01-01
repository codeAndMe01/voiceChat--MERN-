const otpService = require('../services/otp-services')
const hashService = require('../services/hash-service'); 
const otpServices = require('../services/otp-services');
const userService = require('../services/user-service') 
const tokenService = require('../services/token-service') 
const UserDto = require('../dtos/user-dto')



class AuthController{
       async sentOtp(req, res) {
        const { phone } = req.body;

        try {
            if (!phone) {
                throw new Error('Phone Number not Received');
            }

            const otp = await otpService.generateOtp();

            // passing and expiring time of data
            const ttl = 1000 * 60 * 2;
            const expires = Date.now() + ttl;
            const data = `${phone} + ${otp} + ${expires}`;

            const hash = hashService.hashOtp(data);

            // Uncomment this line if/when needed
            // await otpServices.sendBySms(phone, otp);

            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            });
        } catch (error) {
            console.error(error);

            // Handle different error cases with appropriate status codes
            if (error.message === 'Phone Number not Received') {
                res.status(400).json({ message: 'Phone Number not Received' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }


   
    async verifyOtp(req,res){
         
        const {otp,hash, phone} = req.body;

        if(!otp || !hash || !phone){
            res.status(400).json({message:'All fields are required'})
        }

        const [hastedOtp,expires] = hash.split('.');
        if(Date.now() > +expires) {
            res.status(400).json({message: 'OTP expired'})
        }

        const data = `${phone} + ${otp} + ${expires}`;

        const isValid = otpService.verifyOtp(hastedOtp,data);

        if(!isValid){
            res.status(400).json({message : 'Invalid OTP'});
        }

        let user;
       
        try{
           
            user = await userService.findUser({phone});

            if(!user){
               user =  await userService.createUser({phone})
            }

        }
        catch(err){
         console.log(err);

         res.status(500).json({message: 'Db error'})
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });  

            await tokenService.storeRefreshToken(refreshToken,user._id)
        
             res.cookie('refreshToken',refreshToken,{
                maxAge : 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
             });


             res.cookie('accessToken',accessToken,{
                maxAge : 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
             });


             const userDto = new UserDto(user);  

             res.json({user:userDto , auth:true})

    }


    async refresh(req,res){
       
        const {refreshToken : refreshTokenFromCookie} = req.cookies;

        //check if token is valid

        let userData;
        try {
            userData = await tokenService.verifyRefreshToken( refreshTokenFromCookie );
        } catch (error) {
            return res.status(401).json({message:"Invalid token"})
        }

        //check for trhe token in DB
        
        try {
           
           const token = await tokenService.findRefreshToken(userData._id , refreshTokenFromCookie);

            if(!token){
                return res.status(401).json({message: 'Invalid token'})
            }
        
        } catch (error) {
            return res.status(500).json({message: 'Internal error'})
        } 

        //check if valid user
        const user = await userService.findUser({_id:userData._id});

        if(!user){
            return res.status(404).json({message: 'No user'});
        }

        //Generate-new Tokens
        const {refreshToken, accessToken} = tokenService.generateTokens({_id:userData._id});

        //update token
        try {
             
            await tokenService.updateRefreshToken(userData._id,refreshToken);

        } catch (error) {
            return res.status(500).json({message : 'Internal error'});
        }

        // put in cookie
        res.cookie('refreshToken',refreshToken,{
            maxAge : 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
         });


         res.cookie('accessToken',accessToken,{
            maxAge : 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
         });

         //response to client
         const userDto = new UserDto(user);  
         res.json({user:userDto , auth:true})

    }

    async logout(req,res){
         
        const { refreshToken } = req.cookies;
        
        //delete refresh token from DB
        await tokenService.removeToken(refreshToken);
       
        //delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user: null, auth: false})
    } 

}

module.exports = new AuthController();