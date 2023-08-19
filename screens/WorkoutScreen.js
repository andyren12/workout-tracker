import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import ExerciseModal from "../components/ExerciseModal";
import { auth, db } from "../firebase";
import { useRecoilState } from "recoil";
import { workoutState } from "../atoms/workoutAtom";
import Exercise from "../components/Exercise";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth.currentUser;
  const startTime = new Date();
  const [workout, setWorkout] = useRecoilState(workoutState);

  const finishedWorkout = {
    startTime: startTime,
    endTime: new Date(),
    workout: workout,
  };

  const finishWorkout = async () => {
    try {
      await updateDoc(doc(db, "users", `${user.email}`), {
        workouts: arrayUnion(finishedWorkout),
      });
      setWorkout([]);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <ExerciseModal closeModal={closeModal} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {workout.map((exercise, index) => (
        <Exercise key={index} exercise={exercise.exercise} />
      ))}
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableHighlight>
      <TouchableOpacity onPress={finishWorkout} style={styles.button}>
        <Text style={styles.buttonText}>Finish Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    height: "60%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
