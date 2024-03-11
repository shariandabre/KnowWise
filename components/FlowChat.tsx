import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';


const Flowchart = ({ flowchart_code }: { flowchart_code: ReactNode }) => {
  const ColorScheme = useColorScheme();

  const mermaidCode = `
  %%{
    init: {
      'theme': '${ColorScheme === "dark" ? "dark" : "default"}'  
    }
  }%%

  ${flowchart_code}
  
  linkStyle default stroke:#8F43EE

  `;

  const [webViewHeight, setWebViewHeight] = useState(300);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:"rgba(0,0,0,0)",
      width:"100%",
      borderRadius:8,
      height:webViewHeight*2.7,
    },
  });
  
  // Default height or any suitable value
  const webViewRef = useRef(null);

  const calculateWebViewHeight = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        const mermaidDiv = document.querySelector('.mermaid');
        if (mermaidDiv) {
          const height = mermaidDiv.getBoundingClientRect().height;
          height;
        } else {
          0;
        }
      `);
    }
  };

  useEffect(() => {
    calculateWebViewHeight();
  }, []);

  const onMessage = (event) => {
    if (event && event.nativeEvent && event.nativeEvent.data) {
      const height = parseInt(event.nativeEvent.data, 10);
      if (!isNaN(height)) {
        setWebViewHeight(height);
      }
    }
  };

  return (
<View style={[styles.container]}>
  <WebView
    style={[
      styles.container,
      // { backgroundColor: ColorScheme === "dark" ? "#000" : "#fff" },
    ]}
    javaScriptEnabled
    onMessage={onMessage}
    ref={webViewRef}
    source={{
      html: `
        <html>
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <style>
          .mermaid {    
            padding:5px;  
            min-height: 0%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          </style>
          <body style=" display: flex; justify-content: center; align-items: start;">
              <div style="width: 100%; height: auto;" class="mermaid">
                ${mermaidCode}
              </div>
            <script type="module">
              import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
              mermaid.initialize({ startOnLoad: true });
            </script>
            <script>
            setTimeout(function() {
              const mermaidDiv = document.querySelector('.mermaid');
              if (mermaidDiv) {
                const height = mermaidDiv.getBoundingClientRect().height;
                window.ReactNativeWebView.postMessage(height);
              }
            }, 100);
          </script>
          </body>
        </html>
      `,
    }}
  />
</View>
  );
};



export default Flowchart;