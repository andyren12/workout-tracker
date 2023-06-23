import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import ExerciseSearch from "../components/ExerciseSearch";

const WorkoutScreen = () => {
  const user = auth.currentUser;
  const startTime = new Date();
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const finishWorkout = async () => {
    try {
      setExercises([]);
      const workout = {
        startTime: startTime,
        exercises: exercises,
      };
      await updateDoc(doc(db, "users", `${user.email}`), {
        workouts: arrayUnion(workout),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addExercise = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text>Workout</Text>
      <TouchableOpacity onPress={addExercise} style={styles.button}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={finishWorkout} style={styles.button}>
        <Text style={styles.buttonText}>Finish Workout</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={false} animationType="slide">
        <SafeAreaView>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
          <ExerciseSearch />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
