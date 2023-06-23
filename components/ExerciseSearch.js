import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

const ExerciseSearch = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchAllExercises = (
      url = "https://wger.de/api/v2/exercise/?language=2"
    ) => {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.next) {
            // If there's a next page, fetch it and add it to the exercises
            return fetchAllExercises(data.next).then((nextPageExercises) =>
              data.results.concat(nextPageExercises)
            );
          } else {
            // If there's no next page, just return the exercises
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
  }, []);

  return (
    <View>
      <Text>ExerciseSearch</Text>
      <ScrollView>
        {exercises.map((exercise) => (
          <View key={exercise.id}>
            <Text>{exercise.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseSearch;

const styles = StyleSheet.create({});
