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
  Theme,
  PaletteMode,
} from '@mui/material'
import {
  ExitToApp,
  Menu as MenuIcon,
  Brightness7 as Sun,
  Brightness3 as Moon,
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import RouterLink from 'next/link'
import { useRouter } from 'next/router'

import routes from 'consts/routes'
import { AuthContext } from 'context/Auth'

interface Props {
  theme: PaletteMode
  toggleTheme: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
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

const { home, blog, posts, login } = routes

const initialMenuItems: NavItem[] = [
  { name: home.nav?.name, icon: home.nav?.icon, path: home.path },
  { name: blog.nav?.name, icon: blog.nav?.icon, path: blog.path },
  // { name: 'Projects', icon: <Code /> },
  // { name: 'Contact', icon: <Mail /> },
  { name: posts.nav?.name, icon: posts.nav?.icon, path: posts.path },
]

const loginMenuItem: NavItem = { name: login?.nav?.name, icon: login?.nav?.icon, path: login?.path }

const NavBar: FC<Props> = ({ theme, toggleTheme }) => {
  const classes = useStyles()
  const { authInitialized, user, logout } = useContext(AuthContext)
  const [accountIsOpen, setAccountIsOpen] = useState(false)
  const [mobileIsOpen, setMobileIsOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<NavItem['path'] | false>(false)
  const [navItems, setNavItems] = useState<NavItem[]>(initialMenuItems)
  const accountRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const scrollTrigger = useScrollTrigger()
  const router = useRouter()

  useEffect(() => {
    setNavItems(user || !authInitialized ? initialMenuItems : [...initialMenuItems, loginMenuItem])
  }, [user, authInitialized])

  const accountItems = [
    // { name: account.nav?.name, icon: account.nav?.icon, path: account.path },
    { name: 'Logout', icon: <ExitToApp />, path: home.path, cb: logout },
  ]

  const setActiveNavOverride = useCallback(
    (newActiveNav: NavItem['path']) => {
      if (navItems.find((item) => item.path === newActiveNav)) {
        setActiveNav(newActiveNav)
      } else {
        setActiveNav(false)
      }
    },
    [navItems],
  )

  useEffect(() => {
    setActiveNavOverride(router.pathname)
  }, [router.pathname, setActiveNavOverride])

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

  const handleTabChange = (e: ChangeEvent<unknown>, newValue?: string) => {
    router.push(newValue || '')
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
        <RouterLink href="/" passHref>
          <Button>
            <Typography variant="h6" className={classes.title}>
              JG
            </Typography>
          </Button>
        </RouterLink>
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
