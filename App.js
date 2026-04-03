import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ListItem } from "@rneui/themed";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await fetch("https://api.lagtinget.ax/api/persons.json");
      const data = await response.json();
      setPersons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching persons:", error);
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
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#6e3b6e" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={persons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

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

export default App;
