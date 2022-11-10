import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = ({ id, username }) => {
    const token = jwt.sign({ id , username} , process.env.JWT_SECRET);
    return token;
}

export const hashPassowd = (password) => {
    return bcrypt.hash(password,10);
} 

export const comparePassword = (password,hash) => {
    return bcrypt.compare(password,hash);
}


export const protect = (req,res,next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        res.status(401);
        res.json({ message : "Not authorized.."});
        return;
    }
    else {
        const [_,token] = bearer.split(' ');
        if(!token) {
            res.status(401);
            res.json({ message : "Invalid Token.."});
            return;
        }
        else {
            try {
                const payload = jwt.verify(token,process.env.JWT_SECRET);
                console.log(payload);
                req.user = payload;    
            } catch (error) {
                res.status(401);
                res.json({ message : "Invalid Token..."});
                return;
            }
        }
    }
    next();
}