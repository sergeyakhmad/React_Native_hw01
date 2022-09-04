import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import ButtonGoBack from "../../components/ButtonGoBack";

const MainTab = createBottomTabNavigator();

export default function HomeScreen() {
  const showTab = (route) => {
    if (
      (!getFocusedRouteNameFromRoute(route) && route.name === "Posts") ||
      getFocusedRouteNameFromRoute(route) === "DefaultScreen"
    ) {
      return "flex";
    }
    return "none";
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          lineHeight: 22,
          fontFamily: "Roboto-Medium",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 71,
          paddingHorizontal: 58,
          paddingTop: 9,
          paddingBottom: 22,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          height: 40,
          marginHorizontal: 8,
        },
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#ff6c00",
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            display: showTab(route),
            height: 70,
            paddingVertical: 15,
            paddingHorizontal: 50,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
        })}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerStyle: {
            borderBottomColor: "#b3b3b3",
            borderBottomWidth: 1,
          },
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => <ButtonGoBack />,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingVertical: 15,
            paddingHorizontal: 50,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
