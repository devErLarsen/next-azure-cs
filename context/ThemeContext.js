import { createContext, useContext, useEffect, useMemo, useState } from "react";


const themeContext = createContext()





const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark')

    const value = {theme, setTheme}

    return (
        <themeContext.Provider value={value}>
            { children }
        </themeContext.Provider>
    )
}


const useTheme = () => {
    const { theme, setTheme } = useContext(themeContext)

    const colorTheme = useMemo(() => theme === 'dark' ? 'light' : 'dark', [theme])

    useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove(colorTheme)
		root.classList.add(theme)
	}, [theme, colorTheme])

	return [colorTheme, setTheme]
}


export {ThemeProvider, useTheme}