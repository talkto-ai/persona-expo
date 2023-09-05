import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { User } from "../../src/context/auth";
import UserListItem from "../../src/components/UserListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewChannel = () => {
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    additionalInfo: "",
  });

  const handleNewCharacter = () => {};

  return (
    <View style={styles.modalView}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <MaterialCommunityIcons
          name="face-man-profile"
          size={160}
          color="black"
        />
        <Button title="Add Photo" />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setNewCharacter({ ...newCharacter, name: text })
        }
        value={newCharacter.name}
        autoFocus
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setNewCharacter({ ...newCharacter, description: text })
        }
        value={newCharacter.description}
        placeholder="Description"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setNewCharacter({ ...newCharacter, additionalInfo: text })
        }
        value={newCharacter.additionalInfo}
        placeholder="Additional Info"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1F6",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#F2F1F6",
    alignItems: "flex-start",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333333",
    fontSize: 20,
  },
  input: {
    width: "100%",
    borderColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 14,
    color: "#7E7D83",
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
});
export default NewChannel;
