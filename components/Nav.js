import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";
import Divider from '@mui/material/Divider';
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Router from 'next/router';







const appBarStyle = {
    bgcolor: '#fcfcfd',
    marginTop: '3px',
    color: 'text.primary',
    boxShadow: 0,
    borderRadius: 0,
    // borderBottom: '5px solid #e0e0e0',
    // webkitBoxShadow: "0px 16px 6px 0px rgba(50, 50, 50, 0.8)",
    // - moz - box - shadow: "0px 16px 6px 0px rgba(50, 50, 50, 0.8)",
    // boxShadow: "0px 6px 3px 0px rgba(50, 50, 50, 0.2)",

}

export default function Nav(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [address, setAddress] = useState();


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
        handleMobileMenuClose();
        if (event == "profile")
            Router.push("/profile/my");
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const { isAuthenticated } = useMoralis();
    const { logout, Moralis, user } = useMoralis();
    const [walletID, setWalletID] = useState(null);
    const [path, setPath] = useState(null);

    useEffect(() => {
        if (props.userinfo)
            setAddress(props.userinfo[0])
    }, [props.userinfo]);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAuthenticated && <MenuItem onClick={() => handleMenuClose("profile")}>Profile</MenuItem>}
            {isAuthenticated && <MenuItem onClick={() => handleMenuClose("account")}>My account</MenuItem>}


        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                {isAuthenticated ? <SignOut /> : <SignIn />}
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                {/* <Link to="/profile/1"> */}
                <p>Profile</p>
                {/* </Link> */}
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ ...appBarStyle }} position="static">
                <Toolbar>
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        alt="logo"
                        src={"/assets/Guhaar.svg"}
                        style={{ maxWidth: '120px' }}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        {isAuthenticated ? <SignOut /> : <SignIn />}
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 1 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={1} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Divider variant='fullWidth' sx={{ borderBottomWidth: 2 }} />
        </Box>
    );
}
