import { View, useColorScheme, FlatList, Pressable,TextInput } from 'react-native';
import React, { useState } from 'react';
import {
    Button,
    Text,
    ActivityIndicator,
} from 'react-native-paper';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import FlowChart_popup from '@/components/FlowChart_popup';

const ChatInterface = () => {
    const colorScheme = useColorScheme();
    const [userInput, setUserInput] = useState('');
    const [geminiResponses, setGeminiResponses] = useState([]);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false); // Renamed for clarity

    const MODEL_NAME = 'gemini-1.0-pro';
    const API_KEY = 'AIzaSyB6AZtoo1-ucnFherIKQ7355O17kBYw9OQ'; // Placeholder, replace with your actual API key

    const fetchResponse = async () => {
        try {
            setIsLoading(true); // Set loading state before API call
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 0.05,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };

            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];

            const parts = [{ text: `your goal is to explain me the following topic. you can't answer anything else. your reponse must only be the explaination for the following topic. your response must be the markdown version of the explaination. Topic: ${userInput}` }];

            const result = await model.generateContent({
                contents: [{ role: 'user', parts }],
                generationConfig,
                safetySettings,
            });

            const response = result.response.candidates[0].content.parts[0].text;
            setGeminiResponses((prevResponses) => [...prevResponses, response]);
            setIsLoading(false); // Clear loading state after response
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false); // Clear loading state on error
        }
    };

    const renderMessage = (item) => (
        <View
            key={item.index}
            className='m-2 p-4'
            style={{
                backgroundColor: item.item.role === 'user' ? 'rgb(15,23,42 )' : 'rgb(15,23,42 )',
                borderRadius: 8,
                marginTop: 8,
            }}
        >
            <Text className='text-white' >{item.item.text}</Text>
            <FlowChart_popup fetchSummary={null} Text_Flowchart={item.item.text} flowchart_code={""} mode={"explain"} open={open} setOpen={setOpen} />
            <View className='w-full pt-3 flex items-end' ><Pressable onPress={()=>setOpen(true)}><Ionicons name="options-outline"
                size={24}
                color={Colors["light"].tabIconSelected}
                style={{ marginRight: 15 }}
            /></Pressable></View>
        </View>
    );

    return (
        <View className='bg-slate-950 flex-1 p-2'>
                 

                 <View id='blur' className=' w-full p-2  gap-2 flex flex-row items-center justify-center'>
            <TextInput
                numberOfLines={1}
                className='flex-1  rounded-lg bg-slate-900/70 text-slate-300 p-2 placeholder:text-slate-400' placeholderTextColor="rgb(148, 163 ,184)"
                value={userInput}
                onChangeText={(text) => setUserInput(text)}
                placeholder='Enter a topic'
                textAlignVertical='top'
                style={{ borderRadius: 12 }}
            />
            <Button mode='contained' icon="chevron-right"
      className='dark:text-white shadow-lg shadow-slate-950 bg-slate-900/100 rounded-lg p-0 m-0' disabled={isLoading} onPress={fetchResponse}>
                {isLoading ? 'Sending...' : 'Send'}
            </Button>
            </View>
            {isLoading && <ActivityIndicator animating={true} />}
            <FlatList
                data={geminiResponses.map((text) => ({ text, role: 'gemini' }))} // Add role for styling
                renderItem={renderMessage}
                keyExtractor={(item) => item.text}
            />
        </View>
    );
};

export default ChatInterface;
