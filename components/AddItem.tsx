import React from "react";
import { StyleSheet, View, Pressable, TextInput, Text, Keyboard } from "react-native";


type AddItemProps = {
    itemType: "Book" | "Movie";
    titleInput: string;
    secondaryInput: string;
    ratingInput: string;
    setTitleInput: (text: string) => void;
    setSecondaryInput: (text: string) => void;
    setRatingInput: (text: string) => void;
    onAdd: () => void;
}

const AddItem = ({
    itemType,
    titleInput,
    secondaryInput,
    ratingInput,
    setTitleInput,
    setSecondaryInput,
    setRatingInput,
    onAdd
}: AddItemProps) => {
    
    const handleAdd = () => {
        Keyboard.dismiss();
        onAdd();
    };

    const secondaryLabel = itemType === "Book" ? "Author" : "Writer";
    
    return (
        <View style={styles.addItemCard}>
          <Text style={styles.text}>Add a New {itemType}</Text>
          
          <TextInput
              style={styles.input}
              placeholder={`${itemType} title`}
              value={titleInput}
              onChangeText={setTitleInput}
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            
          <TextInput
              style={styles.input}
              placeholder={secondaryLabel}
              value={secondaryInput}
              onChangeText={setSecondaryInput}
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            
          <TextInput
              style={styles.input}
              placeholder="Rating (1-5)"
              value={ratingInput}
              onChangeText={setRatingInput}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            
          <Pressable
            style={styles.button}
            onPress={handleAdd}>
            <Text style={styles.buttonText}>Add {itemType}</Text>
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    addItemCard: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        gap: 12,
    },
    text: { 
        fontSize: 18, 
        color: "black" 
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#ff5ec4",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    buttonText: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "600" 
    },
});

export default AddItem;