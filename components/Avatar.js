import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Avatar() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        // source={require("../assets/images/avatar.jpg")}
      />
      <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.8}>
        <AntDesign name="pluscircleo" size={25} color="#ff6c00" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  avatarBtn: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
});
