import { comparePassword, createJWT, hashPassowd } from '../../modules/auth';
import prisma from '../db';

export const createUser = async(req,res) => {
    const user = await prisma.user.create({
        data:{
            username:req.body.username,
            password: await hashPassowd(req.body.password)
        }
    })
    const token = createJWT(user);
    res.json({ token });
}

export const signIn = async(req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            username:req.body.username
        }
    });
    const isValid = await comparePassword(req.body.password,user.password);

    if (!isValid) {
        res.status(401);
        res.json({ message : 'Credentials is not valid' });
    }
    else {
        res.json({token : createJWT(user)});
    }
}