import { FC } from 'react'
import { CircularProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  centered: {
    marginTop: theme.spacing(10),
    textAlign: 'center',
  },
}))

interface Props {
  isLoading: boolean
  children: any
}

const WaitFor: FC<Props> = ({ isLoading, children }) => {
  const classes = useStyles()
  const loader = (
    <div className={classes.centered}>
      <CircularProgress size={100} />
    </div>
  )
  return isLoading ? loader : children
}

export default WaitFor
