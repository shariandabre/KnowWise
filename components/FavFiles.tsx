import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { List, MD3Colors, TouchableRipple } from 'react-native-paper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const FavFiles = () => {

  const [files, setFiles] = useState<string[]>([]);
  const [folder, setFolder] = useState<string>('');
  const [presentfile, setPresentFile] = useState<boolean>(false);
  const dir = FileSystem.documentDirectory + 'base_dir/';



  const getFav = async () => {
    try {
      const value = await AsyncStorage.getItem('Fav');
      if (value !== null) {

        getFiles(value)
        setFolder(value)
      }
    } catch (e) {
      console.log(e)
    }
  };

  const getFiles = async (folder: string) => {
    try {
      const result = await FileSystem.readDirectoryAsync(dir + folder + '/');
      setFiles(result);
      setPresentFile(true)
    } catch (error) {
      clearAsyncStorage()
      setPresentFile(false)
      console.error('Error getting files:', error);
    }
  }

  const readFile = async (folder: string, file: string) => {
    try { // Replace with the actual directory path
      const data = await FileSystem.readAsStringAsync(dir + folder + "/" + file);
      const mermaidSeparator = "|||";
      const mermaidIndex = data.indexOf(mermaidSeparator);

      if (mermaidIndex !== -1) {
        const mermaidCode = data.substring(mermaidIndex + mermaidSeparator.length, data.indexOf(mermaidSeparator, mermaidIndex + 1)).trim();
        const restOfInformation = data.substring(data.indexOf(mermaidSeparator, mermaidIndex + 1) + mermaidSeparator.length).trim();

        router.push({ pathname: "/mermaidComponent", params: { mermaidCode, restOfInformation, file, folder } })
      }



    } catch (error) {
      console.error('Error getting file:', error);
      throw error; // Re-throw the error to propagate it
    }
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  useFocusEffect(React.useCallback(() => {
    getFav()
  }, []))

  return (
    <View className='flex-1 w-full h-full ' >
      { presentfile && <List.Section className='p-2' >
      
        <List.Subheader style={{fontFamily:"Inter"}} className='font-bold text-[20px] text-slate-400'>Quick Access</List.Subheader>
        <FlatList
          data={files}
          keyExtractor={(file, idx) => idx.toString()}
          renderItem={({ item: file }) => (
            <TouchableRipple>
              <List.Item className='mb-2 shadow-lg shadow-slate-950 bg-slate-900/70 rounded-lg' onPress={() => readFile(folder, file)} title={file.slice(0, file.length - 3)} left={props => <AntDesign {...props} size={20} name="file1" />} right={props => <List.Icon {...props} icon="chevron-right" />} />
            </TouchableRipple>
          )}
        />

      </List.Section>}</View>
  )
}

export default FavFiles