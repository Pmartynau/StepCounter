import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';
import FitnessButton from './src/components/FitnessCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEPS_GOAL = 10_000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays) => {
    const currentDate = new Date(date); // Create a copy of the current date
    // Update the date by adding/subtracting the number of days
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  };
  const handleFitnessButtonPress = async () => {
    try {
      const checkInDate = await AsyncStorage.getItem('checkInDate ');
      if (checkInDate) {
      Alert.alert('Already checked in today');
      return;
      }
      await AsyncStorage.setItem('checkInDate', date.toISOString());
      Alert.alert('Check-in successful');
    }catch(error) {
      Alert.alert('Error while checking in:',error);
   };
  };
  return (
    <View style={styles.container}>
        <FitnessButton onPress={handleFitnessButtonPress} />
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>

        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
});
