import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { exerciseState, workoutState } from "../atoms/workoutAtom";

const ExerciseBanner = ({ image, id, closeModal }) => {
  const exercises = useRecoilValue(exerciseState);
  const [workout, setWorkout] = useRecoilState(workoutState);

  const exercise = exercises.find((exercise) => exercise.id === id);

  const categories = {
    8: "Arms",
    9: "Legs",
    10: "Abs",
    11: "Chest",
    12: "Back",
    13: "Shoulders",
    14: "Calves",
    15: "Cardio",
  };

  const addExercise = () => {
    closeModal();
    setWorkout([...workout, { exercise: exercise.name }]);
  };

  return (
    <View style={styles.itemContainer}>
      {exercise && (
        <TouchableOpacity style={styles.container} onPress={addExercise}>
          <Image
            source={{ uri: image, width: 50, height: 50 }}
            resizeMode="contain"
          />
          <View>
            <Text>{exercise.name}</Text>
            <Text>{categories[exercise.category]}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExerciseBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    width: "100%",
  },
});
