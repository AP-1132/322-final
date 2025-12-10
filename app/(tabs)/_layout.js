import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  if (!loading && !user) return <Redirect href="/(auth)/sign-in" />;
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Contacts List" }} />
      <Tabs.Screen name="contacts" options={{ title: "Edit & Add Contacts" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}
