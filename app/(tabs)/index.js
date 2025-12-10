import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAuth } from "../../src/auth/AuthContext";
import { db } from "../../src/firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function Index() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "words"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <View style={styles.listCard}>
        <Text style={styles.title}>My Contacts</Text>
        <FlatList
          style={{ marginTop: 16 }}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.word}>{item.text}</Text>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No contacts found.</Text>
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
    paddingTop: 80,
    backgroundColor: "#fffeefff",
  },
  listCard: {
    backgroundColor: "#f7f6e6ff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    flex: 1,
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  empty: { color: "#666", marginTop: 8 },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
  },
  word: { fontSize: 18, fontWeight: "600" },
  phoneNumber: { fontSize: 16, color: "#333", marginTop: 4 },
});
