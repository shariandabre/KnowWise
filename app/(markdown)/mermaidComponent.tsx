import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import { Link, Stack, useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import * as FileSystem from 'expo-file-system';

const mermaidComponent = () => {
  const ColorScheme = useColorScheme();
  const { file, folder } = useLocalSearchParams<{ marked: string, file: any, folder: any }>();
  const [mermaidCode, setMermaidCode] = useState(null)
  const [markdowntext, setMarkdownText] = useState(null)

  const dir = FileSystem.documentDirectory + 'base_dir/';


  async function fetchdata() {
    try { // Replace with the actual directory path
      const data = await FileSystem.readAsStringAsync(dir + folder + "/" + file);

      const mermaidSeparator = "|||";
      const mermaidIndex = data.indexOf(mermaidSeparator);

      if (mermaidIndex !== -1) {
        const mermaidCode = data.substring(mermaidIndex + mermaidSeparator.length, data.indexOf(mermaidSeparator, mermaidIndex + 1)).trim();
        setMermaidCode(mermaidCode)
        const restOfInformation = data.substring(data.indexOf(mermaidSeparator, mermaidIndex + 1) + mermaidSeparator.length).trim();
        setMarkdownText(restOfInformation)
      } else {
        setMermaidCode(null)

        setMarkdownText(data)
      }
    } catch (error) {
      console.error('Error getting file:', error);
      throw error; // Re-throw the error to propagate it
    }
  }

  useFocusEffect(React.useCallback(() => {
    fetchdata()
  }, []))



  const mermaid = `
    %%{
      init: {
        'theme': '${ColorScheme === "dark" ? "dark" : "default"}'  
      }
    }%%
   
    ${mermaidCode}

  linkStyle default stroke:#8F43EE
`


  const htmlContent = `
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marked in the browser</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
  html{
    background-color:"rgb(2 ,6, 23 )";
  }
  * {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  line-height:1.5;
}
h1{
  line-height:1.3;
}
h2{
  line-height:1.3;
}
ul{
  display:flex;
  flex-direction:column;
  gap:5px;
}

strong{
  font-size:18px;
}

li{
  font-size:15px;
}
p{
  font-size:15px;
}

    body {
      background-color:"rgb(2 ,6, 23 )";
      color:${ColorScheme === "dark" ? "#fff" : "#fff"};
      overflow: scroll;
    }

    .mermaid {    
      padding:5px;  
      border: 1px solid ${ColorScheme === "dark" ? "#444" : "#999"};
      min-height: 30%;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    em {
        background-color: ${ColorScheme !== "dark" ? `hsla(274, 97.9%, 44.3%, 0.095)` : `hsla(279, 99.1%, 64.0%, 0.191)`};
        padding:0px 4px 0px 4px;
        border: 1px solid ${ColorScheme !== "dark" ? `hsla(275, 100%, 39.2%, 0.200)` : `hsla(276, 99.6%, 64.6%, 0.328)`};
        color: ${ColorScheme !== "dark" ? `hsla(272, 99.8%, 29.7%, 0.773)` : `hsla(275, 99.9%, 75.3%, 0.934)`};
        border-radius: 7px;
        font-style: normal;
    }

  </style>
</head>
<body>
  <div class=${mermaidCode !== null && "mermaid"}>${mermaidCode !== null ? mermaid : ''}</div>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML =
      marked.parse(\`${markdowntext}\`);
  </script>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
</body>
</html>
`;
  return (
    <View style={styles.container}>

      <Stack.Screen options={{
        headerRight: () => (
          <Pressable onPress={() => router.push({ pathname: "/markdownInput", params: { mermaidCode, marked:markdowntext, file, folder } })} >
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="book-edit-outline"
                size={24}
                color={Colors["light"].tabIconSelected}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />

            )}
          </Pressable>
        ),
      }} />
      <WebView
        source={{ html: htmlContent }}
        style={[styles.webview, { backgroundColor: ColorScheme === "dark" ? "rgb(2 ,6, 23 )" : "rgb(2 ,6, 23 )" }]}
        javaScriptEnabled />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default mermaidComponent;