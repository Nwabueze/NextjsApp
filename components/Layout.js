
import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Footer, Link, createTheme, ThemeProvider, CssBaseline, Switch } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link'
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }){
    const { state, dispatch } = useContext(Store);
    const { darkMode } = state;
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

    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
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
                                    Cart
                                </Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>
                                    Login
                                </Link>
                            </NextLink>
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