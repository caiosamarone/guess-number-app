import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
function gererateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return gererateRandomBetween(min, max, exclude);
  }
  return randomNumber;
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber }) {
  const initialGuess = gererateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber,
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(isLowerValue) {
    if (currentGuess === userNumber) {
      Alert.alert('YESS', 'I GOT IT', [{ text: 'uhu', style: 'cancel' }]);
      return;
    }
    if (
      (isLowerValue && currentGuess < userNumber) ||
      (!isLowerValue && currentGuess > userNumber)
    ) {
      Alert.alert('Woooow', 'Dont lie dude. I know that its a wrong clue.', [
        { text: 'Sorry!', style: 'cancel' },
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
      currentGuess,
    );
    setCurrentGuess(newRandomNumber);
  }

  return (
    <View style={styles.main}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, false)}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, true)}>
            -
          </PrimaryButton>
        </View>
      </View>
      <Text>LOG ROUNDS</Text>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
  },
  buttonContainer: {},
});
