import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    await res.send(product);
});


export default handler;