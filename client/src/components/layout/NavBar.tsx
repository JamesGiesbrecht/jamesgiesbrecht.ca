import { useState, useRef, useContext, useEffect, FC, MouseEvent, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  IconButton,
  Popper,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  Grow,
  MenuList,
  ClickAwayListener,
  Slide,
  useScrollTrigger,
  AppBar,
  Avatar,
  ListItemIcon,
  Button,
} from '@material-ui/core'
import {
  Home,
  ExitToApp,
  Menu as MenuIcon,
  Message,
  Brightness7 as Sun,
  Brightness3 as Moon,
  Person,
} from '@material-ui/icons'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { AuthContext } from 'context/Auth'
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom'

interface Props {
  theme: PaletteOptions['type']
  toggleTheme: () => void
}

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
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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

const NavBar: FC<Props> = ({ theme, toggleTheme }) => {
  const classes = useStyles()
  const { user, logout } = useContext(AuthContext)
  const [accountIsOpen, setAccountIsOpen] = useState(false)
  const [mobileIsOpen, setMobileIsOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<any>(false)
  const accountRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const scrollTrigger = useScrollTrigger()
  const history = useHistory()
  const location = useLocation()

  //  TODO: Add functionality
  const navItems = [
    { name: 'Home', icon: <Home />, path: '/' },
    // { name: 'Projects', icon: <Code /> },
    // { name: 'Contact', icon: <Mail /> },
    { name: 'Posts', icon: <Message />, path: '/posts' },
  ]
  if (!user) navItems.push({ name: 'Login', icon: <Person />, path: '/login' })

  const accountItems = [
    { name: 'Account', icon: <Person />, path: '/account' },
    { name: 'Logout', icon: <ExitToApp />, path: '/logout', cb: logout },
  ]

  const setActiveNavOverride = (newActiveNav: any) => {
    if (navItems.find((item) => item.path === newActiveNav)) {
      setActiveNav(newActiveNav)
    } else {
      setActiveNav(false)
    }
  }

  useEffect(() => {
    setActiveNavOverride(location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const handleMobileToggle = () => setMobileIsOpen((prevOpen) => !prevOpen)

  const handleAccountToggle = () => setAccountIsOpen((prevOpen) => !prevOpen)

  const handleCloseMobile = (
    e: MouseEvent<HTMLLIElement | Document> | MouseEvent<Element, MouseEvent>,
  ) => {
    if (menuRef.current && menuRef.current.contains(e.target as Node)) return
    setMobileIsOpen(false)
  }

  const handleCloseAccount = (
    e: MouseEvent<HTMLLIElement | Document> | MouseEvent<Element, MouseEvent>,
  ) => {
    if (accountRef.current && accountRef.current.contains(e.target as Node)) return
    setAccountIsOpen(false)
  }

  const handleTabChange = (e: ChangeEvent<{}>, newValue: string) => {
    setActiveNavOverride(newValue)
    history.push(newValue)
  }

  const themeButton = (
    <IconButton onClick={toggleTheme}>{theme === 'dark' ? <Sun /> : <Moon />}</IconButton>
  )

  const desktopNav = navItems.map((nav) => <Tab key={nav.name} label={nav.name} value={nav.path} />)

  const mobileMenu = (
    <>
      <div className={classes.mobileNav}>
        <IconButton onClick={handleMobileToggle} color="inherit" ref={menuRef}>
          <MenuIcon />
        </IconButton>
      </div>
      <Popper
        anchorEl={menuRef.current}
        open={mobileIsOpen}
        transition
        disablePortal
        className={classes.mobileNav}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper square>
              <ClickAwayListener onClickAway={handleCloseMobile}>
                <MenuList autoFocusItem={mobileIsOpen}>
                  {navItems.map((nav) => (
                    <MenuItem
                      key={nav.name}
                      onClick={(e) => {
                        handleTabChange(e, nav.path)
                        handleCloseMobile(e)
                      }}
                    >
                      <ListItemIcon>{nav.icon}</ListItemIcon>
                      <p>{nav.name}</p>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )

  const account = user && (
    <>
      <IconButton onClick={handleAccountToggle} color="inherit" ref={accountRef}>
        <Avatar
          className={classes.avatar}
          alt={user.profile.name}
          src={user.profile.google.picture}
        />
      </IconButton>
      <Popper anchorEl={accountRef.current} open={accountIsOpen} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper square>
              <ClickAwayListener onClickAway={handleCloseAccount}>
                <MenuList autoFocusItem={accountIsOpen}>
                  {accountItems.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={(e) => {
                        handleTabChange(e, item.path)
                        handleCloseAccount(e)
                        if (item.cb) item.cb()
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <p>{item.name}</p>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )

  return (
    <Slide appear={false} direction="down" in={!scrollTrigger}>
      <AppBar className={classes.navBar} color="inherit">
        <Button component={RouterLink} to="/">
          <Typography variant="h6" className={classes.title}>
            JG
          </Typography>
        </Button>
        <div className={classes.grow} />
        <div className={classes.desktopNav}>
          <Tabs value={activeNav} onChange={handleTabChange}>
            {desktopNav}
          </Tabs>
        </div>
        {themeButton}
        {account}
        {mobileMenu}
      </AppBar>
    </Slide>
  )
}

export default NavBar
