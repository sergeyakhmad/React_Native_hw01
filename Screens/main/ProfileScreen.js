import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";
import Avatar from "../../components/Avatar";
import PostsList from "../../components/PostsList";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { login, userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getAllUserPosts();
  }, []);

  const getAllUserPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    // const querySnapshot = await getDocs(q);
    // setUserPosts(
    //   querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
    // );
    onSnapshot(q, (querySnapshot) =>
      setUserPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
      )
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/back_graund.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Avatar />
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={signOut}
          >
            <MaterialIcons name="logout" size={24} color={"#bdbdbd"} />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>{login}</Text>
          <PostsList posts={userPosts}/>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  profile: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 143,
    paddingTop: 92,
    paddingHorizontal: 16,
    position: "relative",
  },
  avatar: {
    position: "absolute",
    top: -60,
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
