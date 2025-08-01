import { Box, Heading, Text, SimpleGrid, VStack, Icon } from '@chakra-ui/react'
import { FaCode, FaMobile, FaPalette, FaUsers } from 'react-icons/fa'

const WhatIDoSection = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'I specialize in building fast, scalable, and user-friendly web applications using modern technologies like React, TypeScript, and Node.js. My focus is on creating robust solutions that deliver exceptional performance.',
      color: '#FF6B6B'
    },
    {
      icon: FaMobile,
      title: 'System Architecture',
      description: 'With experience in DevOps and infrastructure, I design and implement scalable system architectures. From containerization with Docker to orchestration with Kubernetes, I ensure your applications run smoothly.',
      color: '#4ECDC4'
    },
    {
      icon: FaPalette,
      title: 'UI/UX Development',
      description: 'I\'m passionate about crafting visually appealing and intuitive user interfaces. Using modern design systems and responsive techniques, I create experiences that users love to interact with.',
      color: '#FFD93D'
    },
    {
      icon: FaUsers,
      title: 'Technical Leadership',
      description: 'I enjoy sharing my knowledge and leading technical initiatives. From code reviews to architecture decisions, I help teams deliver high-quality software while fostering a culture of continuous improvement.',
      color: '#6BCF7F'
    }
  ]

  return (
    <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg" mt={8}>
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="2xl" mb={4} color={{ base: 'gray.800', _dark: 'white' }}>
            What I Do
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {services.map((service, index) => (
            <Box
              key={index}
              p={6}
              borderRadius="xl"
              bg={{ base: 'gray.50', _dark: 'gray.700' }}
              transition="transform 0.3s, box-shadow 0.3s, border 0.3s"
              _hover={{ 
                transform: 'translateY(-4px)', 
                shadow: 'xl',
                bg: { base: 'white', _dark: 'gray.800' },
                borderWidth: '1px',
                borderColor: { base: 'gray.200', _dark: 'gray.600' }
              }}
            >
              <VStack align="start" gap={4}>
                <Box
                  p={3}
                  borderRadius="lg"
                  bg={service.color}
                  color="white"
                  display="inline-block"
                >
                  <Icon as={service.icon} boxSize={6} />
                </Box>
                <Box>
                  <Heading size="md" mb={2} color={{ base: 'gray.800', _dark: 'white' }}>
                    {service.title}
                  </Heading>
                  <Text color={{ base: 'gray.600', _dark: 'gray.300' }} fontSize="sm" lineHeight="tall">
                    {service.description}
                  </Text>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default WhatIDoSection