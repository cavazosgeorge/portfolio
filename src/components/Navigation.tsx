import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { FaHome, FaFileAlt, FaBriefcase, FaEnvelope } from 'react-icons/fa'

type PageType = 'home' | 'resume' | 'work' | 'contact'

interface NavigationProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'resume', label: 'Resume', icon: FaFileAlt },
    { id: 'work', label: 'Work', icon: FaBriefcase },
    { id: 'contact', label: 'Contact', icon: FaEnvelope },
  ] as const

  return (
    <Box bg="white" borderRadius="2xl" p={4} shadow="lg">
      <Flex justify="space-around" align="center" wrap="wrap" gap={2}>
        {navItems.map((item) => (
          <Box
            key={item.id}
            as="button"
            onClick={() => onPageChange(item.id)}
            p={3}
            borderRadius="lg"
            transition="all 0.2s"
            bg={currentPage === item.id ? 'gray.900' : 'transparent'}
            color={currentPage === item.id ? 'white' : 'gray.600'}
            _hover={{
              bg: currentPage === item.id ? 'gray.900' : 'gray.100',
              transform: 'translateY(-2px)',
            }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
            minW="80px"
          >
            <Icon as={item.icon} boxSize={5} />
            <Text fontSize="xs" fontWeight="medium">
              {item.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default Navigation