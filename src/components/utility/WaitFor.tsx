import { FC, ReactNode } from 'react'
import { CircularProgress, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    marginTop: theme.spacing(10),
    textAlign: 'center',
  },
}))

interface Props {
  isLoading: boolean
  children: ReactNode
}

const WaitFor: FC<Props> = ({ isLoading, children }) => {
  const classes = useStyles()
  const loader = (
    <div className={classes.centered}>
      <CircularProgress size={100} />
    </div>
  )
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{isLoading ? loader : children}</>
}

export default WaitFor
