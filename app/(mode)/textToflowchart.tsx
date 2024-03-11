import { View, useColorScheme,TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import {Button, PaperProvider, Portal, Dialog, Text, ActivityIndicator } from 'react-native-paper';
import FlowChart_popup from '../../components/FlowChart_popup';
import axios from 'axios';
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai"
import { Ionicons } from '@expo/vector-icons';
const mode_text_to_flowchart = () => {
  const colorScheme = useColorScheme()
  const [Text_Flowchart, setText_Flowchart] = useState('')
  const [Markdown, setMarkdown] = useState('')
  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState(false)
  const [flowchart_code, setFlowchart_code] = useState('')
  const [displayText, setDisplayText] = useState("Analysing data");
  const [visible, setVisible] = React.useState(false);

  const MODEL_NAME = "gemini-1.0-pro"; // Replace with your model name
  const API_KEY = ""; // Replace with your API key



  const showDialog = () => {
    setVisible(true); 
    const timeoutId = setTimeout(() => {
      setDisplayText("Data analysis complete");
      const timeoutId = setTimeout(() => {
        setDisplayText("Generating Flowchart");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }, 8000);
    return () => clearTimeout(timeoutId);
  };

  const hideDialog = () => setVisible(false);

  const fetchSummary = async () => {
    setOpen(false)
    showDialog()
    try {
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

      const parts = [
        {text: "input: Device Administration within An operating system controls every piece of hardware and virtual device on a PC or computer. Input/output devices are assigned to processes by the device management system based on their importance. Depending on the situation, these devices may also be temporarily or permanently reallocated.Usually, systems are hardware or physical devices like computers, laptops, servers, cell phones, etc. Additionally, they might be virtual, like virtual switches or machines. A program may require a variety of computer resources (devices) to go through to the end. It is the operating system’s responsibility to allocate resources wisely. The operating system is alone in charge of determining if the resource is available. It deals not only with device allocation but also with deallocation, which means that a device or resource must be removed from a process once its use is over."},
        {text: "output: |||graph LR\nA[Device Administration] --> B[Controls hardware and virtual devices]\nA --> C[Assigns devices to processes]\nB --> D[Hardware devices]\nB --> E[Virtual devices]\nC --> F[Based on importance]\nC --> G[Temporarily or permanently reallocated]\nD --> H[Computers]\nD --> I[Laptops]\nD --> J[Servers]\nD --> K[Cell phones]\nE --> L[Virtual switches]\nE --> M[Virtual machines]\nF --> N[Operating system allocates resources]\nF --> O[Operating system deallocates resources]|||\n\n**Device Administration in Operating Systems**\n\nDevice administration within an operating system manages and controls all hardware and virtual devices on a computer system.\n\n**Device Allocation**\n\n* The device management system assigns input/output devices to processes based on their priority.\n* Devices can be temporarily or permanently reallocated depending on the situation.\n\n**Types of Devices**\n\n* **Hardware devices:** Physical devices such as computers, laptops, servers, and cell phones.\n* **Virtual devices:** Virtual switches, virtual machines, etc.\n\n**Resource Allocation**\n\n* Programs require various computer resources (devices) to execute.\n* The operating system is responsible for allocating resources efficiently.\n* The operating system determines device availability and assigns them accordingly.\n\n**Device Deallocation**\n\n* Once a device is no longer needed by a process, it must be deallocated.\n* The operating system handles device deallocation, removing the device from the process.\n\n**Benefits of Device Administration**\n\n* Ensures efficient resource allocation\n* Prevents conflicts between processes\n* Optimizes system performance\n* Provides a centralized control point for device management"},
        {text: "input: Its when you mean to say one thing but instead say something entirely different. It commonly happens when youre talking but can also occur when typing or writing something down — and even in your memory (or lack thereof).According to psychoanalytic thought, you can trace these slip-ups back to unconscious desires and urges, whether those are:things you actually want to say but feel unable to express unrealized feelings that havent yet entered your realm of conscious thought Freudian slips are incredibly common. But do they really always relate to secret impulses and unexpressed desires, or is there a simpler."},
        {text: "output: |||graph LR\n  A[Freudian Slip] --> B[Meaning to say one thing but saying something else]\n  A --> C[Causes of Freudian Slip]\n  B --> D[Can happen when talking, typing, writing, or remembering]\n  C --> E[Unconscious desires and urges]\n  C --> F[Other factors]\n  E --> G[Things you want to say but can't]\n  E --> H[Unrealized feelings that are not conscious]\n  F --> I[Distraction or fatigue]\n  F --> J[Similarity in sound or meaning of words]|||\n \n Its when you *mean to say one thing but instead say something entirely different*. It commonly happens when youre talking but can also occur when typing or writing something down — and even in your memory (or lack thereof).According to psychoanalytic thought, you can trace these *slip-ups* back to unconscious desires and urges, whether those are:things you actually want to say but feel unable to express unrealized feelings that havent yet entered your realm of conscious thought Freudian slips are # incredibly common. But do they really always relate to **secret impulses and unexpressed desires**, or is there a simpler."},
        {text: "input: If the operating system supports multiple users then services under this are very important. In this regard, operating systems have to keep track of all the completed processes, Schedule them, and dispatch them one after another. However, the user should feel that he has full control of the CPU. Process management refers to the techniques and strategies used by organizations to design, monitor, and control their business processes to achieve their goals efficiently and effectively. It involves identifying the steps involved in completing a task, assessing the resources required for each step, and determining the best way to execute the task.Process management can help organizations improve their operational efficiency, reduce costs, increase customer satisfaction, and maintain compliance with regulatory requirements. It involves analyzing the performance of existing processes, identifying bottlenecks, and making changes to optimize the process flow."},
        {text: "output: |||graph LR\nA[Process Management] --> B[Techniques and strategies for business processes]\nA --> C[Goals of process management]\nB --> D[Design, monitor, control business processes]\nB --> E[Identify steps in completing a task]\nB --> F[Assess resources required for each step]\nB --> G[Determine best way to execute the task]\nC --> H[Improve operational efficiency]\nC --> I[Reduce costs]\nC --> J[Increase customer satisfaction]\nC --> K[Maintain compliance with regulatory requirements]\nD --> L[Analyze performance of existing processes]\nD --> M[Identify bottlenecks]\nD --> N[Make changes to optimize process flow]|||\n\n**Process Management**\n\nProcess management refers to the techniques and strategies used by organizations to design, monitor, and control their business processes to achieve their goals efficiently and effectively.\n\n**Goals of Process Management**\n\n* Improve operational efficiency\n* Reduce costs\n* Increase customer satisfaction\n* Maintain compliance with regulatory requirements\n\n**Techniques and Strategies**\n\n* Design, monitor, and control business processes\n* Identify the steps involved in completing a task\n* Assess the resources required for each step\n* Determine the best way to execute the task\n* Analyze the performance of existing processes\n* Identify bottlenecks\n* Make changes to optimize the process flow"},
        {text: "input: Virtual Memory is a storage allocation scheme in which secondary memory can be addressed as though it were part of the main memory. The addresses a program may use to reference memory are distinguished from the addresses the memory system uses to identify physical storage sites and program-generated addresses are translated automatically to the corresponding machine addresses. A memory hierarchy, consisting of a computer system’s memory and a disk, that enables a process to operate with only some portions of its address space in memory. A virtual memory is what its name indicates- it is an illusion of a memory that is larger than the real memory. We refer to the software component of virtual memory as a virtual memory manager. The basis of virtual memory is the noncontiguous memory allocation model. The virtual memory manager removes some components from memory to make room for other components."},
        {text: "output: |||graph LR\nA[Virtual Memory] --> B[Storage allocation scheme]\nA --> C[Secondary memory addressed as main memory]\nA --> D[Program-generated addresses translated to machine addresses]\nA --> E[Memory hierarchy]\nA --> F[Process operates with only portions of address space in memory]\nA --> G[Illusion of a memory larger than real memory]\nA --> H[Software component: virtual memory manager]\nA --> I[Noncontiguous memory allocation model]\nA --> J[Virtual memory manager removes components from memory to make room for others]|||\n\n**Virtual Memory**\n\nVirtual memory is a storage allocation scheme that allows secondary memory to be addressed as if it were part of the main memory.\n\n**Key Features**\n\n* Program-generated addresses are translated automatically to corresponding machine addresses.\n* Memory hierarchy consists of computer system's memory and a disk.\n* Process operates with only portions of its address space in memory.\n* Virtual memory manager removes components from memory to make room for others.\n* Noncontiguous memory allocation model is used."},
        {text: "input: Software Testing can be broadly classified into two types:\n1. Manual Testing: Manual testing includes testing software manually, i.e., without using any automation tool or any script. In this type, the tester takes over the role of an end-user and tests the software to identify any unexpected behavior or bug. There are different stages for manual testing such as unit testing, integration testing, system testing, and user acceptance testing. \n\nTesters use test plans, test cases, or test scenarios to test software to ensure the completeness of testing. Manual testing also includes exploratory testing, as testers explore the software to identify errors in it. \n\n2. Automation Testing: Automation testing, which is also known as Test Automation, is when the tester writes scripts and uses another software to test the product. This process involves the automation of a manual process. Automation Testing is used to re-run the test scenarios quickly and repeatedly, that were performed manually in manual testing.\n\nApart from regression testing, automation testing is also used to test the application from a load, performance, and stress point of view. It increases the test coverage, improves accuracy, and saves time and money when compared to manual testing. \n\nWhat are the different types of Software Testing Techniques ? \n\nSoftware testing techniques can be majorly classified into two categories: \n\n1. Black Box Testing: The technique of testing in which the tester doesn’t have access to the source code of the software and is conducted at the software interface without any concern with the internal logical structure of the software is known as black-box testing. \n\n2. White-Box Testing: The technique of testing in which the tester is aware of the internal workings of the product, has access to its source code, and is conducted by making sure that all internal operations are performed according to the specifications is known as white box testing."},
        {text: "output: |||graph LR\n     A[Software Testing] --> B[Manual Testing]\n     A --> C[Automation Testing]\n     B --> D[Unit Testing]\n     B --> E[Integration Testing]\n     B --> F[System Testing]\n     B --> G[User Acceptance Testing]\n     C --> H[Regression Testing]\n     C --> I[Load Testing]\n     C --> J[Performance Testing]\n     C --> K[Stress Testing]\n     L[Software Testing Techniques] --> M[Black Box Testing]\n     L --> N[White Box Testing]|||\n\n     # Software Testing can be broadly classified into two types: \n\n1. *Manual Testing:*  Manual testing includes testing software manually, i.e., without using any automation tool or any script. In this type, the tester takes over the role of an end-user and tests the software to identify any unexpected behavior or bug. There are different stages for manual testing such as unit testing, integration testing, system testing, and user acceptance testing. \n\n> Testers use test plans, test cases, or test scenarios to test software to ensure the completeness of testing. Manual testing also includes exploratory testing, as testers explore the software to identify errors in it. \n\n2. *Automation Testing:* Automation testing, which is also known as Test Automation, is when the tester writes scripts and uses another software to test the product. This process involves the automation of a manual process. Automation Testing is used to re-run the test scenarios quickly and repeatedly, that were performed manually in manual testing.\n\n> Apart from regression testing, automation testing is also used to test the application from a load, performance, and stress point of view. It increases the test coverage, improves accuracy, and saves time and money when compared to manual testing. \n\n## What are the different types of Software Testing Techniques ? \n\n*Software testing techniques can be majorly classified into two categories:*\n\n1. Black Box Testing: The technique of testing in which the tester doesn’t have access to the source code of the software and is conducted at the software interface without any concern with the internal logical structure of the software is known as black-box testing. \n\n2. White-Box Testing: The technique of testing in which the tester is aware of the internal workings of the product, has access to its source code, and is conducted by making sure that all internal operations are performed according to the specifications is known as white box testing."},
        {text: `input:${Text_Flowchart} `},
        {text: "output: "},
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      console.log(response.candidates[0].content)
      const flowchartOutput = response.text().split("|||")[1].trim();
      const restOfInformation = response.text().split("|||")[2].trim();

      setFlowchart_code(flowchartOutput);
      setMarkdown(restOfInformation)
      setOpen(true);
      hideDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View className='h-full p-4 w-full flex items-center justify-center  bg-slate-950 flex-1 '>
      <View id='blur' className='h-full w-5/6  flex items-center justify-center'>
        <TextInput numberOfLines={20} multiline={true} value={Text_Flowchart} onChangeText={(text) => setText_Flowchart(text)} placeholder='Enter text to generate flowchart' textAlignVertical='top' style={{ borderRadius: 8 ,borderWidth:0}} className=' w-full mb-4 rounded-lg bg-slate-900/60 text-slate-300 p-2 placeholder:text-slate-400' placeholderTextColor="rgb(148, 163 ,184)" />
        <Button
        icon="chevron-right"
      className='dark:text-white shadow-lg shadow-slate-950 bg-slate-900/90 rounded-lg p-0 m-0'
      onPress={fetchSummary}
    >
{/* <View className='flex h-full flex-1 w-full flex-row justify-between bg-red-500 items-center gap-2'> */}
            <Text style={{ fontFamily: 'Inter' }} className='dark:text-gray-300 text-lg flex-1   ' >Generate Flowchart</Text>

          {/* </View> */}
    </Button>
      </View>
      <FlowChart_popup fetchSummary={fetchSummary} Text_Flowchart={Markdown} flowchart_code={flowchart_code} open={open} mode={"flowchart"} setOpen={setOpen} />
      <View>
        <Portal >
          
          <Dialog style={{backgroundColor:"rgb(15,23,42 )"}} visible={visible} onDismiss={hideDialog} >
            <Dialog.Content className='flex flex-row justify-evenly items-center' >
              <Text variant="bodyLarge">{displayText} </Text><ActivityIndicator animating={true} />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>

    </View>
  )
}

export default mode_text_to_flowchart