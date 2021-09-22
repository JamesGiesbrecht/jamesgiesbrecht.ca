import {
  useState,
  useRef,
  useContext,
  useEffect,
  FC,
  MouseEvent,
  ChangeEvent,
  useCallback,
  ReactNode,
} from 'react'
import { PaletteOptions } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
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
} from '@mui/material'
import {
  ExitToApp,
  Menu as MenuIcon,
  Brightness7 as Sun,
  Brightness3 as Moon,
  Person,
} from '@mui/icons-material'
import { AuthContext } from 'context/Auth'
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom'
import routes from 'consts/routes'

interface Props {
  theme: PaletteOptions['mode']
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
  },
  tab: {
    minWidth: 150,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
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

type NavItem = {
  name?: string
  icon: ReactNode
  path?: string
}

const { home, posts, login, account } = routes

const initialMenuItems = [
  { name: home?.nav?.name, icon: home?.nav?.icon, path: home?.path },
  // { name: 'Projects', icon: <Code /> },
  // { name: 'Contact', icon: <Mail /> },
  { name: posts?.nav?.name, icon: posts?.nav?.icon, path: posts?.path },
]

const loginMenuItem = { name: login?.nav?.name, icon: login?.nav?.icon, path: login?.path }

const NavBar: FC<Props> = ({ theme, toggleTheme }) => {
  const classes = useStyles()
  const { authInitialized, user, logout } = useContext(AuthContext)
  const [accountIsOpen, setAccountIsOpen] = useState(false)
  const [mobileIsOpen, setMobileIsOpen] = useState(false)
  // FIXME
  const [activeNav, setActiveNav] = useState<any>(false)
  const [navItems, setNavItems] = useState<NavItem[]>(initialMenuItems)
  const accountRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const scrollTrigger = useScrollTrigger()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    setNavItems(user || !authInitialized ? initialMenuItems : [...initialMenuItems, loginMenuItem])
  }, [user, authInitialized])

  const accountItems = [
    { name: account?.nav?.name, icon: account?.nav?.icon, path: account?.path },
    { name: 'Logout', icon: <ExitToApp />, path: '/logout', cb: logout },
  ]

  const setActiveNavOverride = useCallback(
    // FIXME
    (newActiveNav: any) => {
      if (navItems.find((item) => item.path === newActiveNav)) {
        setActiveNav(newActiveNav)
      } else {
        setActiveNav(false)
      }
    },
    [navItems],
  )

  useEffect(() => {
    setActiveNavOverride(location.pathname)
  }, [location.pathname, setActiveNavOverride])

  const handleMobileToggle = () => setMobileIsOpen((prevOpen) => !prevOpen)

  const handleAccountToggle = () => setAccountIsOpen((prevOpen) => !prevOpen)

  const handleCloseMobile = (
    e: globalThis.MouseEvent | MouseEvent<HTMLLIElement, globalThis.MouseEvent> | TouchEvent,
  ) => {
    if (menuRef.current && menuRef.current.contains(e.target as Node)) return
    setMobileIsOpen(false)
  }

  const handleCloseAccount = (
    e: globalThis.MouseEvent | MouseEvent<HTMLLIElement, globalThis.MouseEvent> | TouchEvent,
  ) => {
    if (accountRef.current && accountRef.current.contains(e.target as Node)) return
    setAccountIsOpen(false)
  }

  const handleTabChange = (e: ChangeEvent<{}>, newValue?: string) => {
    setActiveNavOverride(newValue)
    history.push(newValue || '')
  }

  const themeButton = (
    <IconButton onClick={toggleTheme} size="large">
      {theme === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  )

  const desktopNav = navItems.map((nav) => (
    <Tab key={nav.path} className={classes.tab} label={nav.name} value={nav.path} />
  ))

  const mobileMenu = (
    <>
      <div className={classes.mobileNav}>
        <IconButton onClick={handleMobileToggle} color="inherit" ref={menuRef} size="large">
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

  const accountButton = user && (
    <>
      <IconButton onClick={handleAccountToggle} color="inherit" ref={accountRef} size="large">
        {user.photoURL ? (
          <Avatar
            className={classes.avatar}
            alt={user.displayName || user.email || ''}
            src={user.photoURL}
          />
        ) : (
          <Avatar className={classes.avatar}>
            {(user.displayName || user.email)?.slice(0, 1).toUpperCase()}
          </Avatar>
        )}
      </IconButton>
      <Popper anchorEl={accountRef.current} open={accountIsOpen} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
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
        {accountButton}
        {mobileMenu}
      </AppBar>
    </Slide>
  )
}

export default NavBar
