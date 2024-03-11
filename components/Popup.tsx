import { View, useColorScheme,TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';


const Popup = ({ hideModal,open_popup, setOpen_popup, Foldername, setFoldername, Filename, setFilename, makeDir, createFile }: {hideModal:any, open_popup: any, setOpen_popup: any, Foldername: any, setFoldername: any, Filename: any, setFilename: any, makeDir: any, createFile: any }) => {
 
    const ColorScheme = useColorScheme();
    const showDialog = () => setOpen_popup(true);

    const hideDialog = () => setOpen_popup(false);

    return (

        <Portal>
          <Dialog  visible={open_popup} onDismiss={hideDialog} style={{borderRadius:8,backgroundColor:"rgb(15,23,42 )"}}>
            <Dialog.Title>Save</Dialog.Title>
            <Dialog.Content className='flex gap-2'>
             <View className='flex flex-row w-full items-center justify-between'>
                <Text>Folder:</Text>
            <TextInput  placeholder='Folder name'  onChangeText={setFoldername} className=' flex-1 rounded-lg bg-slate-800/70 text-slate-300 p-2 placeholder:text-slate-400' placeholderTextColor="rgb(148, 163 ,184)" id="top-popover" />
            </View> 
            <View className='flex flex-row w-full items-center justify-between'>
                <Text>Files  :</Text>
            <TextInput  numberOfLines={1} placeholder='File name  '  onChangeText={setFilename} className='flex-1 rounded-lg bg-slate-800/70 text-slate-300 p-2 placeholder:text-slate-400' placeholderTextColor="rgb(148, 163 ,184)" id="FileName" />
            </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>{hideDialog();makeDir();createFile(),hideModal()}}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    
        )
}

export default Popup