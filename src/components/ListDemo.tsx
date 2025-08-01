import { List, Box, Heading, Stack, Text } from '@chakra-ui/react'
import { LuCircleCheck, LuCircleDashed, LuCircle } from 'react-icons/lu'

function ListDemo() {
  return (
    <Box p={8}>
      <Stack gap={8}>
        <Box>
          <Heading size="lg" mb={4}>Basic List (Unordered)</Heading>
          <List.Root>
            <List.Item>First item in the list</List.Item>
            <List.Item>Second item with more content</List.Item>
            <List.Item>Third item to complete the example</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Ordered List</Heading>
          <List.Root as="ol">
            <List.Item>Step one: Install Chakra UI v3</List.Item>
            <List.Item>Step two: Import List components</List.Item>
            <List.Item>Step three: Use List.Root and List.Item</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>List with Custom Icons</Heading>
          <List.Root gap="3" variant="plain" align="center">
            <List.Item>
              <List.Indicator asChild color="green.500">
                <LuCircleCheck />
              </List.Indicator>
              Completed task with checkmark
            </List.Item>
            <List.Item>
              <List.Indicator asChild color="orange.500">
                <LuCircleDashed />
              </List.Indicator>
              In progress task with dashed circle
            </List.Item>
            <List.Item>
              <List.Indicator asChild color="gray.400">
                <LuCircle />
              </List.Indicator>
              Pending task with empty circle
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Nested Lists</Heading>
          <List.Root>
            <List.Item>Main category one</List.Item>
            <List.Item>
              Main category two with subcategories:
              <List.Root ps="5" mt="2">
                <List.Item>Subcategory A</List.Item>
                <List.Item>Subcategory B</List.Item>
                <List.Item>Subcategory C</List.Item>
              </List.Root>
            </List.Item>
            <List.Item>Main category three</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Styled List with Color Palette</Heading>
          <List.Root colorPalette="teal" variant="plain" gap="2">
            <List.Item>
              <List.Indicator />
              Teal color palette item
            </List.Item>
            <List.Item>
              <List.Indicator />
              Another teal item
            </List.Item>
            <List.Item>
              <List.Indicator />
              Third teal item
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Key Differences in v3</Heading>
          <Stack gap={2}>
            <Text fontWeight="bold">Main changes from v2 to v3:</Text>
            <List.Root variant="plain" gap="2">
              <List.Item>
                <List.Indicator asChild color="blue.500">
                  <LuCircleCheck />
                </List.Indicator>
                Use <Text as="code" bg="gray.100" px={1}>List.Root</Text> instead of <Text as="code" bg="gray.100" px={1}>UnorderedList</Text> or <Text as="code" bg="gray.100" px={1}>OrderedList</Text>
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="blue.500">
                  <LuCircleCheck />
                </List.Indicator>
                Use <Text as="code" bg="gray.100" px={1}>List.Item</Text> instead of <Text as="code" bg="gray.100" px={1}>ListItem</Text>
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="blue.500">
                  <LuCircleCheck />
                </List.Indicator>
                New <Text as="code" bg="gray.100" px={1}>List.Indicator</Text> component for custom markers/icons
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="blue.500">
                  <LuCircleCheck />
                </List.Indicator>
                Props: <Text as="code" bg="gray.100" px={1}>variant</Text> ("marker" | "plain"), <Text as="code" bg="gray.100" px={1}>colorPalette</Text>, <Text as="code" bg="gray.100" px={1}>align</Text>
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="blue.500">
                  <LuCircleCheck />
                </List.Indicator>
                Use <Text as="code" bg="gray.100" px={1}>as="ol"</Text> on List.Root for ordered lists
              </List.Item>
            </List.Root>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ListDemo