import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { Pressable, useColorScheme } from "react-native";
import "../global.css";
import Colors from "../constants/Colors";
import { PaperProvider, MD2Colors, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import color from 'react-native-paper/node_modules/color'
import { MD3Colors, tokens } from 'react-native-paper/src/styles/themes/v3/tokens';
export {
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

 //SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Inter': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { palette, opacity } = tokens.md.ref;
  const colorScheme = useColorScheme();

  const themeDark = {
    ...MD3LightTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
      primary: "#8F43EE",
      primaryContainer: palette.primary30,
      secondary: palette.secondary80,
      secondaryContainer: palette.secondary30,
      tertiary: palette.tertiary80,
      tertiaryContainer: palette.tertiary30,
      surface: palette.neutral10,
      surfaceVariant: palette.neutralVariant30,
      surfaceDisabled: color(palette.neutral90)
        .alpha(opacity.level2)
        .rgb()
        .string(),
      background: palette.neutral10,
      error: palette.error80,
      errorContainer: palette.error30,
      onPrimary: "#fff",
      onPrimaryContainer: palette.primary90,
      onSecondary: palette.secondary20,
      onSecondaryContainer: palette.secondary90,
      onTertiary: palette.tertiary20,
      onTertiaryContainer: palette.tertiary90,
      onSurface: palette.neutral90,
      onSurfaceVariant: palette.neutralVariant80,
      onSurfaceDisabled: color(palette.neutral90)
        .alpha(opacity.level4)
        .rgb()
        .string(),
      onError: palette.error20,
      onErrorContainer: palette.error80,
      onBackground: palette.neutral90,
      outline: palette.neutralVariant60,
      outlineVariant: palette.neutralVariant30,
      inverseSurface: palette.neutral90,
      inverseOnSurface: palette.neutral20,
      inversePrimary: palette.primary40,
      shadow: palette.neutral0,
      scrim: palette.neutral0,
      backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
      elevation: {
        level0: 'transparent',
        // Note: Color values with transparency cause RN to transfer shadows to children nodes
        // instead of View component in Surface. Providing solid background fixes the issue.
        // Opaque color values generated with `palette.primary80` used as background
        level1: 'rgb(37, 35, 42)', // palette.primary80, alpha 0.05
        level2: 'rgb(44, 40, 49)', // palette.primary80, alpha 0.08
        level3: 'rgb(49, 44, 56)', // palette.primary80, alpha 0.11
        level4: 'rgb(51, 46, 58)', // palette.primary80, alpha 0.12
        level5: 'rgb(52, 49, 63)', // palette.primary80, alpha 0.14
      },
    },
  }

  const themeLight = {
    dark: false,
    // roundness: 4,
    colors: {
      primary: "#8F43EE",
      primaryContainer: palette.primary90,
      secondary: palette.secondary40,
      secondaryContainer: palette.secondary90,
      tertiary: palette.tertiary40,
      tertiaryContainer: palette.tertiary90,
      surface: palette.neutral99,
      surfaceVariant: palette.neutralVariant90,
      surfaceDisabled: color(palette.neutral10)
        .alpha(opacity.level2)
        .rgb()
        .string(),
      background: palette.neutral99,
      error: palette.error40,
      errorContainer: palette.error90,
      onPrimary: palette.primary100,
      onPrimaryContainer: palette.primary10,
      onSecondary: palette.secondary100,
      onSecondaryContainer: palette.secondary10,
      onTertiary: palette.tertiary100,
      onTertiaryContainer: palette.tertiary10,
      onSurface: palette.neutral10,
      onSurfaceVariant: palette.neutralVariant30,
      onSurfaceDisabled: color(palette.neutral10)
        .alpha(opacity.level4)
        .rgb()
        .string(),
      onError: palette.error100,
      onErrorContainer: palette.error10,
      onBackground: palette.neutral10,
      outline: palette.neutralVariant50,
      outlineVariant: palette.neutralVariant80,
      inverseSurface: palette.neutral20,
      inverseOnSurface: palette.neutral95,
      inversePrimary: palette.primary80,
      shadow: palette.neutral0,
      scrim: palette.neutral0,
      backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
      elevation: {
        level0: 'transparent',
        // Note: Color values with transparency cause RN to transfer shadows to children nodes
        // instead of View component in Surface. Providing solid background fixes the issue.
        // Opaque color values generated with `palette.primary99` used as background
        level1: 'rgb(247, 243, 249)', // palette.primary40, alpha 0.05
        level2: 'rgb(243, 237, 246)', // palette.primary40, alpha 0.08
        level3: 'rgb(238, 232, 244)', // palette.primary40, alpha 0.11
        level4: 'rgb(236, 230, 243)', // palette.primary40, alpha 0.12
        level5: 'rgb(233, 227, 241)', // palette.primary40, alpha 0.14
      },
    }
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider
        theme={colorScheme === "dark" ? themeDark : themeLight}
      >
        <Stack
          screenOptions={{
            statusBarColor: Colors[colorScheme ?? "light"].background,
            statusBarHidden: false,
            statusBarStyle: colorScheme === "dark" ? "light" : "dark",
            headerShown: false
          }}
        >
          <Stack.Screen
            name="(tabs)"
          />
          <Stack.Screen
            name="(mode)/textToflowchart"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible: false, title: "Flowchart", headerTitleAlign: "center", headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
          <Stack.Screen
            name="(mode)/textToexplain"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible: false, title: "Explain", headerTitleAlign: "center", headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
                    <Stack.Screen
            name="(mode)/vidTotext"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible: false, title: "Transcript", headerTitleAlign: "center", headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
          <Stack.Screen
            name="(mode)/quiz"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible: false, title: "Quiz", headerTitleAlign: "center", headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
          <Stack.Screen
            name="settings"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible: false }}
          />
          <Stack.Screen
            name="(markdown)/markdownInput"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, title: "Editor", headerTitleAlign: "center",  headerShadowVisible:false,headerBackVisible: false, headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
          <Stack.Screen
            name="(markdown)/mermaidComponent"
            options={{ presentation: "containedTransparentModal", headerShown: true, headerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background }, headerShadowVisible:false, title: "Preview", headerTitleAlign: "center", headerTitleStyle: { color: "rgb(148 ,163 ,184)" } }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
