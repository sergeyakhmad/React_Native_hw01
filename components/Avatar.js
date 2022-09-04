import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import { changeAvatarUser } from "../redux/auth/authOperations";
import { uploadImageToServer } from "../helpers/uploadImageToServer";

export default function Avatar() {
  const dispatch = useDispatch();
  const { userAvatar } = useSelector((state) => state.auth);

  // const [avatar, setAvatar] = useState(userAvatar);

  const addAvatarHandler = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      const avatarURL = await uploadImageToServer(uri, "avatars");
      dispatch(changeAvatarUser(avatarURL));
    }
  };

  const deleteAvatarHandler = () => {
    // setAvatar(null);
    dispatch(changeAvatarUser(null));
  };

  return (
    <View style={styles.container}>
      {userAvatar && (
        <Image style={styles.avatar} source={{ uri: userAvatar }} />
      )}
      <TouchableOpacity
        style={styles.avatarBtn}
        activeOpacity={0.8}
        onPress={userAvatar ? deleteAvatarHandler : addAvatarHandler}
      >
        <AntDesign
          name="pluscircleo"
          size={25}
          color="#ff6c00"
          style={userAvatar && styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  deleteIcon: {
    color: "#bdbdbd",
    transform: [{ rotate: "45deg" }],
  },
});
