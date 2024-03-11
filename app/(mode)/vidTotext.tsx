import { View, useColorScheme, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
    TextInput,
    Button,
    Text,
    ActivityIndicator,
} from 'react-native-paper';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import FlowChart_popup from '@/components/FlowChart_popup';

const VidToText = () => {
    const colorScheme = useColorScheme();
    const [userInput, setUserInput] = useState('');
    const [geminiResponses, setGeminiResponses] = useState([]);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false); // Renamed for clarity

    const MODEL_NAME = 'gemini-1.0-pro';
    const API_KEY = ''; // Placeholder, replace with your actual API key

    const fetchResponse = async () => {
        try {
            setIsLoading(true); // Set loading state before API call
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 0.0,
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

            const parts = [{ text: `your goal is to provide explaination in bullet point format for the given youtube link. your response must be in markdown format.I want you to filter all the unneccesary stuff in the video and only provide knowledgeable information.  link: ${userInput}` }];

            const result = await model.generateContent({
                contents: [{ role: 'user', parts }],
                generationConfig,
                safetySettings,
            });

            const response = result.response.candidates[0].content.parts[0].text;
            console.log(response)
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
            style={{
                padding: 16,
                backgroundColor: item.item.role === 'user' ? '#222' : '#222',
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
        <View style={{ flex: 1, padding: 24, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <TextInput
                mode='outlined'
                numberOfLines={1}
                className=''

                value={userInput}
                onChangeText={(text) => setUserInput(text)}
                placeholder='Enter a topic'
                textAlignVertical='top'
                style={{ borderRadius: 12, marginBottom: 16 }}
            />
            <Button mode='contained' disabled={isLoading} onPress={fetchResponse}>
                {isLoading ? 'Sending...' : 'Send'}
            </Button>
            {isLoading && <ActivityIndicator animating={true} style={{ marginTop: 16 }} />}
            <FlatList
                data={geminiResponses.map((text) => ({ text, role: 'gemini' }))} // Add role for styling
                renderItem={renderMessage}
                keyExtractor={(item) => item.text}
            />
        </View>
    );
};

export default VidToText;
