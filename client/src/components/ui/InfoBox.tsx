import React from 'react'
import { Box, Card, CardHeader, CardContent, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface Props {
  title: string
  children: any
  onClose: () => void
}

const InfoMessage: React.FC<Props> = ({ title, children, onClose }) => {
  let content = children
  if (typeof children === 'string') content = <Typography>{children}</Typography>

  return (
    <Card>
      <CardHeader
        title={title}
        action={(
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      />
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}

export default InfoMessage
