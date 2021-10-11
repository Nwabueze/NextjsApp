import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    /* __next is actually #__next, its an id */
    __next: {width:'100vw', marginTop:0},
    navBar: {
        backgroundColor: '#203040',
        position: 'relative',
        top:0,
        marginLeft:0,
        marginRight:0,
        width:'100%',
        '& a': {
            color: '#ffff!important',
            marginLeft: 10
        }
    },
    brand: {fontWeight: 'bold', fontSize: '1.5rem'},
    grow: {flexGrow:1},
    main: {
        minHeight: '80vh'
    },
    footer: {
        textAlign: 'center',
        marginTop: 10,
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    form: {
        maxWidth: 400, margin: '0 auto',
    },
    pt1: {paddingTop: 10,},
    pt2: {paddingTop: 20,},
    pt3: {paddingTop: 30,},
    pt4: {paddingTop: 40,},
    pt5: {paddingTop: 50,},
    navbarButton: {color:"#ffff", textTransform:"initial"},
    transparentBackGround: {backgroundColor: "transparent"},
    hAuto: {marginBottom:"auto", height: "100%"},
})

export default useStyles;

