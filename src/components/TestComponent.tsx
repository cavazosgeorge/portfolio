import { Box, Stack, HStack, Text, Badge, Separator } from '@chakra-ui/react'

function TestComponent() {
  return (
    <Box p={4}>
      <Stack gap={4}>
        <Text>Testing Badge Component:</Text>
        <HStack gap={2}>
          <Badge>Default Badge</Badge>
          <Badge colorPalette="green">Green Badge</Badge>
          <Badge colorPalette="red">Red Badge</Badge>
          <Badge colorPalette="blue" fontSize="lg">Large Blue Badge</Badge>
        </HStack>
        <Text mt={4}>Testing Separator Component:</Text>
        <Separator my={4} />
        <Text>Text after separator</Text>
      </Stack>
    </Box>
  )
}

export default TestComponent