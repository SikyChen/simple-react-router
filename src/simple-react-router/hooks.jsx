import React from "react"
import { LocationContext, NavigationContext } from "./context"

export const useNavigation = () => {
  const navigation = React.useContext(NavigationContext);

  return navigation?.navigator || {}
}

export const useLocation = () => {
  const location = React.useContext(LocationContext);

  return location
}
