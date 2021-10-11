import nc from 'next-connect';
import ProductUsers from '../../../models/ProductUsers';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const user = await ProductUsers.findOne({email: req.body.email});
    await db.disconnect();
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = signToken(user);
        
        res.send({
            token: token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401).send({message: "Invalid email or password"});
    }
});


export default handler;