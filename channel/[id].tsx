import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, TextInput, Button, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { API_URL } from "../../../src/config";

type Message = {
  id: string;
  created_at: string;
  role: string;
  content: string;
};

type Conversation = {
  conversation_id: string;
  last_used_at: string;
  last_message: string;
  display_name: string;
  display_pfp: string;
};

interface ResponseData {
  messages: Array<Message>;
  conversation: Conversation;
}

const mockChatResponse = {
  messages: [
    {
      id: "1",
      created_at: new Date().toISOString(),
      role: "user",
      content: "Hello, this is a test message",
    },
    {
      id: "2",
      created_at: new Date().toISOString(),
      role: "admin",
      content: "Hi, this is a response to your test message",
    },
  ],
  conversation: {
    conversation_id: "1",
    last_used_at: new Date().toISOString(),
    last_message: "Hi, this is a response to your test message",
    display_name: "Test User",
    display_pfp: "https://cdn141.picsart.com/321556657089211.png",
  },
};

const ChannelScreen = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState<string>("");
  const { id } = useLocalSearchParams();
  const [giftedMessages, setGiftedMessages] = useState<Array<IMessage>>([]);

  const convertMessages = (messages: Array<Message>): Array<IMessage> => {
    return messages.map((message) => ({
      _id: message.id,
      text: message.content,
      createdAt: new Date(message.created_at),
      user: {
        _id: message.role === "user" ? 1 : 2,
        name: message.role === "user" ? "You" : conversation?.display_name,
        avatar:
          message.role === "user"
            ? "Your avatar URL"
            : conversation?.display_pfp,
      },
    }));
  };

  useEffect(() => {
    const fetchConversation = async () => {
      const response = await axios.get(
        `${API_URL}/api/conversations?conversation_id=${id}`
      );

      const responseData = response.data as ResponseData;
      // const responseData = mockChatResponse;
      setMessages(responseData.messages);
      setConversation(responseData.conversation);
      setGiftedMessages(convertMessages(responseData.messages));
    };

    fetchConversation();
  }, [id]);

  const sendMessage = async () => {
    if (input) {
      const response = await axios.post(
        `/api/conversations?conversation_id=${id}`,
        { content: input }
      );
      const responseData = response.data as Message;
      setMessages([...messages, responseData]);
      setInput("");
    }
  };

  const onSend = (newMessages = []) => {
    // todo: decide whether we should be optimistically handling this
    setGiftedMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    sendMessage();
  };

  const renderBubble = (props) => {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={300}
        key={props.currentMessage._id}
      >
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#007aff", // Change this to the color you want
              padding: 2,
            },
            left: {
              backgroundColor: "#e1e1e1", // Change this to the color you want
              padding: 2,
            },
          }}
          textStyle={{
            right: {
              color: "#fff", // Change this to the color you want
            },
            left: {
              color: "#000", // Change this to the color you want
            },
          }}
          timeTextStyle={{
            right: {
              color: "grey", // Change this to the color you want
            },
            left: {
              color: "grey", // Change this to the color you want
            },
          }}
          renderTime={() => null}
        />
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <GiftedChat
          messages={giftedMessages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChannelScreen;
