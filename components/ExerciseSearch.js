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

const ExerciseSearch = () => {
  const exercises = useRecoilValue(exerciseState);
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
    <View>
      <Text>ExerciseSearch</Text>
      <TouchableOpacity onPress={addExercise}>
        <Text>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={exerciseImages}
        keyExtractor={(exercise, index) => index}
        renderItem={({ item }) => {
          let urlString = item.image;

          let pathnameParts = urlString.split("/");
          let exerciseId = pathnameParts[pathnameParts.length - 2]; // The number is the second last part of the path

          return <Exercise image={urlString} uuid={parseInt(exerciseId)} />;
        }}
      ></FlatList>
      {/* <FlatList
        data={exercises}
        keyExtractor={(exercise, index) => index}
        renderItem={({ item }) => (
          <Exercise name={item.name} uuid={item.uuid} />
        )}
      ></FlatList> */}
    </View>
  );
};

export default ExerciseSearch;

const styles = StyleSheet.create({});
