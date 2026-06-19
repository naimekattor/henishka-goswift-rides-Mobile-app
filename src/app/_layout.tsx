import { Stack } from "expo-router";
import "../global.css";
 
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(transport-driver)" />
      <Stack.Screen name="(car-rental)" />
      <Stack.Screen name="(retailer)" />
      <Stack.Screen name="(restaurant-owner)" />
      <Stack.Screen name="(food-rider)" />
      <Stack.Screen name="(customer)" />
    </Stack>
  );
}