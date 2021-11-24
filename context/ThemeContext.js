import { createContext, useContext, useEffect, useMemo, useState } from "react";


export const themeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark')

    const value = {theme, setTheme}

    return (
        <themeContext.Provider value={value}>
            { children }
        </themeContext.Provider>
    )
}

