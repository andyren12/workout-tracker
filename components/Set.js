import { useState, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const Set = ({ index, set, onDelete }) => {
  const [reps, setReps] = useState("");
  const [lbs, setLbs] = useState("");
  const renderRightAction = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.rightAction}>
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    set.reps = reps;
    set.lbs = lbs;
  }, [reps, lbs]);

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <View style={styles.attributes}>
        <Text>{index + 1}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(num) => setLbs(num)}
          value={lbs}
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(num) => setReps(num)}
          value={reps}
          placeholder="0"
        />
        <TouchableOpacity>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default Set;

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  actionText: {
    color: "white",
    padding: 20,
    textAlign: "right",
  },
  attributes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
