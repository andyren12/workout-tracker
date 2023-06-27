// import {
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
// } from "react-native";
// import React, { useState } from "react";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import ExerciseSearch from "../components/ExerciseSearch";
// import { useRecoilValue } from "recoil";
// import { workoutState } from "../atoms/workoutAtom";
// import Exercise from "../components/Exercise";

// const WorkoutScreen = () => {
//   const user = auth.currentUser;
//   const startTime = new Date();
//   const [modalVisible, setModalVisible] = useState(false);
//   const workout = useRecoilValue(workoutState);

//   const finishedWorkout = {
//     startTime: startTime,
//     workout: workout,
//   };

//   const finishWorkout = async () => {
//     try {
//       await updateDoc(doc(db, "users", `${user.email}`), {
//         workouts: arrayUnion(finishedWorkout),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addExercise = () => {
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Workout</Text>
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         style={styles.button}
//       >
//         <Text style={styles.buttonText}>Add Exercise</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={finishWorkout} style={styles.button}>
//         <Text style={styles.buttonText}>Finish Workout</Text>
//       </TouchableOpacity>
//       <Modal visible={modalVisible} animationType="slide">
//         <SafeAreaView style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text>Close</Text>
//             </TouchableOpacity>
//             <ExerciseSearch />
//           </View>
//         </SafeAreaView>
//       </Modal>
//     </View>
//   );
// };

// export default WorkoutScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "60%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     height: "90%",
//     width: "100%",
//     paddingTop: 20,
//   },
// });

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
import ExerciseSearch from "../components/ExerciseSearch";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { workoutState } from "../atoms/workoutAtom";

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth.currentUser;
  const startTime = new Date();
  const workout = useRecoilValue(workoutState);

  const finishedWorkout = {
    startTime: startTime,
    workout: workout,
  };

  const finishWorkout = async () => {
    try {
      await updateDoc(doc(db, "users", `${user.email}`), {
        workouts: arrayUnion(finishedWorkout),
      });
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
                <ExerciseSearch closeModal={closeModal} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
    marginTop: 40,
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
