import { Text, View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}> {children}</Text>
    </View>
  );
}

export default NumberContainer;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: width < 380 ? 12 : 24,
    borderRadius: 8,
    margin: width < 380 ? 12 : 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: width < 380 ? 28 : 36,
    // textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
