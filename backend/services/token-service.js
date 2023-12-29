const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService{

    generateTokens(playload){
        const accessToken = jwt.sign(playload,accessTokenSecret,{
           expiresIn: '1h'
        })

        const refreshToken = jwt.sign(playload,refreshTokenSecret,{
           expiresIn: '1y'
        })


        return {accessToken,refreshToken}
    }

}


module.exports = new TokenService()