import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Set from "./Set";
import { useRecoilState } from "recoil";
import { workoutState } from "../atoms/workoutAtom";

const Exercise = ({ exercise }) => {
  const emptySet = {
    lbs: "",
    reps: "",
  };
  const [sets, setSets] = useState([]);
  const [workout, setWorkout] = useRecoilState(workoutState);
  const addSet = () => {
    setSets([...sets, emptySet]);
  };

  const onDelete = (setToDelete) => {
    setSets(sets.filter((set) => set !== setToDelete));
  };

  const finishExercise = () => {
    const exerciseFound = workout.find(
      (exercises) => exercises.exercise === exercise
    );
    if (exerciseFound) {
      exerciseFound.sets = sets;
    }
  };

  useEffect(() => {
    addSet();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{exercise.exercise}</Text>
      <View style={styles.attributes}>
        <Text>Sets</Text>
        <Text>lbs</Text>
        <Text>Reps</Text>
        <Text onPress={finishExercise}>Finish</Text>
      </View>
      {sets.map((set, index) => (
        <Set index={index} set={set} onDelete={() => onDelete(set)} />
      ))}
      <TouchableOpacity
        onPress={() => {
          addSet();
        }}
      >
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
