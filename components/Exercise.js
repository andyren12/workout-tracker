import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { exerciseState } from "../atoms/workoutAtom";

const Exercise = ({ image, uuid }) => {
  const exercises = useRecoilValue(exerciseState);
  const exercise = exercises.find((exercise) => exercise.id === uuid);

  return (
    <View>
      <Text>{exercise?.name}</Text>
      <Text>{image}</Text>
      <Image source={{ uri: image, width: 100, height: 100 }} />
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({});
