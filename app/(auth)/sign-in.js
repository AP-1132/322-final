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
      <View style={styles.authCard}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign-in or Create Account</Text>
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
  authCard: {
    backgroundColor: "#f7f6e6ff",
    padding: 36,
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: "#555",
    fontStyle: "italic",
  },
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
