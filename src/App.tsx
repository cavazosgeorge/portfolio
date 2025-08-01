import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import ProfileCard from './components/ProfileCard'
import Navigation from './components/Navigation'
import AboutSection from './components/AboutSection'
import WhatIDoSection from './components/WhatIDoSection'
import Resume from './components/Resume'
import WorkTimeline from './components/WorkTimeline'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'resume' | 'work' | 'contact'>('home')

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <AboutSection />
            <WhatIDoSection />
          </>
        )
      case 'resume':
        return <Resume />
      case 'work':
        return <WorkTimeline />
      case 'contact':
        return <Box>Contact section coming soon...</Box>
      default:
        return null
    }
  }

  return (
    <Box minH="100vh" bg="#f5f5f5">
      <Flex direction={{ base: 'column', lg: 'row' }} maxW="1400px" mx="auto" p={{ base: 4, md: 8 }} gap={8}>
        {/* Left Sidebar - Profile Card */}
        <Box 
          w={{ base: '100%', lg: '350px' }} 
          flexShrink={0}
          position={{ base: 'relative', lg: 'sticky' }}
          top={{ base: 0, lg: 8 }}
          height="fit-content"
        >
          <ProfileCard />
        </Box>
        
        {/* Right Content Area */}
        <Box flex={1}>
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          <Box mt={8}>
            {renderContent()}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default App