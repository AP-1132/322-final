import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../src/auth/AuthContext";
export default function Account() {
  const { user, signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        padding: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fffeefff",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
        Account
      </Text>
      <Text style={{ marginBottom: 12 }}>Signed in as: {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
