import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/checkoutWizard";

export default function Shipping(){
    const classes = useStyles();
    const router = useRouter();
    const {redirect} = router.query;
    const { state, dispatch } = useContext(Store);
    const {userInfo, cart: {shippingAddress}} = state;
    
    const {handleSubmit, control, formState: {errors}, setValue} = useForm();

    useEffect(()=>{
        if(!userInfo){
            router.push('/login?redirect=/shipping');
        }

        setValue('fullName', shippingAddress.fullName || '');
        setValue('address', shippingAddress.address || '');
        setValue('postalCode', shippingAddress.postalCode || '');
        setValue('country', shippingAddress.country || '');
    },[])
    
    const submit = ({fullName, address, postalCode, country }) => {
        Cookies.set("shippingAddress", JSON.stringify({fullName, address, postalCode, country }));
        dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: {fullName, address, postalCode, country }});
        router.push(redirect || '/payment');
        
    }

    return (
        <Layout title="Shipping address">
            <CheckoutWizard activeStep={1} />
            <form className={classes.form} onSubmit={handleSubmit(submit)}>
                <List className={classes.pt5}>
                    <ListItem>
                        <Typography variant="h5">Shipping Address</Typography>
                    </ListItem>
                    <ListItem>
                    <Controller 
                            name="fullName" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, minLength: 2}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="fullName" 
                                label="Full Name" 
                                error={Boolean(errors.fullName)}
                                helperText={
                                    errors.fullName ? 
                                    (errors.fullName.type === 'minLength' ? 'Full Name is too short' : 'Full Name is empty') : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                    <Controller 
                            name="address" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, minLength: 2}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="address" 
                                label="Address" 
                                error={Boolean(errors.address)}
                                helperText={
                                    errors.address ? 
                                    (errors.address.type === 'minLength' ? 'Address is too short' : 'Address is empty') : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                    <Controller 
                            name="postalCode" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, minLength: 2}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="postalCode" 
                                label="Postal Code" 
                                error={Boolean(errors.postalCode)}
                                helperText={
                                    errors.postalCode ? 
                                    (errors.postalCode.type === 'minLength' ? 'Postal Code is too short' : 'Postal Code is empty') : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                    <Controller 
                            name="country" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, minLength: 2}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="country" 
                                label="country" 
                                error={Boolean(errors.country)}
                                helperText={
                                    errors.country ? 
                                    (errors.country.type === 'minLength' ? 'country is too short' : 'country is empty') : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" color="primary" fullWidth>Continue</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>

    )
}