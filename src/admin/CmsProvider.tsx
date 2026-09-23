import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
export default function CmsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
