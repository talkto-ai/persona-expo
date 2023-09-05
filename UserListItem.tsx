import { View, Text, Image, TouchableOpacity } from "react-native";
import { User, useAuth } from "../context/auth";
import { useChatContext } from "stream-chat-expo";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const UserListItem = ({ user }: { user: User }) => {
  const router = useRouter();

  const startChannel = async () => {
    router.push(`/chat/channel/5`);
  };

  return (
    <TouchableOpacity
      onPress={startChannel}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        height: 76,
      }}
    >
      <Image
        source={{ uri: user.image }}
        style={{ width: 45, height: 45, borderRadius: 25, marginLeft: 22 }}
      />
      <View
        style={{
          marginLeft: 14,
          flex: 1,
          borderBottomColor: "#eeeeef",
          borderBottomWidth: 1,
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 6,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{user.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#909094" }}>12/31/00</Text>
            <Entypo name="chevron-right" size={20} color="#c5c5c7" />
          </View>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontWeight: "400",
            paddingTop: 4,
            fontSize: 14,
            color: "gray",
          }}
        >
          Last message...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserListItem;
