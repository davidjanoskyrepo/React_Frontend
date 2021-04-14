import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
//import MuiListItem from "@material-ui/core/ListItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import HomeIcon from '@material-ui/icons/Home';
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HelpIcon from "@material-ui/icons/Help";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./row_col.css";
import { FormatAlignCenter } from "../node_modules/@material-ui/icons/index";

//import HardwareSetCard from "./components/card/HardwareSetCard";
//import { getHardwareSets } from "./api";

import HardwareSetContent from "./components/content/HardwareSetsContent"

import LoginComponent from "./components/api/LoginAPI";
import SignupComponent from "./components/api/SignupAPI";
import useToken from "./components/hook/useTokenHook";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarTitle: {
        flexGrow: 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarItem: {
        marginRight: theme.spacing(2),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        height: "100vh",
    },
}));

function AppContent(props) {
    if (props.active_tab === "Home") {
        return <h1>Replace with app content</h1>
    } else if (props.active_tab === "Hardware Sets") {
        return <HardwareSetContent />
    } else {
        return <h1>Default app content</h1>
    }
}

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();

    // This controls the active tab
    const [active_tab, setActiveTab] = React.useState("Home");

    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open_prof = Boolean(anchorEl);

    const [open_login, setOpenLogin] = React.useState(false);
    const [open_signup, setOpenSignup] = React.useState(false);

    const { token, setToken, deleteToken } = useToken();

    //const [remainingHWSets, setRemainingHWSets] = useState([]);

    /*
    useEffect(() => {
        getHardwareSets().then((result) => {
            setRemainingHWSets(result);
            console.log(remainingHWSets);
        });
    }, []);
    */

    const handleTabClick = (tab) => {
        console.log(tab)
        if (active_tab !== tab) {
            console.log("Active tab changed to : ", tab)
            setActiveTab(tab)
        }
    };

    const handleToggleLogin = () => {
        if (auth === true) {
            handleLogout()
        } else {
            setOpenLogin(true)
        }
    };

    const handleOpenSignup = () => {
        setOpenSignup(true)
    };
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        setAuth(false);
        deleteToken()
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.appBarTitle}>
                        UT Compute
          </Typography>
                    {auth && (
                        <div className={classes.appBarItem}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                open={open_prof}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    <div className={classes.appBarItem}>
                        <Button
                            aria-label="login logout button"
                            variant="contained"
                            color={auth ? "secondary" : "default"}
                            onClick={handleToggleLogin}
                        >
                            {auth ? "Logout" : "Login"}
                        </Button>
                        <LoginComponent
                            auth={auth}
                            setAuth={setAuth}
                            open_login={open_login}
                            setOpenLogin={setOpenLogin}
                            setToken={setToken}
                        />
                    </div>
                    {!auth && (
                        <div className={classes.appBarItem}>
                            <Button
                                aria-label="signup button"
                                variant="contained"
                                color="secondary"
                                onClick={handleOpenSignup}
                            >
                                {"Signup"}
                            </Button>
                            <SignupComponent 
                                auth={auth}
                                setAuth={setAuth}
                                open_signup={open_signup}
                                setOpenSignup={setOpenSignup}
                                setToken={setToken}
                            />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                                <ChevronLeftIcon />
                            )}
                    </IconButton>
                </div>
                <div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            key="Home"
                            selected={active_tab === "Home"}
                            onClick={() => handleTabClick("Home")}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem
                            button
                            key="Hardware Sets"
                            selected={active_tab === "Hardware Sets"}
                            onClick={() => handleTabClick("Hardware Sets")}
                        >
                            <ListItemIcon>
                                <DnsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hardware Sets" />
                        </ListItem>
                        <ListItem
                            button
                            key="Data Sets"
                            selected={active_tab === "Data Sets"}
                            onClick={() => handleTabClick("Data Sets")}
                        >
                            <ListItemIcon>
                                <SettingsEthernetIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Sets" />
                        </ListItem>
                        <ListItem
                            button
                            key="Contact Us"
                            selected={active_tab === "Contact Us"}
                            onClick={() => handleTabClick("Contact Us")}
                        >
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contact Us" />
                        </ListItem>
                    </List>
                </div>
                {auth && (
                    <div>
                        <Divider />
                        <List>
                            <ListItem
                                button
                                key="Hardware Set Tickets"
                                selected={active_tab === "Hardware Set Tickets"}
                                onClick={() => handleTabClick("Hardware Set Tickets")}
                            >
                                <ListItemIcon>
                                    <ReceiptIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hardware Set Tickets" />
                            </ListItem>
                            <ListItem
                                button
                                key="Data Set Bookmarks"
                                selected={active_tab === "Data Set Bookmarks"}
                                onClick={() => handleTabClick("Data Set Bookmarks")}
                            >
                                <ListItemIcon>
                                    <BookmarksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Data Set Bookmarks" />
                            </ListItem>
                            <ListItem
                                button
                                key="Account"
                                selected={active_tab === "Account"}
                                onClick={() => handleTabClick("Account")}
                            >
                                <ListItemIcon>
                                    <AccountBalanceWalletIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItem>
                            <ListItem
                                button
                                key="Dashboard"
                                selected={active_tab === "Dashboard"}
                                onClick={() => handleTabClick("Dashboard")}
                            >
                                <ListItemIcon>
                                    <AssessmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem
                                button
                                key="Console"
                                selected={active_tab === "Console"}
                                onClick={() => handleTabClick("Console")}
                            >
                                <ListItemIcon>
                                    <DesktopWindowsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Console" />
                            </ListItem>
                        </List>
                    </div>
                )}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className="row">
                    <AppContent
                        active_tab={active_tab}
                    />
                </div>
            </main>
        </div>
    );
}
