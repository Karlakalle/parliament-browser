import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListItem } from "@rneui/themed";
import { PersonsContext } from "./_layout";

export default function PersonsPage() {
  const { persons, setPersons } = useContext(PersonsContext);
  const [loading, setLoading] = useState(!persons.length);

  useEffect(() => {
    if (!persons.length) {
      fetchPersons();
    }
  }, [persons.length]);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.lagtinget.ax/api/persons.json");
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error("Failed to fetch persons on persons page:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const hasImage = item.image && item.image.url;

    return (
      <ListItem containerStyle={styles.listItem}>
        <View style={styles.imageContainer}>
          {hasImage ? (
            <Image source={{ uri: item.image.url }} style={styles.image} />
          ) : (
            <View style={styles.emptyImage} />
          )}
        </View>
        <ListItem.Content>
          <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>
              {item.born ? `Birthday: ${item.born}` : "Birthday: N/A"}
            </Text>
            <Text style={styles.detail}>
              {item.address && item.city
                ? `${item.address}, ${item.city}`
                : item.address || item.city || "Address: N/A"}
            </Text>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6e3b6e" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={persons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  imageContainer: {
    width: 80,
    height: 100,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 12,
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
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 5,
  },
  detail: {
    fontSize: 12,
    color: "#666",
    marginVertical: 2,
  },
});
