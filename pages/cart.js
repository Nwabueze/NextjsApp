import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link, Select, MenuItem, Button, Card, List, ListItem } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react'
import Layout from '../components/Layout';
import NextLink from 'next/link';
import Image from 'next/image';
import { Store } from '../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';


function CartScreen(){
    const {state, dispatch} = useContext(Store);
    const {cart:{cartItems}} = state;
    const router = useRouter();

    const updateCart = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < 1) {
            window.alert("Sorry this item is out of stock");
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }

    const removeItem = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }

    const checkout = () => {
        router.push("/shipping");
    }

    return <Layout title="shopping">
        <div style={{marginLeft:"auto", marginRight:"auto", maxWidth:"1200px", width:"80%", marginTop:"50px", height: "auto"}}>
        <Typography component="h1" variant="h1">Shopping Cart</Typography>
        {
            cartItems.length < 1 ? (
                <div>
                    Cart is empty 
                    <NextLink href="/" passHref>
                        <Link>{'   '}  Continue shopping</Link>
                    </NextLink></div>
            ):
            (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   { cartItems.map((item) => (
                                       <TableRow>
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
                                               <Select value={item.quantity} onChange={e => updateCart(item, e.target.value)}>
                                                   {[...Array(item.countInStock).keys()].map((index) => (
                                                       <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>
                                                   ))}
                                               </Select>
                                           </TableCell>
                                           <TableCell align="right">
                                               ${item.price}
                                           </TableCell>
                                           <TableCell align="right">
                                               <Button variant="contained" color="secondary" onClick={() => removeItem(item)}>x</Button>
                                           </TableCell>
                                       </TableRow>
                                   ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card style={{marginBottom:"auto", height: "100%"}}>
                            <List>
                               <ListItem>
                                    <Typography variant="h5">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : ${' '}
                                        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button variant="contained" color="primary" onClick={checkout} fullWidth>Check out</Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )
        }
        </div>
    </Layout>
}

export default dynamic(() => Promise.resolve(CartScreen), {ssr: false});