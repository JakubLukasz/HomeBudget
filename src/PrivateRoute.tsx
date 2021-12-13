import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '@Hooks/useAuth'

interface Props {
  component: any
  [x: string]: any
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute
