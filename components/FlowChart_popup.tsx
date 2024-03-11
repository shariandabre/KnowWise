import { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import Flowchart from './FlowChat'
import * as FileSystem from 'expo-file-system';
import Popup from './Popup'
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const FlowChart_popup = ({ open, setOpen, flowchart_code, fetchSummary, Text_Flowchart,mode }: { open: any, setOpen: any, flowchart_code: string, fetchSummary: () => Promise<void>|null, Text_Flowchart: string ,mode:string}) => {


    const ColorScheme = useColorScheme();
    const [open_popup, setOpen_popup] = useState(false)
    const [Foldername, setFoldername] = useState("")
    const [Filename, setFilename] = useState("")


    const dir = FileSystem.documentDirectory + 'base_dir/';

    const makeDir = async () => {
        try {
            if (!(await FileSystem.getInfoAsync(dir + Foldername)).exists) {
                await FileSystem.makeDirectoryAsync(dir + Foldername, { intermediates: true });
                console.log("Directory created successfully");
            }
            else {
                console.log("Directory exists");
            }
        } catch (error) {
            console.error("Error creating directory:", error);
        }
    }
    const createFile = async () => {

        try {
            if (!(await FileSystem.getInfoAsync(dir + Foldername + "/" + Filename+".md")).exists) {
                 await FileSystem.writeAsStringAsync(dir + Foldername + "/" + Filename+".md",((mode==="flowchart"?("|||"+"\n"+flowchart_code+"\n"+"|||"+"\n"+Text_Flowchart):(Text_Flowchart))));
                 const data = await FileSystem.readAsStringAsync(dir + Foldername + "/" + Filename+".md");
                 console.log(data)
                console.log("File created successfully")
            }
            else {
                console.log("file exists")
            }
        } catch (error) {
            console.error('Error creating File:', error);
        }
    }


    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);


    return (
        <>
                <Portal>
                    <Modal visible={open} onDismiss={hideModal} style={{alignItems:"center",backgroundColor:ColorScheme==="dark"?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)"}} contentContainerStyle={{ backgroundColor:ColorScheme==="dark"?"rgb(2,6, 23)":"rgb(2,6, 23)",height:"auto",width:"95%",borderRadius:8,paddingTop:5, display:"flex",justifyContent:'center',alignItems:"center",borderWidth:mode==="flowchart"?1:0,borderColor:ColorScheme==="dark"?"rgba(103, 80, 164, 1)":"rgba(208, 188, 255, 1)" }} >
                        {/* <Text variant='titleLarge'>Flowchart</Text> */}
                        {mode==="flowchart" &&<Flowchart flowchart_code={flowchart_code} />}
                        <View className={`flex flex-row items-center justify-evenly ${mode==="flowchart"?"border-t w-full":"border rounded-lg w-4/6"} dark:border-[#6750a4]  py-2 mx-2 `}>
                            <TouchableOpacity onPress={fetchSummary} ><Ionicons name="refresh-outline" size={28} color={ColorScheme==="dark"?"#fff":"#000"} /></TouchableOpacity>
                            <TouchableOpacity onPress={()=>setOpen_popup(true)} ><Ionicons name="bookmark-outline" size={28} color={ColorScheme==="dark"?"#fff":"#000"} /></TouchableOpacity>
                        </View>
                        <Popup hideModal={hideModal} open_popup={open_popup} setOpen_popup={setOpen_popup} Foldername={Foldername} setFoldername={setFoldername} Filename={Filename} setFilename={setFilename} makeDir={makeDir} createFile={createFile}/>
                    </Modal>
                </Portal>

        </>
    )
}

export default FlowChart_popup