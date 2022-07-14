import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any
  // tslint:disable-next-line:no-any
  children?: any
  isLoggedIn: boolean
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, children, ...rest } = props

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        props.isLoggedIn ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
