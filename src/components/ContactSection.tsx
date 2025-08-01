import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Icon,
  SimpleGrid
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ContactSection = () => {
  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: '269-263-9363',
      link: 'tel:269-263-9363'
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'cavazosgeorge@yahoo.com',
      link: 'mailto:cavazosgeorge@yahoo.com'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Kalamazoo, MI',
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/georgecavazos/'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      link: 'https://github.com/cavazosgeorge'
    },
    {
      icon: FaXTwitter,
      label: 'X',
      link: 'https://x.com/Jax0042'
    }
  ]

  return (
    <VStack gap={6} align="stretch">
      {/* Top Row - Get in Touch and Connect Online side by side */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {/* Contact Information */}
        <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg">
          <Heading size="lg" mb={6} color={{ base: 'gray.800', _dark: 'white' }}>
            Get In Touch
          </Heading>
          
          <VStack align="stretch" gap={4}>
            {contactInfo.map((info, index) => (
              <HStack
                key={index}
                p={4}
                borderRadius="lg"
                bg={{ base: 'gray.50', _dark: 'gray.700' }}
                gap={4}
                transition="all 0.2s"
                _hover={{ 
                  bg: { base: 'gray.100', _dark: 'gray.600' }, 
                  transform: 'translateX(4px)' 
                }}
                cursor={info.link ? 'pointer' : 'default'}
                as={info.link ? 'a' : 'div'}
                href={info.link || undefined}
                target={info.link && !info.link.startsWith('tel:') ? '_blank' : undefined}
                rel={info.link && !info.link.startsWith('tel:') ? 'noopener noreferrer' : undefined}
              >
                <Box
                  p={3}
                  borderRadius="lg"
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  color="#4ECDC4"
                  shadow="sm"
                >
                  <Icon as={info.icon} boxSize={5} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>{info.label}</Text>
                  <Text fontWeight="medium" color={{ base: 'gray.700', _dark: 'gray.200' }}>{info.value}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Right Column - Social Links and Availability */}
        <VStack gap={6} align="stretch">
          {/* Social Links */}
          <Box bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="2xl" p={8} shadow="lg">
            <Heading size="lg" mb={6} color={{ base: 'gray.800', _dark: 'white' }}>
              Connect Online
            </Heading>
            
            <HStack gap={4} justify="center">
              {socialLinks.map((social, index) => (
                <Box
                  key={index}
                  as="a"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  p={4}
                  borderRadius="xl"
                  bg={{ base: 'gray.100', _dark: 'gray.700' }}
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  transition="all 0.2s"
                  _hover={{ 
                    bg: 'gradient.to-r',
                    bgGradientFrom: '#FF6B6B',
                    bgGradientTo: '#4ECDC4',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    shadow: 'md'
                  }}
                >
                  <Icon as={social.icon} boxSize={6} />
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Availability Status */}
          <Box 
            bg={{ base: 'white', _dark: 'gray.800' }}
            borderRadius="2xl" 
            p={6}
            shadow="lg"
          >
            <Box
              p={4}
              borderRadius="lg"
              bg={{ 
                base: 'gradient.to-br', 
                _dark: 'transparent' 
              }} 
              bgGradientFrom={{ base: '#FFE4E1', _dark: undefined }}
              bgGradientTo={{ base: '#E6F3FF', _dark: undefined }}
            >
              <HStack gap={3} mb={2}>
                <Box w={3} h={3} borderRadius="full" bg="green.500" />
                <Text fontWeight="bold" color={{ base: 'gray.800', _dark: 'white' }}>Currently Available</Text>
              </HStack>
              <VStack align="start" gap={3}>
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.300' }}>
                  I'm open to new opportunities and exciting projects.
                </Text>
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.300' }}>
                  Let's create something amazing together!
                </Text>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  )
}

export default ContactSection