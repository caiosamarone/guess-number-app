import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    padding: 16,
    marginTop: width < 380 ? 16 : 18,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;
