// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import LoginScreen from "./Screens/auth/LoginScreen";
// import RegistrationScreen from "./Screens/auth/RegistrationScreen";

// import HomeScreen from "./Screens/main/HomeScreen";
// import PostsScreen from "./Screens/main/PostsScreen";
// import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
// import ProfileScreen from "./Screens/main/ProfileScreen";
// import CommentsScreen from "./Screens/main/CommentsScreen";
// import MapScreen from "./Screens/main/MapScreen";

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// export const UseRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator initialRouteName="Register">
//         <AuthStack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <AuthStack.Screen
//           name="Register"
//           component={RegistrationScreen}
//           options={{ headerShown: false }}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator initialRouteName="Posts">
//       <MainTab.Screen name="Posts" component={PostsScreen} />
//       <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
//       <MainTab.Screen name="Profile" component={ProfileScreen} />
//     </MainTab.Navigator>
//   );
// };
