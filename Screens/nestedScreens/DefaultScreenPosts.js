import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { db } from "../../firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import PostsList from "../../components/PostsList";

export default function DefaultScreenPosts({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { width } = useWindowDimensions();

  const { userId } = useSelector((state) => state.auth);

  const addLike = async (postId, arrUserLikes) => {
    const userExist = arrUserLikes.some((user) => user === userId);

    if (!userExist) {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { likes: [...arrUserLikes, userId] });
    }
  };

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const { userAvatar, login, userEmail } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          source={
            userAvatar
              ? { uri: userAvatar }
              : require("../../assets/images/avatar.jpg")
          }
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <PostsList posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", //
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
