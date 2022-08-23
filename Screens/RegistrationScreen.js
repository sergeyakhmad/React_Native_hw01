import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Avatar from "../components/Avatar";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const { width } = useWindowDimensions();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();
    console.log(state);

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require("../assets/images/back_graund.jpg")}
        >
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior={Platform.OS === "ios" && "padding"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 45,
              }}
            >
              <View style={styles.avatarWrap}>
                <Avatar />
              </View>
              <View style={{ width: width - 2 * 16 }}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Регистрация</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={styles.input}
                    value={state.login}
                    placeholder="Логин"
                    placeholderTextColor="#bdbdbd"
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={(value) => {
                      setState((prev) => ({ ...prev, login: value }));
                    }}
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={styles.input}
                    value={state.email}
                    placeholder="Адрес электронной почты"
                    placeholderTextColor="#bdbdbd"
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={(value) => {
                      setState((prev) => ({ ...prev, email: value }));
                    }}
                  />
                </View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={styles.input}
                    value={state.password}
                    placeholder="Пароль"
                    placeholderTextColor="#bdbdbd"
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={(value) => {
                      setState((prev) => ({ ...prev, password: value }));
                    }}
                    secureTextEntry={true}
                  />
                  <TouchableOpacity
                    style={styles.btnShowPass}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSecurePassword((prev) => !prev);
                    }}
                  >
                    <Text style={styles.btnShowPassTitle}>
                      {securePassword ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!isShowKeyboard && (
                  <View>
                    <TouchableOpacity
                      style={styles.btn}
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link}>
                      <Text style={styles.linkTitle}>
                        Уже есть аккаунт? Войти
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    alignItems: "center",
  },
  avatarWrap: {
    // justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
    top: -60,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    height: 50,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f6f6f6",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnShowPass: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  btnShowPassTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#ff6c00",
      },
      android: {
        backgroundColor: "#ff6c00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#ff6c00" : "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  linkTitle: {
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
