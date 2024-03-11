import { View, Text, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Stack, useLocalSearchParams, router, useFocusEffect } from 'expo-router'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { TextInput } from 'react-native'
import { Button, Snackbar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

const markdownInput = () => {

  const { mermaidCode, marked, file, folder } = useLocalSearchParams<{ mermaidCode: string, marked: string, file: any, folder: any }>();

  const [TextArea_Text, setTextArea_Text] = useState(marked)
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

    const textInputRef = useRef(null);

    useFocusEffect(React.useCallback(() => {
      // Focus the TextInput and set the selection to the start
      textInputRef.current.focus();
      textInputRef.current.setNativeProps({ selection: { start: 0, end: 0 } });
    }, []));


  const dir = FileSystem.documentDirectory + 'base_dir/';

  const saveFile = async () => {
    try {
      const result = await FileSystem.writeAsStringAsync(dir + folder + "/" + file, ("|||" + "\n" + mermaidCode + "\n" + "|||" + "\n" + marked));
      router.back()
    } catch (error) {
      console.error('Error creating File:', error);
    }
  }

  const colorScheme = useColorScheme()
  return (
    <View className='w-full h-full dark:bg-[#000]' >
      <Stack.Screen options={{
        headerRight: () => (
          <Pressable onPress={() => {saveFile()}} >
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="book-open"
                size={24}
                color={Colors["light"].tabIconSelected}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        ),
      }} />
      <TextInput
        ref={textInputRef}
        numberOfLines={30}
        style={{ backgroundColor: colorScheme === "dark" ? `rgb(2 ,6, 23 )` : `rgb(2 ,6, 23 )`, textAlignVertical: 'top', padding: 15, fontSize: 16 }}
        multiline={true}
        value={TextArea_Text}
        onChangeText={(text) => { setTextArea_Text(text); router.setParams({ marked: text }); }}
        className='h-full w-full dark:text-white' />
              <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Done',
          onPress: () => {
            // Do something
          },
        }}>
        File Saved 👍
      </Snackbar>
    </View>
  )
}

export default markdownInput