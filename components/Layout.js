
import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Footer, Link, createTheme, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link'
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h1: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            body1: {
                fontWeight: 'normal'
            }
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000'
            },
            secondary: {
                main: '#208080'
            }
        }
    });

    const router = useRouter();
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const loginMenuClose = () => {
        setAnchorEl(null);
    }

    const logout = () => {
        setAnchorEl(null);
        dispatch({type: "USER_LOGOUT"});
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/');
    }
    return (
        <div>
            <Head>
                <link rel="manifest" href="manifest.json">
                </link>

                <meta name="mobile-web-app-capable" content="yes">
                </meta>
                <meta name="apple-mobile-web-app-capable" content="yes">
                </meta>
                <meta name="application-name" content="NEC">
                </meta>
                <meta name="apple-mobile-web-app-title" content="NEC">
                </meta>
                <meta name="theme-color" content="#203040">
                </meta>
                <meta name="msapplication-navbutton-color" content="#203040">
                </meta>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
                </meta>
                <meta name="msapplication-starturl" content="/">
                </meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                </meta>

                <link rel="icon" type="image/png" sizes="512x512"
                    href="https://cdn3.iconfinder.com/data/icons/shinysocialball/512/Technorati_512x512.png">
                </link>
                <link rel="apple-touch-icon" type="image/png" sizes="512x512"
                    href="https://cdn3.iconfinder.com/data/icons/shinysocialball/512/Technorati_512x512.png">
                </link>
                <link rel="icon" type="image/png" sizes="192x192"
                    href="https://monteirolobato.com.br/public/assets/front/images/icons/android-icon-192x192.png">
                </link>
                <link rel="apple-touch-icon" type="image/png" sizes="192x192"
                    href="https://monteirolobato.com.br/public/assets/front/images/icons/android-icon-192x192.png">
                </link>
                <title>{title ? `${title} - ` : `Test E-commerce App`}</title>
                {description &&
                    <meta name="description" content={description} />}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar className={classes.navBar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography>Demo App</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={darkMode} onClick={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart.cartItems.length > 0 ?
                                        <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge> : 'Cart'}

                                </Link>
                            </NextLink>
                            {
                                userInfo ?  
                                (
                                    <>
                                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={loginClickHandler} className={classes.navbarButton}>
                                            {userInfo.name}
                                        </Button>
                                        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={loginMenuClose}>
                                            <MenuItem onClick={loginMenuClose}>Profile</MenuItem>
                                            <MenuItem onClick={loginMenuClose}>My Account</MenuItem>
                                            <MenuItem onClick={logout}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                )
                                :
                                (<NextLink href="/login" passHref>
                                    <Link>
                                        Login
                                    </Link>
                                </NextLink>)
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>{children}</Container>
                <footer className={classes.footer}>
                    <Typography>&copy; Test E-commerce app 2021 </Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}