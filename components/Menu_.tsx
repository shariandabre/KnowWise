import { View, Platform, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

const Menu_ = ({visible,setVisible,folder,deleteFolder}:{visible:boolean,setVisible: React.Dispatch<React.SetStateAction<boolean>>,folder:string,deleteFolder: (folder: string) => Promise<void>}) => {
  const colorScheme = useColorScheme();
  

  const storeFav = async (value:string) => {
    try {
      await AsyncStorage.setItem('Fav', value);
    } catch (e) {
      console.log(e)
    }
  };

  const createQuiz = async(folder:string)=>{
    

    router.push({pathname:"/quiz",params:{folder}})
  }

  const hideMenu = () => setVisible(false);



  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        className="dark:bg-[#252525]"
        visible={visible}
        onRequestClose={hideMenu}
      >
                <MenuItem textStyle={{color:colorScheme==="dark"?"#fff":"#000"}} onPress={()=>{storeFav(folder),hideMenu()}}>Quick access</MenuItem>
        <MenuItem textStyle={{color:colorScheme==="dark"?"#fff":"#000"}} onPress={()=>{createQuiz(folder),hideMenu()}}>Quiz</MenuItem>
        <MenuItem textStyle={{color:colorScheme==="dark"?"#fff":"#000"}}  onPress={()=>{deleteFolder(folder),hideMenu()}}>Delete</MenuItem>
      </Menu>
    </View>
  );
}

export default Menu_