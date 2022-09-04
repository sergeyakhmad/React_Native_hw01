import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function PostsList({ posts }) {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.auth);

  const addLike = async (postId, arrUserLikes) => {
    const userExist = arrUserLikes.some((user) => user === userId);

    if (!userExist) {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { likes: [...arrUserLikes, userId] });
    }
  };

  return (
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.postId,
                    postImage: item.photo,
                    postComments: item.comments,
                  })
                }
              >
                <EvilIcons
                  name="comment"
                  size={24}
                  style={{
                    marginRight: 6,
                    color: item.comments.length ? "#ff6c00" : "#bdbdbd",
                  }}
                />
                <Text style={styles.btnTitle}>{item.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, marginLeft: 24 }}
                onPress={() => {
                  addLike(item.postId, item.likes);
                }}
              >
                <SimpleLineIcons
                  name="like"
                  size={18}
                  style={{
                    marginRight: 6,
                    color: item.likes.length ? "#ff6c00" : "#bdbdbd",
                  }}
                />
                <Text style={styles.btnTitle}>{item.likes.length}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Map", {
                  ...item.location,
                  locality: item.locality,
                })
              }
            >
              <EvilIcons
                name="location"
                size={24}
                color="#bdbdbd"
                style={{ marginRight: 4 }}
              />
              <Text
                style={{
                  ...styles.btnTitle,
                  textDecorationLine: "underline",
                }}
              >
                {item.locality
                  ? `${item.locality}`
                  : `${item.location.latitude} ${item.location.longitude}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
});
