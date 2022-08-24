import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const MainTab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: "#ff6c00",
        // tabBarInactiveTintColor: "#212121",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          lineHeight: 22,
          fontFamily: "Roboto-Medium",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 71,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Posts") {
            return <SimpleLineIcons name="grid" size={size} color={color} />;
          } else if (route.name === "CreatePosts") {
            return (
              <AntDesign
                name="plus"
                size={size}
                color="#fff"
                style={styles.btnAddPost}
              />
            );
          } else if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />;
          }
        },
      })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24, marginRight: 10 }}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <MaterialIcons name="logout" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  btnAddPost: {
    textAlign: "center",
    backgroundColor: "#ff6c00",
    width: 70,
    height: 40,
    borderRadius: 20,
    paddingTop: 7,
  },
});
