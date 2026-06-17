import { Redirect } from "expo-router";

export default function CustomerIndexRedirect() {
  return <Redirect href={"/(customer)/(tabs)/home" as any} />;
}
