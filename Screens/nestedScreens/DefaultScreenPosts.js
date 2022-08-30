import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          source={require("../../assets/images/avatar.jpg")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>UserName</Text>
          <Text style={styles.userEmail}>UserEmail</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: item.photo }}
              style={{ ...styles.image, width: width - 32 }}
            />
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnComment}
                onPress={() => navigation.navigate("Comments")}
              >
                <EvilIcons
                  name="comment"
                  size={24}
                  color="#bdbdbd"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.comments}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLocation}
                onPress={() => navigation.navigate("Map", { ...item.location })}
              >
                <EvilIcons
                  name="location"
                  size={24}
                  color="#bdbdbd"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.location}>
                  {item.locality
                    ? `${item.locality}`
                    : `${item.location.latitude} ${item.location.longitude}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
    marginRight: "auto",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  listItem: {
    marginBottom: 32,
  },
  image: {
    borderRadius: 8,
    height: 240,
  },
  description: {
    marginTop: 8,
    alignSelf: "flex-start",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnComment: {
    flexDirection: "row",
    marginRight: 10,
    maxWidth: "20%",
  },
  comments: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
  btnLocation: {
    maxWidth: "80%",
    flexDirection: "row",
  },
  location: {
    fontSize: 16,
    lineHeight: 19,
    color: "#2121212",
    textDecorationLine: "underline",
  },
});
