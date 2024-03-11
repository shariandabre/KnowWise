import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, LayoutAnimation, Alert, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';// Import LayoutAnimation
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import Menu_ from '../../components/Menu_';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab2 = () => {


  const navigation = useNavigation()
  const emp = ""
  const colorScheme = useColorScheme();

  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [fileData, setFileData] = useState("")
  const [menuVisibility, setMenuVisibility] = useState<{ [folder: string]: boolean }>({});

  const showMenu = (folder: string) => {
    setMenuVisibility(prevVisibility => ({
      ...prevVisibility,
      [folder]: true,
    }));
  };

  const dir = FileSystem.documentDirectory + 'base_dir/';

  const getFolders = useCallback(async () => {
    try {
      const result = await FileSystem.readDirectoryAsync(dir);
      setFolders(result);
    } catch (error) {
      console.error('Error getting folders:', error);
    }
  }, [dir]);

  const getFiles = useCallback(
    async (file: string) => {
      try {
        const result = await FileSystem.readDirectoryAsync(dir + file + '/');
        setFiles(result);

        // Apply LayoutAnimation for a slide-down effect
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      } catch (error) {
        console.error('Error getting files:', error);
      }
    },
    [dir]
  );

  const deleteFolder = async (folder: string) => {
    try {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete the folder "${folder}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const result = await FileSystem.deleteAsync(dir + folder);
                getFolders();
              } catch (error) {
                console.error('Error deleting directory:', error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error displaying alert:', error);
    }
  };

  const deleteFile = async (folder: string, file: string) => {
    try {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete the file "${folder + "/" + file}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const result = await FileSystem.deleteAsync(dir + folder + "/" + file);
                getFiles(folder);
              } catch (error) {
                console.error('Error deleting directory:', error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error displaying alert:', error);
    }
  };

  const readFile = async (folder: string, file: string) => {
    try { // Replace with the actual directory path
      const data = await FileSystem.readAsStringAsync(dir + folder + "/" + file);
      setFileData(data)

      const mermaidSeparator = "|||";
      const mermaidIndex = data.indexOf(mermaidSeparator);


      const mermaidCode = data.substring(mermaidIndex + mermaidSeparator.length, data.indexOf(mermaidSeparator, mermaidIndex + 1)).trim();
      const restOfInformation = data.substring(data.indexOf(mermaidSeparator, mermaidIndex + 1) + mermaidSeparator.length).trim();
       router.push({ pathname: "/mermaidComponent", params: { file, folder } })


    } catch (error) {
      console.error('Error getting file:', error);
      throw error; // Re-throw the error to propagate it
    }
  }

  useFocusEffect(React.useCallback(() => {
    getFolders()
  }, []))

  const handleFolderClick = async (folder: string) => {
    if (selectedFolder === folder) {
      setSelectedFolder(null);
      setFiles([]);
    } else {
      setSelectedFolder(folder);
      await getFiles(folder);
    }
  };

  const renderFolderItem = ({ item: folder, index }: { item: string, index: any }) => {
    const isOpen = selectedFolder === folder;
    const isMenuVisible = menuVisibility[folder] || false; // Default to false if not set
    return (
      <>
        <List.Accordion
          expanded={isOpen}
          key={index}
          style={{backgroundColor:"rgb(2 ,6 ,23)"}}
          onLongPress={() => showMenu(folder)}
          onPress={() => handleFolderClick(folder)}
          title={folder}
          right={(props) => (<>
            <List.Icon {...props} icon="chevron-right" />
            <View key={index} className='flex-1 flex justify-center items-center' >
              <Menu_ key={index} visible={isMenuVisible} setVisible={visible => setMenuVisibility(prevVisibility => ({
                ...prevVisibility,
                [folder]: visible,
              }))} folder={folder} deleteFolder={deleteFolder} />
            </View></>
          )}
          left={props => <Ionicons {...props} size={23} name="folder-open-outline" />}
        >

          {isOpen && (
            <>
              <FlatList
                data={files}
                keyExtractor={(file, idx) => idx.toString()}
                renderItem={({ item: file }) => (
                  <TouchableRipple>
                    <List.Item className='mt-2 shadow-lg shadow-slate-950 bg-slate-900/70 rounded-lg' onLongPress={() => deleteFile(folder, file)} onPress={() => readFile(folder, file)} title={file.slice(0, file.length - 3)} left={props => <AntDesign {...props} size={20} name="file1" />} />
                  </TouchableRipple>
                )}
              />
            </>
          )}
        </List.Accordion></>
    );
  };

  const getItemLayout = (_: any, index: any) => ({
    length: 70, // Adjust this value as needed
    offset: 70 * index,
    index,
  });

  return (
    <View className='bg-slate-950 flex-1 p-2' >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} className=' '>
        <FlatList
          className='w-full'
          data={folders}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderFolderItem}
          getItemLayout={getItemLayout}
        />
      </View></View>
  );
};

export default Tab2;
