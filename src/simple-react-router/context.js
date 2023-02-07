import React from "react"

/**
 * NavigationContext
 * @basename String
 * @navigator Navigator
 * - go()
 * - push()
 * - replace()
 */
export const NavigationContext = React.createContext(null)

/**
 * LocationContext
 * @location Location
 */
export const LocationContext = React.createContext(null)
