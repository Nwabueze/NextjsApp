
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
                <title>{title ? `${title} - ` : `Test E-commerce App`}</title>
                {description && <meta name="description" content={description} />}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar className={classes.navBar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography>Demo</Typography>
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