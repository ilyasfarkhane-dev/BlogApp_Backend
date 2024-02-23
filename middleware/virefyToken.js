const jwt = require('jsonwebtoken')


function virefyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(403).json({ error: 'Token is not provided' });
    }

    jwt.verify(token, 'secret_key', (err, user)=>{
        if(err){
            res.json({err:"stop"})
        }
        req.user = user

        next();
    })
}

module.exports = virefyToken;