import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PersonsContext } from "../_layout";

export default function PersonDetail() {
  const { id } = useLocalSearchParams();
  const { persons } = useContext(PersonsContext);
  const router = useRouter();

  const person = persons.find((p) => p.id.toString() === id);

  if (!person) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Person not found</Text>
      </SafeAreaView>
    );
  }

  const hasImage = person.image && person.image.url;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          {hasImage ? (
            <Image source={{ uri: person.image.url }} style={styles.image} />
          ) : (
            <View style={styles.emptyImage} />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.detail}>Birthday: {person.born || "N/A"}</Text>
          <Text style={styles.detail}>Address: {person.address || "N/A"}</Text>
          <Text style={styles.detail}>City: {person.city || "N/A"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 250,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  detailsContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});
