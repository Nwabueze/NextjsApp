//import Head from 'next/head'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import { Grid, Card, CardActionArea, Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'

import db from '../utils/db'
import Product from '../models/Product'
import React, { useContext } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { Store } from '../utils/Store'




export default function Home(props) {
  const { products } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCart = async (product) => {
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
    <Layout>
      <div>
        <Typography>&nbsp;</Typography>
        <Grid container spacing={3}>
          {products.map(product => 
            (<Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/items/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name}>
                    </CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" onClick={() => addToCart(product)}>Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>)
          )}
        </Grid>
        
      </div>
    </Layout>
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find({}).lean();
  
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}



