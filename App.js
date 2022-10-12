import {
  StyleSheet,
  ImageBackground,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [listOfGuesses, setListOfGuesses] = useState([]);
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  function resetGame() {
    setUserNumber(null);
    setGameIsOver(true);
    setNumberOfGuesses(0);
    setListOfGuesses([]);
  }

  function updateGuesses() {
    setNumberOfGuesses((guesses) => guesses + 1);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        gameOverHandler={gameOverHandler}
        updateGuesses={updateGuesses}
        setListOfGuesses={setListOfGuesses}
        listOfGuesses={listOfGuesses}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        resetGame={resetGame}
        numberOfGuesses={numberOfGuesses}
        userNumber={userNumber}
      />
    );
  }

  return (
    <LinearGradient
      onLayout={onLayoutRootView}
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeAreaView}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
