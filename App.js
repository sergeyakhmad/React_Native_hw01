import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { Main } from "./components/Main";

export default function App() {
  // useEffect(() => {
  //   LogBox.ignoreLogs([
  //     "Warning: Async Storage has been extracted from react-native core",
  //   ]);
  // }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

//    <StatusBar style="auto" />
