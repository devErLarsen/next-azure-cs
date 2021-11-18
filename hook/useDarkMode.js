
import { useEffect, useState, useMemo } from "react"

export default function useDarkMode() {

	const [theme, setTheme] = useState('dark')
	// const colorTheme = theme === 'dark' ? 'light' : 'dark'
	const colorTheme = useMemo(() => theme === 'dark' ? 'light' : 'dark', [theme])

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove(colorTheme)
		root.classList.add(theme)
	}, [theme, colorTheme])

	return [colorTheme, setTheme]
}