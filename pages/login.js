import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

export default function Login(){
    const classes = useStyles();
    const router = useRouter();
    const {redirect} = router.query;
    const { state, dispatch } = useContext(Store);
    const {userInfo} = state;

    const {handleSubmit, control, formState: {errors}} = useForm();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    if(userInfo){
        router.push('/');
    }
    const submit = async ({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await axios.post('/api/users/login', { email, password });
            Cookies.set("userInfo", JSON.stringify(data));
            dispatch({type: 'USER_LOGIN', payload: data});
            router.push(redirect || '/');
        } catch(err) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant: 'error'});
        }
    }


    return (
        <Layout title="Login page">
            <form className={classes.form} onSubmit={handleSubmit(submit)}>
                <List className={classes.pt5}>
                    <ListItem>
                        <Typography variant="h5">Login</Typography>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="email" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, pattern: /(\w+)@(\w+)\.(\w+)/}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="email" 
                                label="email" 
                                inputProps={{ type: "email" }} 
                                error={Boolean(errors.email)}
                                helperText={
                                    errors.email ? 
                                    (errors.email.type === 'pattern' ? 'Invalid email' : 'Email is empty') : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                        
                    </ListItem>
                    <ListItem>
                    <Controller 
                            name="password" 
                            control={control} 
                            defaultValue="" 
                            rules={{required: true, minLength: 6}} render={({field}) => (
                            <TextField 
                                variant="outlined" 
                                fullWidth id="password" 
                                label="Password" 
                                inputProps={{ type: "password" }} 
                                error={Boolean(errors.password)}
                                helperText={
                                    errors.password ? 
                                    (
                                        errors.password.type === 'minLength' ? 
                                        'Expecting at least 6 characters' : 'Empty password'
                                    ) : ''
                                }
                                {...field}>
                            </TextField>
                        )}></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" color="primary" fullWidth>Login</Button>
                    </ListItem>
                    <ListItem>
                        Don't have account? {' '} 
                        <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                            <Link> &nbsp;Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>

    )
}