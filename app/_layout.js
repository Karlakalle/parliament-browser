import React, { createContext, useState } from "react";
import { Stack } from "expo-router";

export const PersonsContext = createContext({
  persons: [],
  setPersons: () => {},
});

export default function RootLayout() {
  const [persons, setPersons] = useState([]);

  return (
    <PersonsContext.Provider value={{ persons, setPersons }}>
      <Stack screenOptions={{ headerShown: false }} />
    </PersonsContext.Provider>
  );
}
