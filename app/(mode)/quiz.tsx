import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable} from 'react-native';
import { Appbar, Divider,  ActivityIndicator } from 'react-native-paper';
import { Question } from '../../components/Question'; // Import questions data
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Quiz = () => {

    const { folder } = useLocalSearchParams()

    const storeScore = async (folder, score) => {
        try {
            const scores = await AsyncStorage.getItem("score");
            const scoresObject = scores ? JSON.parse(scores) : [];
            console.log(scoresObject)
            scoresObject.push({ [folder]: score }); // Push the score object with test name as key
            await AsyncStorage.setItem("score", JSON.stringify(scoresObject));
          } catch (e) {
            console.log(e);
          }
      };

    const dir = FileSystem.documentDirectory + 'base_dir/';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const [userInput, setUserInput] = useState('');
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const MODEL_NAME = 'gemini-1.0-pro';
    const API_KEY = ''; // Placeholder, replace with your actual API key

    const fetchResponse = async (fetchdata:string) => {
        console.log(fetchdata)
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

            const parts = [{ text: `Generate multiple-choice questions. you must generate total of 10 questions. your reponse format must be ([ { "question": "What is the capital of France", "options": ["London", "Paris", "Berlin", "Madrid"], "answer": 1, "points": 10, }, //add 9 more];  ).your response must not have any error while parsing it through JSON.Parse().the multiple-choice questions must be based on the following information: ${fetchdata}` }];

            const result = await model.generateContent({
                contents: [{ role: 'user', parts }],
                generationConfig,
                safetySettings,
            });

            const response = result.response.candidates[0].content.parts[0].text;
            console.log(response)
            const pasrsed = JSON.parse(response)
            setQuestions(pasrsed)

            setIsLoading(false); // Clear loading state after response
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false); // Clear loading state on error
        }
    };

    useEffect(() => {
        async function fetchData() {
            const files = await FileSystem.readDirectoryAsync(dir + folder);

            // Loop through each file and read its contents
            var fetchdata=''
            for (const fileName of files) {
                const filePath = `${dir + folder}/${fileName}`;
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                const mermaidIndex = fileContent.indexOf("|||");
                let Content
                if (mermaidIndex !== -1) {
                    Content = fileContent.substring(fileContent.indexOf("|||", mermaidIndex + 1) + "|||".length).trim();

                }
                else {
                    Content = fileContent

                }
                fetchdata= fetchdata+ " " + Content;

            }
            fetchResponse(fetchdata)
        }fetchData()
    }, [])


    const handleSelectAnswer = (optionIndex) => {
        if (optionIndex === questions[currentQuestion].answer) {
            setScore(score + questions[currentQuestion].points);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        storeScore(folder,score)
    };

    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
        <View className='h-full w-full  bg-slate-950 flex-1 p-2 '>
            {isLoading ? <View className='flex flex-1 flex-col items-center justify-center gap-3'><ActivityIndicator /><Text className='text-slate-300 text-2xl leading-7 font-bold text-center'>Generating Quiz</Text></View> : <>
                {!submitted && (
                    <View className='flex flex-1 flex-col items-center justify-center'>
                        <View style={{ padding: 10 ,flex:1}} className='w-full flex items-center justify-center'>
                            <Question
                                question={questions[currentQuestion].question}
                                options={questions[currentQuestion].options}
                                onSelect={handleSelectAnswer}
                            />
                        </View>
                        <Divider style={{ marginVertical: 10 }} />
                        <View className='flex flex-1 items-end justify-end w-full'>
                        <Pressable   className={`text-white rounded-lg ${isLastQuestion ?"bg-green-900/80":"bg-slate-900/80"} px-4 py-2`} onPress={() => (isLastQuestion ? handleSubmit() : setCurrentQuestion(currentQuestion + 1))}>
                            <Text className='text-white text-lg'>{isLastQuestion ? 'Submit Quiz' : 'Next Question'}</Text>
                        </Pressable>
                        </View>
                    </View>
                )}
                {submitted && (
                    <View className='flex-1 flex h-full w-full p-4 items-center justify-center'>
                        <Text className='text-slate-300 text-2xl leading-7 font-bold text-center' >You finished the quiz! Your score is: {score}/100</Text>
                    </View>
                )}</>}
        </View>
    );
};

export default Quiz;
