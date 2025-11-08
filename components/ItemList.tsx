import React from "react";
import { View, Pressable, Text, FlatList } from "react-native";

type Item = { 
    title: string; 
    rating: number; 
    done: boolean;
};

type ItemListProps = {
  itemType: "Book" | "Movie";
  styles: any;
  hideCompleted: boolean;
  setHideCompleted: (hide: boolean) => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  displayedItems: Item[];
};

const ItemList = ({ 
  itemType,
  styles, 
  hideCompleted, 
  setHideCompleted, 
  items, 
  setItems, 
  displayedItems 
}: ItemListProps) => {
  
  const completedLabel = itemType === "Book" ? "Read" : "Watched";
  const cardStyle = itemType === "Book" ? styles.bookListCard : styles.movieListCard;
  const headerStyle = itemType === "Book" ? styles.bookListHeader : styles.movieListHeader;
  const rowStyle = itemType === "Book" ? styles.bookRow : styles.movieRow;
  const titleStyle = itemType === "Book" ? styles.bookTitle : styles.text;

  return (
    <View style={cardStyle}>
      <View style={headerStyle}>
        <Text style={styles.text}>Total {itemType}s: {items.length}</Text>
        <Pressable
          style={[styles.toggleButton, hideCompleted && styles.toggleButtonActive]}
          onPress={() => setHideCompleted(!hideCompleted)}
        >
          <Text style={[styles.toggleButtonText, hideCompleted && styles.toggleButtonTextActive]}>
            {hideCompleted ? `Show ${completedLabel}` : `Hide ${completedLabel}`}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={displayedItems}
        renderItem={({ item }) => (
          <View style={rowStyle}>
            <Pressable
              onPress={() =>
                setItems(prev =>
                  prev.map(i => (i === item ? { ...i, done: !i.done } : i))
                )}
              style={[styles.checkbox, item.done && styles.checkboxChecked]}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.done }}
            >
              <Text style={styles.checkboxMark}>{item.done ? "✓" : ""}</Text>
            </Pressable>

            <Text style={[titleStyle, item.done && styles.doneText]}>
              {item.title}
              {itemType === "Book" && (
                <Text style={[styles.bookRating, item.done && styles.doneText]}>
                  {" "}{item.rating}/5
                </Text>
              )}
              {itemType === "Movie" && ` — ${item.rating}/5`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ItemList;