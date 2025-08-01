import { Box, Heading, Text, VStack, HStack, Icon, Flex } from '@chakra-ui/react'
import { FaBriefcase, FaGraduationCap, FaRocket, FaVirusSlash } from 'react-icons/fa'

const WorkTimeline = () => {
  const timelineEvents = [
    {
      date: 'May 2025 - Present',
      title: 'Sr. Automation IT/OT Engineer',
      company: 'Pfizer, Inc.',
      description: 'Leading automation initiatives and IT/OT convergence projects',
      icon: FaRocket,
      color: '#FF6B6B',
      type: 'current'
    },
    {
      date: 'Oct 2022 - May 2025',
      title: 'Systems Engineer',
      company: 'Pfizer, Inc.',
      description: 'Developed automation solutions and real-time monitoring dashboards',
      icon: FaBriefcase,
      color: '#4ECDC4',
      type: 'work'
    },
    {
      date: 'Apr 2022 - Aug 2022',
      title: 'Full Stack Developer',
      company: 'Coderheroes',
      description: 'Built RESTful APIs and implemented authentication systems',
      icon: FaBriefcase,
      color: '#FFD93D',
      type: 'work'
    },
    {
      date: 'May 2021 - Apr 2022',
      title: 'Full-Stack Web Development',
      company: 'BloomTech',
      description: 'Intensive full-stack development program',
      icon: FaGraduationCap,
      color: '#6BCF7F',
      type: 'education'
    },
    {
      date: '2020',
      title: 'Global Pandemic',
      company: 'The Great Pause',
      description: 'Adapted to remote work, learned new skills, and navigated unprecedented times',
      icon: FaVirusSlash,
      color: '#95A5A6',
      type: 'special'
    },
    {
      date: 'Jun 2017 - Dec 2019',
      title: 'Complex Electronics Tech',
      company: 'ExxonMobil Refinery',
      description: 'Maintained and troubleshot complex electronic systems in refinery operations',
      icon: FaBriefcase,
      color: '#E74C3C',
      type: 'work'
    },
    {
      date: 'Mar 2014 - May 2017',
      title: 'Area Sales Manager',
      company: 'Dorman Products',
      description: 'Managed accounts for the automotive aftermarket and traditional market sectors',
      icon: FaBriefcase,
      color: '#9B59B6',
      type: 'work'
    }
  ]

  return (
    <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="2xl" mb={4} color="gray.800">
            My Journey
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={8} />
        </Box>

        {/* Timeline */}
        <Box position="relative" pl={{ base: 8, md: 12 }}>
          {/* Vertical Line */}
          <Box
            position="absolute"
            left={{ base: '15px', md: '24px' }}
            top="0"
            bottom="0"
            w="2px"
            bg="gray.200"
          />

          <VStack align="stretch" gap={8}>
            {timelineEvents.map((event, index) => (
              <Flex key={index} position="relative" align="flex-start">
                {/* Timeline Dot */}
                <Box
                  position="absolute"
                  left={{ base: '-25px', md: '-29px' }}
                  w={{ base: '32px', md: '40px' }}
                  h={{ base: '32px', md: '40px' }}
                  bg={event.color}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="lg"
                  border="4px solid white"
                  zIndex={2}
                  transition="all 0.3s"
                  _hover={{ transform: 'scale(1.1)' }}
                >
                  <Icon as={event.icon} color="white" boxSize={{ base: 3, md: 4 }} />
                </Box>

                {/* Content Card */}
                <Box
                  flex={1}
                  p={6}
                  ml={{ base: 4, md: 8 }}
                  bg={event.type === 'current' ? 'gray.50' : event.type === 'special' ? 'gray.50' : 'white'}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={event.type === 'current' ? event.color : 'gray.200'}
                  borderLeftWidth="3px"
                  borderLeftColor={event.color}
                  shadow="sm"
                  transition="all 0.3s"
                  _hover={{ 
                    shadow: 'md', 
                    transform: 'translateX(4px)',
                    borderLeftWidth: '4px'
                  }}
                >
                  <HStack justify="space-between" wrap="wrap" mb={2}>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" fontSize="lg" color="gray.800">
                        {event.title}
                      </Text>
                      <Text color={event.color} fontWeight="medium">
                        {event.company}
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      {event.date}
                    </Text>
                  </HStack>
                  <Text color="gray.600" fontSize="sm" mt={2}>
                    {event.description}
                  </Text>
                  {event.type === 'current' && (
                    <Box
                      mt={3}
                      display="inline-block"
                      px={3}
                      py={1}
                      bg={event.color}
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Current Position
                    </Box>
                  )}
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Timeline End Dot */}
          <Box
            position="absolute"
            left={{ base: '11px', md: '20px' }}
            bottom="-20px"
            w="10px"
            h="10px"
            bg="gray.300"
            borderRadius="full"
          />
        </Box>
      </VStack>
    </Box>
  )
}

export default WorkTimeline