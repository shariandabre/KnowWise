import { View, Text, Image, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

type ImagePicker_Props={
  onSubmit:(base64:string)=>any;
}


const ImagePick:React.FC<ImagePicker_Props> = ({onSubmit}) => {
    const [img, setImage] = useState(null);
    const [text, setText] = useState('Please add an image');
  
    const pickImage = async () => {
          let result:ImagePicker.ImagePickerResult= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true, 
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.uri);
            setText("Loading.."); //set value of text Hook
            const responseData = await onSubmit(result.base64);
            setText(responseData.text);
          }
        };


    
      return (
        <ScrollView>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {img && (
            <Image
              source={{ uri: img}}
              style={{ width: 200, height: 200, resizeMode:"contain" }}
            />
          )}
           <Text>{text}</Text>
        </ScrollView>
      );
}

export default ImagePick