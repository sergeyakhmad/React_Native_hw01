import {
  Image,
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
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const initialState = {
  photo: null,
  description: "",
  locality: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(cameraPermission.status === "granted");

      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      setHasPermissionLocation(locationPermission.status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    // console.log("hasPermissionCamera", hasPermissionCamera);
    // console.log("hasPermissionLocation", hasPermissionLocation);

    if (cameraRef) {
      const picture = await cameraRef.takePictureAsync();
      setState((prevState) => ({ ...prevState, photo: picture.uri }));
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    // const addres = await Location.reverseGeocodeAsync(coords);

    navigation.navigate("Posts", {
      screen: "DefaultScreen",
      params: { ...state, location: coords },
    });

    keyboardHide();
    setState(initialState);
  };

  if (hasPermissionCamera === null) {
    return <View />;
  }
  if (hasPermissionCamera === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasPermissionLocation === null) {
    return <View />;
  }
  if (hasPermissionLocation === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.inner}>
          <Camera
            ref={(camRef) => setCameraRef(camRef)}
            style={styles.camera}
            type={type}
          >
            <TouchableOpacity
              style={{
                ...styles.snapBtn,
                transform: [{ translateX: -30 }, { translateY: -30 }],
              }}
              onPress={takePhoto}
              activeOpacity={0.8}
            >
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </TouchableOpacity>
            {state.photo && (
              // <View style={styles.photoContainer}>
              <Image
                source={{ uri: state.photo }}
                style={{ width: width - 32, height: 240 }}
              />
              // </View>
            )}
          </Camera>
          <TouchableOpacity style={{ marginTop: 8 }} activeOpacity={0.8}>
            <Text style={styles.text}>
              {state.photo ? "Редактировать фото" : "Загрузите фото"}
            </Text>
          </TouchableOpacity>
          <View style={styles.wrapInput}>
            <TextInput
              placeholder="Название..."
              placeholderTextColor="#bdbdbd"
              value={state.description}
              style={state.input}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, description: value }))
              }
            />
          </View>
          <View style={styles.wrapInput}>
            <EvilIcons
              name="location"
              size={24}
              color="#bdbdbd"
              style={styles.icon}
            />
            <TextInput
              placeholder="Местность..."
              placeholderTextColor="#bdbdbd"
              value={state.locality}
              style={{ ...styles.input, paddingStart: 28 }}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, locality: value }))
              }
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: state.photo ? "#ff6c00" : "#f6f6f6",
            }}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text
              style={{
                ...styles.btnTitle,
                color: state.photo ? "#fff" : "#bdbdbd",
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setState(initialState)}
          >
            <AntDesign name="delete" size={24} color="#bdbdbd" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    marginHorizontal: 16,
  },
  camera: {
    position: "relative",
    height: 240,
    marginTop: 32,
    // borderWidth: 1,
    // borderColor: "#e8e8e8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
  snapBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    marginTop: 32,
    paddingBottom: 15,
  },
  input: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  deleteBtn: {
    backgroundColor: "#f6f6f6",
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
    marginBottom: 22,
  },
  icon: {
    position: "absolute",
    bottom: 20,
  },
});
