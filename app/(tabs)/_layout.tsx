import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";



function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,

        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopWidth: 1,
          borderBottomColor: Colors[colorScheme ?? "light"].tab,
          borderBottomWidth: 1,
          
        },
    
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShadowVisible: false,

        // headerLeft: () => (
        //   <Link href="/settings" asChild>
        //     <Pressable>
        //       {({ pressed }) => (
        //         <AntDesign
        //           name="menuunfold"
        //           size={24}
        //           color={Colors[colorScheme ?? "light"].text}
        //           style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
        //         />
        //       )}
        //     </Pressable>
        //   </Link>
        // ),
        headerShown: true,
        headerTitleStyle: {
          fontWeight:"900",
          color: Colors[colorScheme ?? "light"].text,
          fontFamily:'Inter'
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "HOME",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Tab2"
        options={{
          headerTitle: "NOTES",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder-open-outline" color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
