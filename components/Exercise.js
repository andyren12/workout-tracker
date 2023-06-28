import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Set from "./Set";

const Exercise = ({ exercise }) => {
  const [sets, setSets] = useState([1]);

  const addSet = () => {
    setSets([...sets, sets.length + 1]);
  };

  return (
    <View style={styles.container}>
      <Text>{exercise.exercise}</Text>
      <View style={styles.attributes}>
        <Text>Sets</Text>
        <Text>lbs</Text>
        <Text>Reps</Text>
      </View>
      {sets.map((set, index) => (
        <Set key={index} num={index} />
      ))}
      <TouchableOpacity onPress={addSet}>
        <Text>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    width: "75%",
    gap: 15,
    marginBottom: 30,
  },
  attributes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
