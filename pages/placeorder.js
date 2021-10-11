import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link, Select, MenuItem, Button, Card, List, ListItem } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react'
import Layout from '../components/Layout';
import NextLink from 'next/link';
import Image from 'next/image';
import { Store } from '../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';


function PlaceOrder(){
    const {state, dispatch} = useContext(Store);
    const {cart:{cartItems}} = state;
    const router = useRouter();
    const classes = useStyles();

    return <Layout title="Place order">
        <div style={{marginLeft:"auto", marginRight:"auto", maxWidth:"1200px", width:"80%", marginTop:"50px", height: "auto"}}>
        <Typography component="h1" variant="h1">Place order</Typography>
        {
            
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <Card className={`${classes.section} ${classes.hAuto}`}>
                            <List>
                                <ListItem>
                                    <Typography variant="h5" component="h5">Order items</Typography>
                                </ListItem>
                                <ListItem>
                                <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   { cartItems.map((item, index) => (
                                       <TableRow style={
                                           {"borderBottom": cartItems.length == index+1 ? "0px solid #ffff" : "1px solid gainsboro",
                                           "backgroudColor": cartItems.length == index+1 ? "red!important" : "blue!important"}
                                           }>
                                           <TableCell>
                                               <NextLink href={`/items/${item.slug}`} passHref>
                                                   <Link>
                                                       <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                   </Link>
                                               </NextLink>
                                           </TableCell>
                                           <TableCell>
                                               <NextLink href={`/items/${item.slug}`} passHref>
                                                   <Link>
                                                       <Typography>{item.name}</Typography>
                                                   </Link>
                                               </NextLink>
                                           </TableCell>
                                           <TableCell align="right">
                                               <Typography>{item.quantity}</Typography>
                                           </TableCell>
                                           <TableCell align="right">
                                               ${item.price}
                                           </TableCell>
                                           
                                       </TableRow>
                                   ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                                </ListItem>
                            </List>
                        
                        </Card>
                        
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card className={`${classes.section} ${classes.hAuto}`}>
                            <List>
                               <ListItem>
                                    <Typography variant="h5">
                                       Order Summary
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button variant="contained" color="primary" fullWidth>Place order</Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            
        }
        </div>
    </Layout>
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false});

