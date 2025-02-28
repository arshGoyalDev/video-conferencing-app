import { ReactNode } from "react"

import DeviceSettingsProvider from "./DeviceSettingsContext"

const ContextContainer = ({children}: {children: ReactNode}) => {
  return (
    <DeviceSettingsProvider>
      {children}
    </DeviceSettingsProvider>
  )
}

export default ContextContainer;
