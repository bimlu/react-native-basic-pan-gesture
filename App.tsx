import React from "react";
import { Image, StyleSheet, View } from "react-native";
import MovableCircle from "./MovableCircle";

const App = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/agrass.png")} style={styles.bg} />
      <View style={styles.circleContainer}>
        <MovableCircle />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  bg: {
    width: "100%",
    resizeMode: "stretch",
    position: "absolute",
  },
  circleContainer: {
    height: "100%",
    width: "100%",
  },
});
