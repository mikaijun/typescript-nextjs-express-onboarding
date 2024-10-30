import { HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </div>
  );
}
