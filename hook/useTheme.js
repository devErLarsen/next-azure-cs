import { useContext, useEffect, useMemo } from "react"
import { themeContext } from "../context/ThemeContext"

export const useTheme = () => {
    const { theme, setTheme } = useContext(themeContext)

    const colorTheme = useMemo(() => theme === 'dark' ? 'light' : 'dark', [theme])

    useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove(colorTheme)
		root.classList.add(theme)
	}, [theme, colorTheme])

	return [colorTheme, setTheme]
}