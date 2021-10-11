import nc from 'next-connect';
import ProductUsers from '../../../models/ProductUsers';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const user = await new ProductUsers({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false
    });
    const createdUser = await user.save();

    await db.disconnect();
    
    if (createdUser) {
        const token = signToken(createdUser);
        res.send({
            token: token,
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
        })
    }else{
        res.status(401).send({message: "Invalid username or password"});
    }
});


export default handler;

