import { View, Text } from 'react-native'
import React from 'react'
import * as FileSystem from 'expo-file-system';
import { Button } from 'tamagui';

const FilesDir = () => {
  const dir = FileSystem.documentDirectory + 'base_dir/';
  const getdir = FileSystem.documentDirectory + 'base_dir/';

  const makeDir = async () => {
    try {
      if(!(await FileSystem.getInfoAsync(dir)).exists){
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      console.log("Directory created successfully");}
      else{
        console.log("Directory exists");
      }
    } catch (error) {
      console.error("Error creating directory:", error);
    }
  }

  const getDir=async()=>{
    try {
      const result = await FileSystem.readDirectoryAsync(dir);
      console.log(result);
    } catch (error) {
      console.error('Error getting directory:', error);
    }
  }

  const delDir=async()=>{
    try {
      const result = await FileSystem.deleteAsync(getdir+"undefined/")
      console.log(result);
    } catch (error) {
      console.error('Error deleting directory:', error);
    }
  }

  const createFile=async()=>{
    try {
      const result = await FileSystem.writeAsStringAsync(dir+"Test/"+"demo.txt","demo");
      console.log(result);
    } catch (error) {
      console.error('Error creating File:', error);
    }
  }

    const delFile=async()=>{
    try {
      const result = await FileSystem.deleteAsync(dir+"demo.txt");
      console.log(result);
    } catch (error) {
      console.error('Error deleting File:', error);
    }
  }
  const getFile=async()=>{
    try {
      const result = await FileSystem.readDirectoryAsync(getdir+"Test/");
      console.log(result);
    } catch (error) {
      console.error('Error getting file:', error);
    }
  }
  const readFile=async()=>{
    console.log("reading...")
    try { // Replace with the actual directory path
      const data = await FileSystem.readAsStringAsync(getdir + "Test/Test.md");
      // const base64 = 'data:text/plain;base64,' + data;
      console.log(data);
    } catch (error) {
      console.error('Error getting file:', error);
      throw error; // Re-throw the error to propagate it
    }
}
  return (
    <View className='flex gap-5 flex-col'>
      <Button theme="purple" onPress={makeDir} >create dir</Button>
      <Button theme="blue" onPress={getDir} >get dir</Button>
      <Button theme="red" onPress={delDir} >delete dir</Button>
      <Button theme="green" onPress={createFile} >create file</Button>
      <Button theme="green" onPress={getFile} >getting file</Button>
      <Button theme="red" onPress={delFile} >deleting file</Button>
      <Button theme="pink" onPress={readFile} >reading file</Button>
    </View>
  )
}

export default FilesDir