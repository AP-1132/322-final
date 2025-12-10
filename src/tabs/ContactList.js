import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../auth/AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function ContactList() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
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

  const addOrSave = async () => {
    const trimmedName = name.trim();
    const trimmedPhoneNumber = phoneNumber.trim();
    if (!trimmedName || !trimmedPhoneNumber || !user) return;
    if (editingId) {
      await updateDoc(doc(db, "words", editingId), {
        text: trimmedName,
        phoneNumber: trimmedPhoneNumber,
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "words"), {
        text: trimmedName,
        phoneNumber: trimmedPhoneNumber,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });
    }
    setName("");
    setPhoneNumber("");
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setName(item.text);
    setPhoneNumber(item.phoneNumber);
  };
  const remove = async (id) => {
    await deleteDoc(doc(db, "words", id));
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setPhoneNumber("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listCard}>
        <Text style={styles.title}>Add & Edit Contacts</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <View style={{ width: 8 }} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <View style={{ width: 8 }} />
          <Button title={editingId ? "Save" : "Add"} onPress={addOrSave} />
        </View>

        <FlatList
          style={{ marginTop: 16 }}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.text}</Text>
                <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              </View>
              <View style={styles.cardButtons}>
                <TouchableOpacity onPress={() => startEdit(item)}>
                  <Feather name="edit" size={22} />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 8 }}>|</Text>
                <TouchableOpacity onPress={() => remove(item.id)}>
                  <Feather name="trash-2" size={22} color="#c00" />
                  {/* <Text style={[styles.link, { color: "#c00" }]}>Delete</Text> */}
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Add a contact!</Text>}
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
  input: { borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 8 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  empty: { color: "#666", marginTop: 8 },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "600" },
  phoneNumber: { fontSize: 16, color: "#333" },
  cardButtons: { flexDirection: "row", alignItems: "center" },
  link: { fontSize: 16, color: "#06c" },
});
