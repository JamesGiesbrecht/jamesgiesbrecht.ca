import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, IconButton, Popper, MenuItem, Tabs, Tab, Paper, Grow, MenuList, ClickAwayListener, Slide, useScrollTrigger, AppBar } from '@material-ui/core'
import { Home, Code, Mail, Menu as MenuIcon, Brightness7 as Sun, Brightness3 as Moon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '15px',
  },
  title: {
    margin: 'auto',
    // color: theme.palette.secondary.main,
  },
  iconPadding: {
    paddingLeft: '0',
  },
  desktopNav: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  mobileNav: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

const NavBar = ({ theme, toggleTheme }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const anchorRef = useRef(null)
  const scrollTrigger = useScrollTrigger()

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return
    }
    setIsOpen(false)
  }

  const handleTabChange = (e, newValue) => {
    setActiveNav(newValue)
  }

  const themeButton = (
    <IconButton onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  )

  //  TODO: Add functionality
  const navItems = [
    { name: 'Home', icon: <Home /> },
    { name: 'Projects', icon: <Code /> },
    { name: 'Contact', icon: <Mail /> },
  ]

  const desktopNav = navItems.map((nav) => (
    <Tab
      key={nav.name}
      label={nav.name}
      value={nav.name}
    />
  ))

  const mobileNav = navItems.map((nav) => (
    <MenuItem
      key={nav.name}
      onClick={(e) => {
        setActiveNav(nav.name)
        handleClose(e)
      }}
    >
      <IconButton classes={{ root: classes.iconPadding }} color="inherit">
        {nav.icon}
      </IconButton>
      <p>{nav.name}</p>
    </MenuItem>
  ))

  const mobileMenu = (
    <Popper
      anchorEl={anchorRef.current}
      open={isOpen}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          className={classes.mobileNav}
        >
          <Paper square>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={isOpen}>
                {mobileNav}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )

  return (
    <Slide appear={false} direction="down" in={!scrollTrigger}>
      <AppBar className={classes.navBar} color="inherit">
        <Typography variant="h6" className={classes.title}>
          JG
        </Typography>
        <div className={classes.grow} />
        {/* <div className={classes.desktopNav}>
          <Tabs value={activeNav} onChange={handleTabChange}>
            {desktopNav}
          </Tabs>
        </div> */}
        {themeButton}
        {/* <div className={classes.mobileNav}>
          <IconButton
            onClick={handleToggle}
            color="inherit"
            ref={anchorRef}
          >
            <MenuIcon />
          </IconButton>
        </div>
        {mobileMenu} */}
      </AppBar>
    </Slide>
  )
}

export default NavBar
