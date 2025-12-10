import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";
import { auth } from "../../src/firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function SignIn() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.replace("/(tabs)");
  }, [user]);

  const onSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pw);
    } catch (e) {
      setError(e.message);
    }
  };

  const onSignUp = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pw);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
        <Button title="Sign In" onPress={onSignIn} />
        <Button title="Create Account" onPress={onSignUp} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
    justifyContent: "center",
    backgroundColor: "#fffeefff",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    color: "#000",
  },
  error: { color: "#c00", marginTop: 6 },
});
