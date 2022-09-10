const jwt = require('jsonwebtoken');


class verify{
    async verify(req, res, next){
        const {access_token} = req.headers;
            if(!access_token){
                res.status(401).json({status:401, message:'token invalid', invalid_token: true})
                            return
            }

			if(access_token){
				jwt.verify(access_token, 'KERAKMI_ENDI_SHU_NARSA', (err, decode) =>{
					if(err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError){
						res.status(401).json({status:401, message:'token invalid', invalid_token: true})
                        return
					}
                    next()
				})
			}
    }
}

module.exports = new verify;