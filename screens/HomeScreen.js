import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useSetRecoilState } from "recoil";
import {
  exerciseImageState,
  exerciseState,
  workoutState,
} from "../atoms/workoutAtom";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const setExercises = useSetRecoilState(exerciseState);
  const setWorkout = useSetRecoilState(workoutState);
  const setExerciseImages = useSetRecoilState(exerciseImageState);

  useEffect(() => {
    const fetchAllExercises = (
      url = "https://wger.de/api/v2/exercise/?language=2"
    ) => {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.next) {
            return fetchAllExercises(data.next).then((nextPageExercises) =>
              data.results.concat(nextPageExercises)
            );
          } else {
            return data.results;
          }
        });
    };

    fetchAllExercises()
      .then((exercises) => {
        setExercises(exercises);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const fetchExerciseImages = (
      url = "https://wger.de/api/v2/exerciseimage/?is_main=True"
    ) => {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.next) {
            return fetchExerciseImages(data.next).then((nextPageExercises) =>
              data.results.concat(nextPageExercises)
            );
          } else {
            return data.results;
          }
        });
    };

    fetchExerciseImages()
      .then((exerciseImages) => {
        setExerciseImages(exerciseImages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const createWorkout = async () => {
    navigation.navigate("Workout");
    setWorkout([]);
  };

  return (
    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <TouchableOpacity onPress={handleSignout} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={createWorkout} style={styles.button}>
        <Text style={styles.buttonText}>Create Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
