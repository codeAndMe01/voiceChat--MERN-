const crypto = require('crypto');
const hashService = require('./hash-service')

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;


const twilio = require('twilio')('ACf241df3c4803bdfc52f3dc9d99e60733', 'f3fed5b76dd8f9b3ed9fe63860070898',{
   lazyLoading:true
});


class OtpService{
   async generateOtp(){

    const buffer = crypto.randomBytes(2);

    // Read the 16 bits as an unsigned integer
    const randomInt = buffer.readUInt16LE(0);
  
    // Map the random integer to a 4-digit number between 1000 and 9999
    const otp = (randomInt % 9999) + 1000;
  
    return otp;
   }

   

   async sendBySms(phone,otp){
  

          return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your clubHouse OTP is ${otp}`
         })  

   }

   verifyOtp(hashedOtp , data){

      let computedHash = hashService.hashOtp(data);

      if(computedHash === hashedOtp){
         return true;
      }
      else{
         return false;
      }

   }


}


module.exports = new OtpService()