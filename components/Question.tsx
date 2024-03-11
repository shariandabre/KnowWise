import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Divider, RadioButton,Text } from 'react-native-paper';



const Question = ({ question, options, onSelect }) => {
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    setSelected(null);
  }, [question]);

  const handleSelect = (index) => {
    setSelected(index);
    onSelect(index);
  };

  return (
    <View className='w-full flex-1 p-2'>
      <Text className='text-2xl font-bold text-slate-100 leading-6 mb-6' >{question}</Text>
      {options.map((option, index) => (
        
        <RadioButton.Group key={index}>
          <View className='flex flex-row mb-4 items-satrt justify-start bg-slate-900/60 rounded-lg p-2'>
          <RadioButton value={option} status={selected === index ? 'checked' : 'unchecked'} onPress={() => handleSelect(index)} />
          
            <Text  className=' text-lg font-semibold text-slate-300 text-center' >{option}</Text>
          </View>
        </RadioButton.Group>
      ))}
    </View>
  );
};

export { Question };
