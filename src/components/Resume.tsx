import { 
  Box, 
  Heading, 
  Text, 
  Stack, 
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react'
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa'

const Resume = () => {
  const experiences = [
    {
      title: 'Sr. Automation IT/OT Engineer',
      company: 'Pfizer, Inc.',
      period: 'May 2025 - Present',
      type: 'Full-time'
    },
    {
      title: 'Systems Engineer',
      company: 'Pfizer, Inc.',
      period: 'Oct 2022 - May 2025',
      type: 'Full-time'
    },
    {
      title: 'Full Stack Developer',
      company: 'Coderheroes',
      period: 'Apr 2022 - Aug 2022',
      type: 'Internship'
    }
  ]

  const education = [
    {
      degree: 'Full-Stack Web Development',
      institution: 'BloomTech (FKA Lambda School)',
      period: 'May 2021 - Apr 2022',
      type: 'Certificate'
    },
    {
      degree: 'Self-Directed Learning & Professional Development',
      institution: 'Online Courses, Documentation, Open Source',
      period: '2020 - Present',
      type: 'Continuous Learning'
    }
  ]

  const workSkills = [
    'React.js', 'TypeScript', 'JavaScript', 'Node.js', 'Next.js',
    'Docker', 'Kubernetes', 'PostgreSQL', 'Grafana', 'Prometheus',
    'Git', 'GitLab CI/CD', 'Linux/RHEL', 'Elasticsearch', 'SQL',
    'HTML/CSS', 'Chakra UI', 'REST APIs', 'Vite', 'Bun',
    'Cisco Switches', 'Network Configuration', 'VLAN', 'Active Directory',
    'LDAP', 'Network Security', 'Firewall Management'
  ]

  const softSkills = [
    'Problem Solving', 'Team Leadership', 'Communication', 'Time Management',
    'Code Review', 'Technical Documentation', 'Mentorship', 'Agile/Scrum',
    'Cross-functional Collaboration', 'System Design'
  ]

  return (
    <Stack gap={8}>
      {/* Education & Experience Section */}
      <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          {/* Education */}
          <Box>
            <HStack mb={6} gap={3}>
              <Icon as={FaGraduationCap} boxSize={6} color={{ base: 'gray.700', _dark: 'gray.300' }} />
              <Heading size="lg" color={{ base: 'gray.800', _dark: 'white' }}>
                Education
              </Heading>
            </HStack>
            <Stack gap={4}>
              {education.map((edu, index) => (
                <Box
                  key={index}
                  p={6}
                  bg={{ base: '#FFE4E1', _dark: '#4a3638' }}
                  borderRadius="xl"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <HStack mb={2} color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
                    <Icon as={FaCalendarAlt} />
                    <Text>{edu.period}</Text>
                  </HStack>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" color={{ base: 'gray.800', _dark: 'white' }} fontSize="lg">
                      {edu.degree}
                    </Text>
                    <Text color={{ base: 'gray.600', _dark: 'gray.300' }}>{edu.institution}</Text>
                    <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>{edu.type}</Text>
                  </VStack>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Experience */}
          <Box>
            <HStack mb={6} gap={3}>
              <Icon as={FaBriefcase} boxSize={6} color={{ base: 'gray.700', _dark: 'gray.300' }} />
              <Heading size="lg" color={{ base: 'gray.800', _dark: 'white' }}>
                Experience
              </Heading>
            </HStack>
            <Stack gap={4}>
              {experiences.map((exp, index) => (
                <Box
                  key={index}
                  p={6}
                  bg={{ base: '#E6F3FF', _dark: '#2d3748' }}
                  borderRadius="xl"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <HStack mb={2} color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
                    <Icon as={FaCalendarAlt} />
                    <Text>{exp.period}</Text>
                  </HStack>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" color={{ base: 'gray.800', _dark: 'white' }} fontSize="lg">
                      {exp.title}
                    </Text>
                    <Text color={{ base: 'gray.600', _dark: 'gray.300' }}>{exp.company}</Text>
                    <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>{exp.type}</Text>
                  </VStack>
                </Box>
              ))}
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Skills Section */}
      <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {/* Work Skills */}
          <Box>
            <Heading size="md" mb={4} color={{ base: 'gray.800', _dark: 'white' }}>
              Technical Skills
            </Heading>
            <Flex wrap="wrap" gap={3}>
              {workSkills.map((skill, index) => (
                <Box
                  key={index}
                  px={4}
                  py={2}
                  bg={{ base: 'gray.100', _dark: 'gray.700' }}
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="medium"
                  transition="all 0.2s"
                  _hover={{ 
                    bg: { base: 'gray.200', _dark: 'gray.600' }, 
                    transform: 'translateY(-1px)',
                    shadow: 'sm'
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Soft Skills */}
          <Box>
            <Heading size="md" mb={4} color={{ base: 'gray.800', _dark: 'white' }}>
              Soft Skills
            </Heading>
            <Flex wrap="wrap" gap={3}>
              {softSkills.map((skill, index) => (
                <Box
                  key={index}
                  px={4}
                  py={2}
                  bg={{ base: 'gray.100', _dark: 'gray.700' }}
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="medium"
                  transition="all 0.2s"
                  _hover={{ 
                    bg: { base: 'gray.200', _dark: 'gray.600' }, 
                    transform: 'translateY(-1px)',
                    shadow: 'sm'
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
    </Stack>
  )
}

export default Resume