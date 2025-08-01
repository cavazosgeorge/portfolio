import { Box, Image, Text, VStack, HStack, Link, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ProfileCard = () => {
  return (
    <Box
      bg={{ base: 'white', _dark: 'gray.800' }}
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
          <Text fontSize="2xl" fontWeight="bold" color={{ base: 'gray.800', _dark: 'white' }}>
            George Cavazos
          </Text>
          <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
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
            bg={{ base: 'gray.100', _dark: 'gray.700' }}
            _hover={{ bg: { base: 'gray.200', _dark: 'gray.600' }, transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaLinkedin} boxSize={5} color={{ base: 'gray.700', _dark: 'white' }} />
          </Link>
          <Link
            href="https://github.com/cavazosgeorge"
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            borderRadius="md"
            bg={{ base: 'gray.100', _dark: 'gray.700' }}
            _hover={{ bg: { base: 'gray.200', _dark: 'gray.600' }, transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaGithub} boxSize={5} color={{ base: 'gray.700', _dark: 'white' }} />
          </Link>
          <Link
            href="https://x.com/Jax0042"
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            borderRadius="md"
            bg={{ base: 'gray.100', _dark: 'gray.700' }}
            _hover={{ bg: { base: 'gray.200', _dark: 'gray.600' }, transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <Icon as={FaXTwitter} boxSize={5} color={{ base: 'gray.700', _dark: 'white' }} />
          </Link>
        </HStack>

        {/* Contact Info */}
        <VStack align="stretch" w="full" gap={3} pt={4}>
          <HStack gap={3} justify="center">
            <Icon as={FaPhone} color={{ base: 'gray.500', _dark: 'gray.400' }} />
            <Text fontSize="sm" color={{ base: 'gray.700', _dark: 'gray.300' }}>269-263-9363</Text>
          </HStack>
          <HStack gap={3} justify="center">
            <Icon as={FaEnvelope} color={{ base: 'gray.500', _dark: 'gray.400' }} />
            <Link href="mailto:cavazosgeorge@yahoo.com" fontSize="sm" color={{ base: 'gray.700', _dark: 'gray.300' }}>
              cavazosgeorge@yahoo.com
            </Link>
          </HStack>
          <HStack gap={3} justify="center">
            <Icon as={FaMapMarkerAlt} color={{ base: 'gray.500', _dark: 'gray.400' }} />
            <Text fontSize="sm" color={{ base: 'gray.700', _dark: 'gray.300' }}>Kalamazoo, MI</Text>
          </HStack>
        </VStack>

        {/* Download CV Button */}
        <Link
          href="/George%20Cavazos%20_%20Resume%202025%20(1).pdf"
          download="George_Cavazos_Resume_2025.pdf"
          _hover={{ textDecoration: 'none' }}
          w="full"
        >
          <Box
            as="button"
            mt={4}
            px={6}
            py={3}
            bg={{ base: 'gray.900', _dark: 'white' }}
            color={{ base: 'white', _dark: 'gray.900' }}
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
            _hover={{ bg: { base: 'gray.800', _dark: 'gray.100' }, transform: 'translateY(-2px)' }}
            transition="all 0.2s"
            w="full"
          >
            Download Resume
          </Box>
        </Link>
      </VStack>
    </Box>
  )
}

export default ProfileCard