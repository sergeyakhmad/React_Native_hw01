import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useRoute } from "../router";

const AuthStack = createNativeStackNavigator();

export const Main = () => {
  const dispatch = useDispatch();
  const { authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(authStatus);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
