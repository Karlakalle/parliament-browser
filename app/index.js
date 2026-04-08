import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PersonsContext } from "./_layout";

export default function Index() {
  const { setPersons } = useContext(PersonsContext);
  const [loaded, setLoaded] = useState(false);
  const [timeoutDone, setTimeoutDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const response = await fetch(
          "https://api.lagtinget.ax/api/persons.json",
        );
        const data = await response.json();
        if (mounted) {
          setPersons(data);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Failed to fetch persons:", error);
        if (mounted) {
          setLoaded(true);
        }
      }
    };

    loadData();
    const timeout = setTimeout(() => {
      if (mounted) {
        setTimeoutDone(true);
      }
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [setPersons]);

  useEffect(() => {
    if (loaded && timeoutDone) {
      router.replace("/persons");
    }
  }, [loaded, timeoutDone, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Rowboat-on-a-calm-sea-with-text.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});
