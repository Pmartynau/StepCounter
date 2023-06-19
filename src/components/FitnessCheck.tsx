import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
const FitnessButton = ({ onPress }) => {
    const [count, setCount]= React.useState(0);

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#C3FF53',
        borderRadius: 25,
        padding: 10,
      }}
      onPress={onPress}
    >
      <Ionicons name="fitness" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default FitnessButton;
