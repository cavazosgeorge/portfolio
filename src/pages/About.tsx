import { Box, Container, Heading, Text, Image, Stack, Flex, List } from '@chakra-ui/react'
import { LuCircleCheck } from 'react-icons/lu'

function About() {
  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={12}>
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={8} 
          align="center"
        >
          <Box flexShrink={0}>
            <Image
              src="/headshot.jpeg"
              alt="Profile headshot"
              borderRadius="full"
              boxSize={{ base: '200px', md: '250px' }}
              objectFit="cover"
              shadow="lg"
            />
          </Box>
          
          <Stack gap={4} flex={1}>
            <Heading as="h1" size="2xl">
              About Me
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Welcome to my portfolio! I'm passionate about creating amazing digital experiences.
            </Text>
            <Text>
              Here you can add more details about yourself, your background, education, 
              and what drives your passion for your field. Share your story and let 
              visitors get to know the person behind the work.
            </Text>
          </Stack>
        </Flex>

        <Stack gap={6}>
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              My Interests
            </Heading>
            <Text mb={4}>
              Here are some of my key interests and passions:
            </Text>
            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="teal.500">
                  <LuCircleCheck />
                </List.Indicator>
                Web Development & Modern Technologies
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="teal.500">
                  <LuCircleCheck />
                </List.Indicator>
                User Experience Design & Accessibility
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="teal.500">
                  <LuCircleCheck />
                </List.Indicator>
                Open Source Contribution
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="teal.500">
                  <LuCircleCheck />
                </List.Indicator>
                Continuous Learning & Tech Innovation
              </List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              What I Do
            </Heading>
            <Text mb={4}>
              My core skills and areas of expertise:
            </Text>
            <List.Root as="ol" gap="3">
              <List.Item>
                <Text fontWeight="semibold">Frontend Development</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  React, TypeScript, Chakra UI, Vite, and modern web technologies
                </Text>
              </List.Item>
              <List.Item>
                <Text fontWeight="semibold">Backend Development</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  Node.js, Bun, RESTful APIs, and database design
                </Text>
              </List.Item>
              <List.Item>
                <Text fontWeight="semibold">UI/UX Design</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  Creating intuitive interfaces with a focus on user experience
                </Text>
              </List.Item>
              <List.Item>
                <Text fontWeight="semibold">Performance Optimization</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  Building fast, efficient applications with optimized bundle sizes
                </Text>
              </List.Item>
            </List.Root>
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default About