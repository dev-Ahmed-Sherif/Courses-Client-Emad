import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Nav.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["عنا", "تواصل معنا", "الدورات", "الرئيسية"];
const settings = ["الصفحة الشخصية", "Account", "Dashboard"];

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [visable, setIsVisable] = useState("hidden");

  useEffect(() => {
    if (user) {
      setIsVisable("visible");
    }
  }, []);

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/* <div className="Navbar">
        
        <img
          className="nav-logo"
          src="./logo.jfif"
          onClick={() => navigate("/")}
          alt=""
        />
        <div className={`nav-items ${isOpen && "open"}`}>
          <Link to="/">الرئيسية</Link>
          <Link to="/courses">الدورات</Link>
          <Link to="/about">عنا</Link>
          <Link to="/contact">اتصل بنا</Link>
        </div>
        <div
          className={`nav-toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bar"></div>
        </div>
      </div> */}

      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
                visibility: visable,
                display: "flex",
              }}
            >
              <IconButton
                sx={{ color: "white" }}
                aria-label="add to shopping cart"
              >
                <AddShoppingCartIcon fontSize="large" />
              </IconButton>
              <Tooltip title="الصفحة الشخصية">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    width: "75%",
                    height: "50px",
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    border: "solid 2px white",
                    borderRadius: "14px",
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "white" }} />
                  <Avatar alt={user} src="./person.JPG" />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      display: { xs: "none", md: "flex" },
                      width: "max-content",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    مرحبا {user}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                className="menu"
                sx={{
                  mt: "45px",

                  // display: "flex",
                  // flexDirection: "column"
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    className="profile"
                    key={setting}
                    sx={{
                      justifyContent: "center",
                      // width: "150px",
                      height: "50px",
                    }}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography
                      sx={{ color: "blue", fontWeight: "bold" }}
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                <IconButton
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      p: "5px",
                      color: "blue",
                      fontSize: "21px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid blue 2px",
                      borderRadius: "8px",
                    }}
                  >
                    تسجيل الخروج
                  </Typography>
                </IconButton>
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography> */}

            <Tooltip title="Logo">
              <IconButton
                onClick={() => navigate("/")}
                sx={{
                  p: 0,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                }}
              >
                <Avatar alt="Remy Sharp" src="./logo.jfif" />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                //flexGrow: 1,
                left: "0 !important",
                right: "100px",
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  direction: "rtl",
                }}
              >
                {pages.reverse().map((page) => (
                  <MenuItem
                    sx={
                      {
                        // width: "50px",
                        // height: "50px",
                        // display: { xs: "flex", md: "none" },
                      }
                    }
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography> */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  //flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.reverse().map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Tooltip title="Logo">
                <IconButton
                  onClick={() => navigate("/")}
                  sx={{
                    p: 0,
                    //display: { xs: "none", md: "flex" }
                  }}
                >
                  <Avatar alt="Remy Sharp" src="./logo.jfif" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
