import { useRouter } from "expo-router";
import { FlatList, Text } from "react-native";
import { useAuth } from "../../src/context/auth";
import UserListItem from "../../src/components/UserListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { API_URL } from "../../src/config";

interface Conversation {
  conversation_id: string;
  last_used_at: string;
  last_message: string;
  display_name: string;
  display_pfp: string;
}

const ChatScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Assuming you have a data source for the list
  const mockData = [
    {
      id: 1,
      username: "test",
      name: "Test Name 1",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
    {
      id: 2,
      username: "test1",
      name: "Test Name 2",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
    {
      id: 3,
      username: "test2",
      name: "Test Name 3",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
    {
      id: 3,
      username: "test2",
      name: "Test Name 3",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
    {
      id: 3,
      username: "test2",
      name: "Test Name 3",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
    {
      id: 3,
      username: "test2",
      name: "Test Name 3",
      image: "https://cdn141.picsart.com/321556657089211.png",
    },
  ]; // replace with your data source

  const [data, setData] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/conversations`)
      .then((response) => response.json())
      .then((data: { conversations: Conversation[] }) =>
        setData(data.conversations)
      );
  }, []);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={data}
      renderItem={({ item }) => (
        <UserListItem
          user={{
            id: item.conversation_id,
            username: item.display_name,
            name: item.display_name,
            image: item.display_pfp,
          }}
        />
      )}
      keyExtractor={(item) => item.conversation_id}
    />
  );
};

export default ChatScreen;
