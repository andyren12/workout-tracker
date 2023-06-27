import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  exerciseImageState,
  exerciseState,
  workoutState,
} from "../atoms/workoutAtom";
import Exercise from "./Exercise";

const ExerciseSearch = ({ closeModal }) => {
  const exerciseImages = useRecoilValue(exerciseImageState);
  const [workout, setWorkout] = useRecoilState(workoutState);
  const [selectedExercise, setSelectedExercise] = useState();

  const addExercise = () => {
    setWorkout([
      ...workout,
      { exercise: "Push up", sets: 3, reps: 10 },
      { exercise: "Sit up", sets: 2, reps: 15 },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercises</Text>
      <FlatList
        data={exerciseImages}
        keyExtractor={(exercise, index) => index}
        renderItem={({ item }) => {
          const urlString = item.image;
          let pathnameParts = urlString.split("/");
          let exerciseId = pathnameParts[pathnameParts.length - 2];

          return (
            <Exercise
              image={urlString}
              id={parseInt(exerciseId)}
              closeModal={closeModal}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
      ></FlatList>
    </View>
  );
};

export default ExerciseSearch;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 10,
  },
});
