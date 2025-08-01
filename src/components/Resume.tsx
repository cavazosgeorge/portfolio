import { 
  Box, 
  Heading, 
  Text, 
  Stack, 
  Flex,
  Link,
  HStack,
  List
} from '@chakra-ui/react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Resume = () => {
  const skills = {
    'UI Development & Data Visualization': ['ReactJS', 'JavaScript', 'TypeScript', 'Web-based Dashboards', 'Charts & Graphs', 'HTML/CSS'],
    'Monitoring & Time-Series Data': ['Grafana Dashboard Development', 'Prometheus', 'Elasticsearch', 'Time-Series Data Integration'],
    'DevOps & Infrastructure': ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Infrastructure as Code', 'Red Hat Enterprise Linux (RHEL 9)', 'Linux Administration'],
    'Databases': ['SQL', 'PostgreSQL'],
    'Networking': ['Cisco Networking', 'Cisco Firewall Management', 'VLAN', 'OSPF', 'BGP', 'IP Routing', 'ACLs', 'Network Troubleshooting'],
    'Security': ['Cisco Firewall Configuration', 'Network Security', 'Vulnerability Assessment'],
    'Tools & Version Control': ['Git', 'GitLab', 'Bash', 'Version Control Systems'],
    'Language Fluency': ['English', 'Spanish']
  }

  const experiences = [
    {
      title: 'Systems Engineer - Automation Infrastructure',
      company: 'Pfizer, Inc.',
      location: 'Kalamazoo, MI',
      period: 'Oct 2022 - Present',
      achievements: [
        'Designed and developed a comprehensive Automation User Request Application featuring interactive web-based dashboards and real-time data visualization using React, TypeScript, and modern frontend technologies',
        'Integrated live time-series data into web-based user interfaces for system monitoring and performance tracking, enabling operators to make data-driven decisions',
        'Built custom Grafana dashboards to visualize system metrics and operational data, providing intuitive interfaces for monitoring critical infrastructure components',
        'Developed user-friendly control interfaces with interactive charts and graphs that display real-time system status and performance metrics',
        'Established and maintained CI/CD pipelines using GitLab for automated testing and deployment, ensuring consistent software quality and reliability',
        'Utilized Linux systems (RHEL 9) for deploying and managing critical infrastructure components and applications',
        'Collaborated with cross-functional teams to integrate monitoring solutions, improving system observability and reducing mean time to recovery for critical systems',
        'Implemented SQL databases to store and manage operational data, supporting complex queries and data analysis for business intelligence'
      ]
    },
    {
      title: 'Full Stack Developer - Internship',
      company: 'Coderheroes',
      location: 'Remote',
      period: 'Apr 2022 - Aug 2022',
      achievements: [
        'Served as a backend engineering team member responsible for debugging server-side code and implementing new features',
        'Designed and implemented user authorization and authentication systems using industry best practices',
        'Developed RESTful APIs supporting full CRUD functionality for critical application components',
        'Contributed to weekly code reviews with stakeholders to ensure code quality and alignment with business requirements',
        'Created comprehensive documentation during bi-weekly sprints to ensure cohesive codebase maintenance and knowledge transfer'
      ]
    }
  ]

  return (
    <Stack gap={8}>
      {/* Header Section */}
      <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} color="gray.800">
            George Cavazos
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            Infrastructure and DevOps Engineer | Systems Engineer | Full Stack Software Engineer
          </Text>
          <List.Root variant="plain" gap="4">
            <HStack justify="center" wrap="wrap" gap={6}>
              <List.Item>
                <List.Indicator asChild color="gray.500">
                  <FaMapMarkerAlt />
                </List.Indicator>
                <Text color="gray.700">Kalamazoo, MI</Text>
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="gray.500">
                  <FaPhone />
                </List.Indicator>
                <Text color="gray.700">269-352-0115</Text>
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="gray.500">
                  <FaEnvelope />
                </List.Indicator>
                <Link href="mailto:cavazosgeorge@yahoo.com" color="gray.700" textDecoration="underline">
                  cavazosgeorge@yahoo.com
                </Link>
              </List.Item>
            </HStack>
          </List.Root>
        </Box>
      </Box>


        {/* Skills Section */}
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading as="h2" size="xl" mb={4} color="gray.800">
            Technical Skills
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
          <Stack gap={3}>
            {Object.entries(skills).map(([category, skillList]) => (
              <Box key={category}>
                <Text fontWeight="semibold" mb={2} color="gray.700">
                  {category}
                </Text>
                <Flex wrap="wrap" gap={2}>
                  {skillList.map((skill) => (
                    <Text
                      key={skill}
                      px={3}
                      py={1}
                      bg="gray.100"
                      color="gray.700"
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {skill}
                    </Text>
                  ))}
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>


        {/* Experience Section */}
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading as="h2" size="xl" mb={4} color="gray.800">
            Professional Experience
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
          <Stack gap={6}>
            {experiences.map((exp, index) => (
              <Box key={index}>
                <Flex justify="space-between" align="flex-start" wrap="wrap" mb={2}>
                  <Box>
                    <Heading as="h3" size="md" color="gray.800">
                      {exp.title}
                    </Heading>
                    <Text color="gray.600">
                      {exp.company} | {exp.location}
                    </Text>
                  </Box>
                  <Text color="gray.500" fontSize="sm">
                    {exp.period}
                  </Text>
                </Flex>
                <List.Root gap="2" variant="plain" ps="4">
                  {exp.achievements.map((achievement, i) => (
                    <List.Item key={i}>
                      <Text fontSize="sm" color="gray.700" lineHeight="relaxed">
                        {achievement}
                      </Text>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            ))}
          </Stack>
        </Box>


        {/* Certifications Section */}
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading as="h2" size="xl" mb={4} color="gray.800">
            Certifications & Achievements
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
          <List.Root gap="3" variant="plain">
            <List.Item>
              <Box>
                <Text fontWeight="semibold" color="gray.800">Cisco Certified Network Associate (CCNA)</Text>
                <Text fontSize="sm" color="gray.600">Network infrastructure and security fundamentals</Text>
              </Box>
            </List.Item>
            <List.Item>
              <Box>
                <Text fontWeight="semibold" color="gray.800">Kubernetes Administrator Certification</Text>
                <Text fontSize="sm" color="gray.600">Container orchestration and cloud-native technologies</Text>
              </Box>
            </List.Item>
            <List.Item>
              <Box>
                <Text fontWeight="semibold" color="gray.800">AWS Solutions Architect Associate</Text>
                <Text fontSize="sm" color="gray.600">Cloud architecture and best practices</Text>
              </Box>
            </List.Item>
          </List.Root>
        </Box>


        {/* Education Section */}
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading as="h2" size="xl" mb={4} color="gray.800">
            Education
          </Heading>
          <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
          <Box>
            <Flex justify="space-between" align="flex-start" wrap="wrap">
              <Box>
                <Heading as="h3" size="md" color="gray.800">
                  BloomTech (FKA Lambda School)
                </Heading>
                <Text color="gray.600">
                  Graduate, Full-Time Program, Full-Stack Web Development
                </Text>
              </Box>
              <Text color="gray.500" fontSize="sm">
                May 2021 - Apr 2022
              </Text>
            </Flex>
          </Box>
        </Box>
    </Stack>
  )
}

export default Resume