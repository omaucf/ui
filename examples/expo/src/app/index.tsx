import { Text } from "react-native";

import { Container } from "@iueev/rn/container";

import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Container className="flex-1 items-center justify-center gap-8 lg:grow">
      <Text className="font-bold text-5xl md:text-7xl">Veehance UI</Text>
      <StatusBar style="auto" />
    </Container>
  );
}
