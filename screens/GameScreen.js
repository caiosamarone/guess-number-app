import { View, Text, StyleSheet } from 'react-native';
import Title from '../components/Title';

function GameScreen({ userNumber }) {
  console.log(userNumber);
  return (
    <View style={styles.main}>
      <Title>Opponent's guesss'</Title>
      {/* GUESS */}
      <View>
        <Text>Higher or lower?</Text>
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
});
