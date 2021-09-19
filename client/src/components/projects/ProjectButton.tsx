import { FC, MouseEvent, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { ProjectLinkButton } from 'ts/app/types'

interface Props {
  button: ProjectLinkButton
}

const ProjectButton: FC<Props> = ({ button }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const popperOpen = Boolean(anchorEl)

  const handlePopperClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handlePopperClose = () => {
    setAnchorEl(null)
  }

  const { name, icon, link, items } = button

  if (link) {
    return (
      <Button key={name} href={link} startIcon={icon} target="_blank">
        {name}
      </Button>
    )
  }

  if (items) {
    return (
      <>
        <Button
          aria-expanded={popperOpen ? 'true' : undefined}
          onClick={handlePopperClick}
          startIcon={icon}
        >
          {name}
        </Button>
        <Menu anchorEl={anchorEl} open={popperOpen} onClose={handlePopperClose}>
          {items.map((item) => (
            <MenuItem
              key={item.name}
              component="a"
              target="_blank"
              href={item.link}
              onClick={handlePopperClose}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }

  return null
}

export default ProjectButton
