import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { exerciseImageState } from "../atoms/workoutAtom";
import ExerciseBanner from "./ExerciseBanner";

const ExerciseModal = ({ closeModal }) => {
  const exerciseImages = useRecoilValue(exerciseImageState);

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
            <ExerciseBanner
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

export default ExerciseModal;

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
