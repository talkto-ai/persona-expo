import { Link, Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useAuth } from "../../src/context/auth";
import { Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ChatLayout() {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <OverlayProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Messages",
            headerLargeTitle: true,
            headerRight: () => (
              <Link href="/chat/newChannel">
                <Entypo name="new-message" size={18} color="royalblue" />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="newChannel"
          options={{
            presentation: "modal",
            title: "New Character",
            headerLeft: () => (
              <TouchableHighlight onPress={() => navigation.goBack()}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            ),
            headerRight: () => (
              <TouchableHighlight>
                <Text>Done</Text>
              </TouchableHighlight>
            ),
          }}
        />
      </Stack>
    </OverlayProvider>
  );
}
