import Link from "next/link"
import { useEffect, useState } from "react"
import Search from "./search"

const Header = () => {
  const [top, setTop] = useState(true)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searching, setSearching] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Initialize dark mode from localStorage and apply to document
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollY = window.pageYOffset

      // Update top state for backdrop blur effect
      setTop(currentScrollY <= 10)

      // Show header when at top of page
      if (currentScrollY <= 10) {
        setVisible(true)
      } else {
        // Show header when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setVisible(true)
        } else if (currentScrollY > lastScrollY) {
          setVisible(false)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [lastScrollY])

  return (
    <header
      className={`fixed w-full z-30 bg-gray-200 dark:bg-gray-800 transition-all duration-300 ease-in-out transform ${visible ? "translate-y-0" : "-translate-y-full"
        } ${!top && "backdrop-blur-lg shadow-lg"}`}
    >
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center justify-between gap-2 h-16 md:h-16">
          <img src="/assets/GK-Mono-Vector-In-Circle-Thick.svg" className="h-12" alt="Geoff Kendall" />
          <h2 className="shrink-0 mr-4 text-2xl font-bold tracking-tight tracking-tighter leading-tight">
            <Link href="/" className="text-gray-800 dark:text-gray-200 block hover:underline" aria-label="Geoff Kendall">
              Geoff Kendall
            </Link>
          </h2>
          <ul className="flex grow justify-end flex-wrap items-center">
            <li>
              <button
                className="w-4 h-4 my-auto mx-2"
                aria-label="Toggle Dark Mode"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  // Sun icon for light mode
                  <svg
                    className="w-4 h-4 fill-gray-200"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  // Moon icon for dark mode
                  <svg
                    className="w-4 h-4 fill-gray-800"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </li>
            <li>
              <button
                className="w-4 h-4 my-auto mx-2 border-black"
                aria-label="Search"
                onClick={() => setSearching(!searching)}
                disabled={searching}
              >
                <svg
                  className="w-4 h-4 fill-gray-800 dark:fill-gray-200"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </li>
          </ul>
          {/* Search */}
          <Search visible={searching} setVisible={setSearching} />
        </div>
      </div>
    </header>
  )
}

export default Header
