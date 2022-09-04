import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { formatDate } from "../../helpers/formatDate";

export default function CommentsScreen({ route }) {
  const { postId, postImage, postComments } = route.params;
  const { userAvatar, userEmail, login } = useSelector((state) => state.auth);

  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(postComments);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    getAllComments();
  }, []);

  const createCommentToPost = async () => {
    if (newComment) {
      const docRef = doc(db, "posts", postId);

      await updateDoc(docRef, {
        comments: [
          ...allComments,
          {
            comment: newComment,
            userAvatar,
            userEmail,
            login,
            commentDate: Date.now(),
          },
        ],
      });
    }

    setNewComment("");
    getAllComments();
  };

  const getAllComments = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnapshot = await getDoc(docRef);

    setAllComments(docSnapshot.data().comments);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.inner}>
          <Image style={styles.postImage} source={{ uri: postImage }} />
          <FlatList
            style={styles.list}
            data={allComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 24,
                  flexDirection:
                    item.userEmail !== userEmail ? "row" : "row-reverse",
                }}
              >
                <Image
                  style={{
                    ...styles.avatar,
                    marginRight: item.userEmail !== userEmail ? 16 : 0,
                    marginLeft: item.userEmail !== userEmail ? 0 : 16,
                  }}
                  source={{ uri: item.userAvatar }}
                />
                <View
                  style={{
                    ...styles.wrappComments,
                    borderTopLeftRadius: item.userEmail !== userEmail ? 0 : 6,
                    borderTopRightRadius: item.userEmail !== userEmail ? 6 : 0,
                  }}
                >
                  <Text>{item.comment}</Text>
                  <Text>{formatDate(item.commentDate)}</Text>
                </View>
              </View>
            )}
          />
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 105 : 16,
            }}
          >
            <TextInput
              placeholder="Комментировать..."
              placeholderTextColor="#bdbdbd"
              value={newComment}
              onChangeText={setNewComment}
              onFocus={() => {
                setIsShowKeyboard(true);
                setFocusInput(true);
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                setFocusInput(false);
              }}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={createCommentToPost}
            >
              <AntDesign name="arrowup" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
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
    flex: 1,
    justifyContent: "space-between",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    height: 240,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  list: {
    flex: 1,
    marginHorizontal: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  wrappComments: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
  },
  form: {
    justifyContent: "center",
    height: 80,
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
    paddingHorizontal: 16,
    minHeight: 50,
  },
  button: {
    position: "absolute",
    right: 8,
    borderRadius: 50,
    backgroundColor: "#ff6c00",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});
