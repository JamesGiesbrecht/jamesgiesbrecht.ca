import { FC } from 'react'
import { Chip, Avatar, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Tech } from 'ts/app/types'

interface Props {
  tech: Tech
}

const TechChip: FC<Props> = ({ tech }) => {
  const useStyles = makeStyles((theme: Theme) => ({
    chip: {
      backgroundColor: tech.color,
      color: tech.fontColor,
      margin: theme.spacing(0.5),
    },
    chipImg: {
      padding: '2px',
    },
  }))

  const classes = useStyles()

  const logo = tech.logo ? (
    <Avatar alt={tech.name} src={tech.logo} />
  ) : (
    <Avatar>{tech.name.substring(0, 1)}</Avatar>
  )

  return (
    <Chip
      classes={{
        root: classes.chip,
        avatar: classes.chipImg,
      }}
      label={tech.name}
      avatar={logo}
      size="small"
    />
  )
}

export default TechChip
