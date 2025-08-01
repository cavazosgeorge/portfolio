import { Box, Icon } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleColorMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Box
      as="button"
      onClick={toggleColorMode}
      position="fixed"
      bottom={8}
      right={8}
      p={3}
      borderRadius="full"
      bg={{ base: 'gray.800', _dark: 'gray.100' }}
      color={{ base: 'yellow.300', _dark: 'gray.800' }}
      shadow="lg"
      transition="all 0.2s"
      _hover={{ 
        transform: 'scale(1.1)',
        shadow: 'xl'
      }}
      zIndex={100}
    >
      <Icon as={isDark ? FaSun : FaMoon} boxSize={5} />
    </Box>
  )
}

export default ThemeToggle