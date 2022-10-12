import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";
import GuestLogItem from "../components/game/GuessLogItem";

function gererateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return gererateRandomBetween(min, max, exclude);
  }
  return randomNumber;
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({
  userNumber,
  gameOverHandler,
  updateGuesses,
  setListOfGuesses,
  listOfGuesses,
}) {
  const initialGuess = gererateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    setListOfGuesses((state) => [currentGuess, ...state]);
  }, [currentGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      gameOverHandler();
    }
  }, [currentGuess, userNumber, gameOverHandler]);

  function nextGuessHandler(isLowerValue) {
    updateGuesses();
    if (
      (isLowerValue && currentGuess < userNumber) ||
      (!isLowerValue && currentGuess > userNumber)
    ) {
      Alert.alert("Woooow", "Dont lie dude. I know that its a wrong clue.", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (isLowerValue) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = gererateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
  }
  const guessRoundsListsLength = listOfGuesses.length;

  return (
    <View style={styles.main}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, false)}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, true)}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {listOfGuesses.map((item) => (
          <Text key={item}>{item}</Text>
        ))} */}
        <FlatList
          data={listOfGuesses}
          renderItem={(itemData) => (
            <GuestLogItem
              roundNumber={guessRoundsListsLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 3,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
