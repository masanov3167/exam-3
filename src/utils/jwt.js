const jwt = require('jsonwebtoken')

const Token = (payload) =>
	jwt.sign(payload, 'KERAKMI_ENDI_SHU_NARSA', {
		expiresIn: '24h',
});

module.exports = Token;
