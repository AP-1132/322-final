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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f6e6ff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
          Account
        </Text>
        <Text style={{ marginBottom: 12 }}>Signed in as: {user?.email}</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}
