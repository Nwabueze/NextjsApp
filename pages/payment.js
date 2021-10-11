import { Button, FormControl, FormControlLabel, Link, List, ListItem, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import CheckoutWizard from "../components/checkoutWizard";

export default function Payment(){
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const classes = useStyles();
    const router = useRouter();
    const {redirect} = router.query;
    const { state, dispatch } = useContext(Store);
    const {cart: {shippingAddress}} = state;
    const[paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if(!shippingAddress.address){
            router.push('/shipping');
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '');
        }
    },[])

    const submitHandler = (e) => {
        e.preventDefault();
        closeSnackbar();
        if(!paymentMethod){
            enqueueSnackbar('Payment method is required', {variant: "error"});
        }else{
            dispatch({type: "SAVE_PAYMENT_METHOD", payload: paymentMethod});
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeorder');
        }
    }
    return (
        <Layout title="Payment page">
            <CheckoutWizard activeStep={2} />
            <form className={classes.form} onSubmit={submitHandler}>
                <List>
                    <ListItem>
                        <Typography variant="h5" component="h5">Payment Method</Typography>
                    </ListItem>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="Payment method" name="paymentMethod" 
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}>
                                <FormControlLabel label="PayPal" value="PayPal" control={<Radio />}>
                                </FormControlLabel>
                                <FormControlLabel label="Stripe" value="Stripe" control={<Radio />}>
                                </FormControlLabel>
                                <FormControlLabel label="Cash" value="Cash" control={<Radio />}>
                                </FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button type="submit" fullWidth variant="contained" color="primary">Continue</Button>
                    </ListItem>
                    <ListItem>
                        <Button type="button" fullWidth variant="contained" 
                        onClick={() => {router.push('/shipping')}}>Back</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>

    )
}