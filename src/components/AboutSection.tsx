import { Box, Heading, Text, VStack } from '@chakra-ui/react'

const AboutSection = () => {
  return (
    <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg">
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="2xl" mb={4} color={{ base: 'gray.800', _dark: 'white' }}>
            About Me
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
        </Box>
        
        <VStack align="stretch" gap={4}>
          <Box p={6} borderRadius="xl" bg={{ base: 'gray.50', _dark: 'gray.700' }}>
            <Text color={{ base: 'gray.600', _dark: 'gray.300' }} lineHeight="tall" fontSize="md">
              I'm a passionate Full Stack Developer with expertise in creating robust web applications and infrastructure solutions. 
              With a strong background in both frontend and backend technologies, I specialize in building scalable systems that deliver exceptional user experiences.
            </Text>
          </Box>
          
          <Box p={6} borderRadius="xl" bg={{ base: 'gray.50', _dark: 'gray.700' }}>
            <Text color={{ base: 'gray.600', _dark: 'gray.300' }} lineHeight="tall" fontSize="md">
              Currently working as a Systems Engineer at Pfizer, I've developed comprehensive automation solutions and real-time monitoring dashboards. 
              My journey in tech spans from network infrastructure to modern web development, always focusing on creating efficient, user-centric solutions.
            </Text>
          </Box>
          
          <Box p={6} borderRadius="xl" bg={{ base: 'gray.50', _dark: 'gray.700' }}>
            <Text color={{ base: 'gray.600', _dark: 'gray.300' }} lineHeight="tall" fontSize="md">
              I believe in continuous learning and staying updated with the latest technologies. When I'm not coding, you'll find me exploring new frameworks, 
              contributing to open-source projects, or mentoring aspiring developers. My goal is to leverage technology to solve real-world problems and make a positive impact.
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  )
}

export default AboutSection