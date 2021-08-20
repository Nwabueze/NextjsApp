import Head from 'next/head'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import { Grid, Card, CardActionArea, Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import data from '../utils/data'
import db from '../utils/db'
import Product from '../models/Product'

export default function Home(props) {
  const { products } = props;
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
                  <Button size="small" color="primary">Add to cart</Button>
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
  //console.log(products);
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}



