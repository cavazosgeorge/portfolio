import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Input,
  Textarea,
  Button,
  Icon,
  SimpleGrid,
  Field
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa'
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
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
      {/* Contact Form */}
      <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
        <VStack align="stretch" gap={6}>
          <Box>
            <Heading size="xl" mb={4} color="gray.800">
              Let's Connect
            </Heading>
            <Box w="80px" h="4px" bg="gradient.to-r" gradientFrom="#FF6B6B" gradientTo="#4ECDC4" borderRadius="full" mb={6} />
            <Text color="gray.600" mb={6}>
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </Text>
          </Box>

          <VStack gap={4} as="form">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
              <Field.Root>
                <Field.Label color="gray.700" fontSize="sm">Name</Field.Label>
                <Input 
                  placeholder="Your name" 
                  borderRadius="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: '#4ECDC4', boxShadow: '0 0 0 1px #4ECDC4' }}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label color="gray.700" fontSize="sm">Email</Field.Label>
                <Input 
                  type="email"
                  placeholder="your@email.com" 
                  borderRadius="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: '#4ECDC4', boxShadow: '0 0 0 1px #4ECDC4' }}
                />
              </Field.Root>
            </SimpleGrid>
            
            <Field.Root>
              <Field.Label color="gray.700" fontSize="sm">Subject</Field.Label>
              <Input 
                placeholder="What's this about?" 
                borderRadius="lg"
                borderColor="gray.300"
                _hover={{ borderColor: 'gray.400' }}
                _focus={{ borderColor: '#4ECDC4', boxShadow: '0 0 0 1px #4ECDC4' }}
              />
            </Field.Root>
            
            <Field.Root>
              <Field.Label color="gray.700" fontSize="sm">Message</Field.Label>
              <Textarea 
                placeholder="Tell me about your project..." 
                rows={6}
                borderRadius="lg"
                borderColor="gray.300"
                _hover={{ borderColor: 'gray.400' }}
                _focus={{ borderColor: '#4ECDC4', boxShadow: '0 0 0 1px #4ECDC4' }}
                resize="none"
              />
            </Field.Root>

            <Button
              size="lg"
              bgGradient="linear(to-r, #FF6B6B, #4ECDC4)"
              color="white"
              borderRadius="full"
              w="full"
              _hover={{ 
                bgGradient: 'linear(to-r, #FF5555, #3ECDC4)',
                transform: 'translateY(-2px)',
                shadow: 'lg'
              }}
              transition="all 0.2s"
              rightIcon={<FaPaperPlane />}
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Box>

      {/* Contact Information */}
      <VStack gap={6} align="stretch">
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading size="lg" mb={6} color="gray.800">
            Get In Touch
          </Heading>
          
          <VStack align="stretch" gap={4}>
            {contactInfo.map((info, index) => (
              <HStack
                key={index}
                p={4}
                borderRadius="lg"
                bg="gray.50"
                gap={4}
                transition="all 0.2s"
                _hover={{ bg: 'gray.100', transform: 'translateX(4px)' }}
                cursor={info.link ? 'pointer' : 'default'}
                as={info.link ? 'a' : 'div'}
                href={info.link || undefined}
                target={info.link && !info.link.startsWith('tel:') ? '_blank' : undefined}
                rel={info.link && !info.link.startsWith('tel:') ? 'noopener noreferrer' : undefined}
              >
                <Box
                  p={3}
                  borderRadius="lg"
                  bg="white"
                  color="#4ECDC4"
                  shadow="sm"
                >
                  <Icon as={info.icon} boxSize={5} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.500">{info.label}</Text>
                  <Text fontWeight="medium" color="gray.700">{info.value}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Social Links */}
        <Box bg="white" borderRadius="2xl" p={8} shadow="lg">
          <Heading size="lg" mb={6} color="gray.800">
            Connect Online
          </Heading>
          
          <HStack gap={4}>
            {socialLinks.map((social, index) => (
              <Box
                key={index}
                as="a"
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                p={4}
                borderRadius="xl"
                bg="gray.100"
                color="gray.700"
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
        <Box bg="gradient.to-br" bgGradientFrom="#FFE4E1" bgGradientTo="#E6F3FF" borderRadius="2xl" p={6}>
          <HStack gap={3} mb={2}>
            <Box w={3} h={3} borderRadius="full" bg="green.500" />
            <Text fontWeight="bold" color="gray.800">Currently Available</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            I'm open to new opportunities and exciting projects. Let's create something amazing together!
          </Text>
        </Box>
      </VStack>
    </SimpleGrid>
  )
}

export default ContactSection