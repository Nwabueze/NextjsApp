import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Image from 'next/image';
import useStyles from '../../utils/styles'
import Layout from '../../components/Layout'
import NextLink from 'next/link'
import { Link, Grid, List, ListItem, Typography, Card, CardMedia, Button } from '@material-ui/core'
import db from '../../utils/db'
import Product from '../../models/Product'

// Originally named 'ProductScreen' . The 'items -> [id].js' was ariginally 'products -> [slug].js'
export default function ItemPage(props){
  const { product } = props;
  const router = useRouter();
  const classes = useStyles();
  const {id} = router.query;

  /*
  // Search for the item
  let found = false;
  let index = -1;
  for(var i = 0; i < data.products.length; i++){
    if(data.products[i].slug == id){
      found = true;
      index = i;
      break;
    }
  }

  //const product = found ? data.products[index] : '';
  const message = found ? product.name : `Couldn't find ${id}, go back to home`;
  */
  const photo = `${product.image}`;

  const c1 = 'c1.jpg';
  const img = `https://macroonz.com/img/${c1}`;


  if(!product){
    return <h1>Sorry, {id} not found</h1>
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
              <Typography>Rating: {product.rating}</Typography>
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
                    <Typography>{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.countStock > 0 ? 'In stock' : 'Out of stock'}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">Add to cart</Button>
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
  //console.log(product)
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  }
}