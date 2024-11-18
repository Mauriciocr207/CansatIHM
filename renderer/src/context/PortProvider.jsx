import { createContext, useState } from "react"
import { node } from "prop-types"

export const PortContext = createContext();

export default function PortProvider({children}) {
    const [isPortOpen, setIsPortOpen] = useState(false);
    return (<>
        <PortContext.Provider value={{
            isPortOpen,
            setIsPortOpen
        }}>
            {children}
        </PortContext.Provider>
    </>)
}

PortProvider.propTypes = {
    children: node.isRequired
}