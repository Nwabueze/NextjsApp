import React, { useContext } from 'react';
import { useRouter } from 'next/router';
//import data from '../../utils/data';
import Image from 'next/image';
import useStyles from '../../utils/styles'
import Layout from '../../components/Layout'
import NextLink from 'next/link'
import { Link, Grid, List, ListItem, Typography, Card, CardMedia, Button } from '@material-ui/core'
import db from '../../utils/db'
import Product from '../../models/Product'
import axios from 'axios';
import { Store } from '../../utils/Store';

// Originally named 'ProductScreen' . The 'items -> [id].js' was ariginally 'products -> [slug].js'
export default function ItemPage(props){
  const { product } = props;
  const router = useRouter();
  const classes = useStyles();
  const {id} = router.query;
  const { state, dispatch } = useContext(Store);
  
  const photo = `${product.image}`;
  const c1 = 'c1.jpg';
  const img = `https://macroonz.com/img/${c1}`;


  if(!product){
    return <h1>Sorry, {id} not found</h1>
  }

  
  const addToCart = async () => {
    const existingItem = state.cart.cartItems.find((item) => item._id === product._id);
    const quantity = existingItem ? existingItem.quantity+1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity ){
      window.alert("Sorry this item is out of stock");
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  }

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>&lt; Back to home</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image src={photo} width={640} height={640} layout="responsive" />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Rating: {product.rating} star ({product.numReviews} reviews)</Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary" onClick={addToCart}>Add to cart</Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )

}

export async function getServerSideProps(context){
  const { params } = context;
  const { id } = params;

  await db.connect();
  const product = await Product.findOne({slug: id}).lean();
  await db.disconnect();
  if(!product){
    return false;
  }
  
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  }
}