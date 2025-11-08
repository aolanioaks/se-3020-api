import { Text, View, StyleSheet, Pressable, Alert, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Link } from "expo-router";
import { useTheme } from "@/context/themeContext";
import useShake from "@/hooks/useShake";
import useAsyncStorageState from "@/hooks/useAsyncStorage"; 
import AddItem from "@/components/AddItem";
import ItemList from "@/components/ItemList";

type Book = { title: string; rating: number; done: boolean };

export default function BookScreen() {
  const { theme, cycleTheme } = useTheme();
  useShake(cycleTheme); 

  const [books, setBooks] = useAsyncStorageState<Book[]>("pp.books", []); 
  const [titleInput, setTitleInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [hideReadBooks, setHideReadBooks] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooksFromApi = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://openlibrary.org/subjects/horror.json?limit=5"
      );
      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const json = await response.json();

      const apiBooks: Book[] = (json.works || []).map((w: any) => ({
        title: w.title || "Untitled",
        rating: 4,
        done: false,
      }));

      setBooks(apiBooks);
    } catch (err) {
      console.error(err);
      Alert.alert("Could not load books from the API.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      
    }
  };

  useEffect(() => {
    fetchBooksFromApi(); 
  }, []);

  const styles = useMemo(() => makeStyles(theme), [theme]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 10 }}>
          Loading books...
        </Text>
      </View>
    );
  }

  const addBook = () => {
    const title = titleInput.trim();
    const rating = Number(ratingInput);
    if (title && rating >= 1 && rating <= 5) {
      setBooks([...books, { title, rating, done: false }]);
      setTitleInput("");
      setAuthorInput("");
      setRatingInput("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Please enter a valid title and rating (1-5).");
    }
  };

  const displayedBooks = hideReadBooks ? books.filter(b => !b.done) : books;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.themeBadge}>
          <Text style={styles.themeBadgeText}>
            Theme: {theme.name.toUpperCase()} (shake to change)
          </Text>
        </View>

        <AddItem
          itemType="Book"
          titleInput={titleInput}
          secondaryInput={authorInput}
          ratingInput={ratingInput}
          setTitleInput={setTitleInput}
          setSecondaryInput={setAuthorInput}
          setRatingInput={setRatingInput}
          onAdd={addBook}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <ItemList
          itemType="Book"
          styles={styles}
          hideCompleted={hideReadBooks}
          setHideCompleted={setHideReadBooks}
          items={books}
          setItems={setBooks}
          displayedItems={displayedBooks}
        />

        <Link
          href={{ 
            pathname: "/movies", 
            params: { alertMsg: `You have read ${books.length} books this year!` } 
          }}
          asChild
        >
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Movies</Text>
          </Pressable>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}

const makeStyles = (theme: import("@/context/themeContext").Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      gap: 20,
    },
    bookListHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      marginBottom: 8,
    },
    text: { 
      fontSize: 18, 
      color: theme.text 
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: { 
      color: "#fff", 
      fontSize: 16, 
      fontWeight: "600" 
    },
    toggleButton: {
      backgroundColor: theme.toggleBg,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    toggleButtonActive: { 
      backgroundColor: theme.toggleActive, 
      borderColor: theme.toggleActive 
    },
    toggleButtonText: { 
      fontSize: 14, 
      color: theme.subtext, 
      fontWeight: "500" 
    },
    toggleButtonTextActive: { 
      color: "#fff" 
    },
    bookRow: {
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 6,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: { 
      borderColor: "#4caf50", 
      backgroundColor: "#eaf7ec" 
    },
    checkboxMark: { 
      fontSize: 16, 
      color: "#4caf50", 
      fontWeight: "700" 
    },
    bookTitle: { 
      fontSize: 16, 
      color: theme.text 
    },
    bookRating: { 
      fontSize: 16, 
      color: theme.subtext 
    },
    doneText: { 
      textDecorationLine: "line-through", 
      color: "#999" 
    },
    bookListCard: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 10,
      alignItems: "flex-start",
      gap: 12,
      alignSelf: "stretch",
      flex: 1,
    },
    themeBadge: { 
      alignSelf: "flex-start", 
      paddingHorizontal: 10, 
      paddingVertical: 6, 
      borderRadius: 999, 
      backgroundColor: theme.card 
    },
    themeBadgeText: { 
      color: theme.subtext, 
      fontSize: 12, 
      fontWeight: "600" 
    },
    apiButton: {
      backgroundColor: theme.card,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: "center",
      alignSelf: "stretch",
    },
    apiButtonText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "600",
    },
    errorText: {
      color: "#ff4d4f",
      fontSize: 14,
    },
    
  });
