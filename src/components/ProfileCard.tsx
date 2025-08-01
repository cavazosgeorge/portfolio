import { Box, Image, Text, VStack, HStack, Link, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ProfileCard = () => {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={8}
      shadow="lg"
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/* Background Gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="120px"
        bgGradient="linear(to-br, #FF6B6B, #4ECDC4)"
        opacity={0.9}
      />
      
      {/* Profile Content */}
      <VStack gap={4} position="relative">
        <Image
          src="/headshot.jpeg"
          alt="George Cavazos"
          borderRadius="full"
          boxSize="150px"
          objectFit="cover"
          border="5px solid white"
          shadow="xl"
          mt={8}
        />
        
        <VStack gap={1}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            George Cavazos
          </Text>
          <Text color="gray.600" fontSize="sm">
            Full Stack Developer
          </Text>
        </VStack>

        {/* Social Links */}
        <HStack gap={3} pt={2}>
          <Link
            href="https://www.linkedin.com/in/georgecavazos/"
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            borderRadius="md"
            bg="gray.100"
            _hover={{ bg: 'gray.200', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaLinkedin} boxSize={5} color="gray.700" />
          </Link>
          <Link
            href="https://github.com/cavazosgeorge"
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            borderRadius="md"
            bg="gray.100"
            _hover={{ bg: 'gray.200', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaGithub} boxSize={5} color="gray.700" />
          </Link>
          <Link
            href="https://x.com/Jax0042"
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            borderRadius="md"
            bg="gray.100"
            _hover={{ bg: 'gray.200', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaXTwitter} boxSize={5} color="gray.700" />
          </Link>
        </HStack>

        {/* Contact Info */}
        <VStack align="stretch" w="full" gap={3} pt={4}>
          <HStack gap={3} justify="center">
            <Icon as={FaPhone} color="gray.500" />
            <Text fontSize="sm" color="gray.700">269-263-9363</Text>
          </HStack>
          <HStack gap={3} justify="center">
            <Icon as={FaEnvelope} color="gray.500" />
            <Link href="mailto:cavazosgeorge@yahoo.com" fontSize="sm" color="gray.700">
              cavazosgeorge@yahoo.com
            </Link>
          </HStack>
          <HStack gap={3} justify="center">
            <Icon as={FaMapMarkerAlt} color="gray.500" />
            <Text fontSize="sm" color="gray.700">Kalamazoo, MI</Text>
          </HStack>
        </VStack>

        {/* Download CV Button */}
        <Box
          as="button"
          mt={4}
          px={6}
          py={3}
          bg="gray.900"
          color="white"
          borderRadius="full"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ bg: 'gray.800', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          w="full"
        >
          Download Resume
        </Box>
      </VStack>
    </Box>
  )
}

export default ProfileCard