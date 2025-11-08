import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import { ThemeProvider, useTheme } from "@/context/themeContext";


function ThemedTabs() {
const { theme } = useTheme();
const [fonts] = useFonts({ FredokaOne_400Regular });


return (
  <Tabs
    screenOptions={{
    headerStyle: { backgroundColor: theme.headerBg },
    headerTintColor: theme.headerTint,
    headerTitle: "📚 Popcorn & Pages 🍿",
    headerTitleStyle: { fontFamily: "FredokaOne_400Regular", fontSize: 20 },
    tabBarActiveTintColor: theme.primary,
    tabBarStyle: { backgroundColor: theme.tabBarBg },
    }}
  >
  <Tabs.Screen
    name="index"
    options={{
    title: "BOOKS",
    tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
    }}
  />
  <Tabs.Screen
    name="movies"
    options={{
    title: "MOVIES",
    tabBarIcon: ({ color, size }) => <Ionicons name="film" color={color} size={size} />,
    }}
  />
  </Tabs>
  );
}


export default function RootLayout() {
  return (
    <ThemeProvider>
    <ThemedTabs />
    </ThemeProvider>
  );
}