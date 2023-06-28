import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Set = ({ num }) => {
  const [reps, setReps] = useState("");
  const [lbs, setLbs] = useState("");

  return (
    <View style={styles.attributes}>
      <Text>{num + 1}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(num) => setLbs(num)}
        value={lbs}
        placeholder="0"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(num) => setReps(num)}
        value={reps}
        placeholder="0"
      />
    </View>
  );
};

export default Set;

const styles = StyleSheet.create({
  attributes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
