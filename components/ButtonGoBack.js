import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function ButtonGoBack() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      navigation={navigation}
      style={{ width: 24, marginLeft: 16 }}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
    </TouchableOpacity>
  );
}
