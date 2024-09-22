import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native';
import { Task } from './src/components/Task';
import { CardNumber } from './src/components/CardNumber';
import { InputAddTask } from './src/components/InputAddTask';
import { useEffect, useState } from 'react';
import { Stringifier } from 'styled-components/dist/types';
import { InputContainer } from './src/components/InputAddTask/styles';
import styled from 'styled-components';
import {Feather} from '@expo/vector-icons'


export default function App() {

  const[tasks, setTasks] = useState<{description: string; check: boolean}[]>([]);
  const [taskText, setTaskText] = useState("");
  const [countTask, setCountTask] = useState(0)

  function handleTaskAdd(){
    if(taskText== ""){
      console.log('sem descrição')
      return Alert.alert("Erro", "Tarefa está sem descrição.")
    }
    if(tasks.some((tasks)=> tasks.description === taskText)){
      console.log('já existe')
      return Alert.alert("Erro", "Tarefa já existe.")
    
    }
    const newTask = {description: taskText, check: false};
    setTasks([...tasks, newTask]);
    setTaskText('');
  }

  useEffect(() =>{
    let totalTasks = tasks.length
    setCountTask(totalTasks);
  }, [tasks])

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.InputContainer}>
      <TextInput
      style={styles.input}
      placeholder='Digite a tarefa'
      placeholderTextColor="white"
      keyboardType='default'
      onChangeText={setTaskText}
      value={taskText}
      />
      <TouchableOpacity style={styles.inputButton} onPress={handleTaskAdd}>
        <Feather name='plus-square' size={24}color="white"/>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', gap: 16}}>
        
      <CardNumber/>
      <CardNumber/>
      <CardNumber/>
        </View> 
        <View style={styles.tasks}>

        <Text>{countTask}</Text>
        <FlatList
        data={tasks}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={
          ({item})=> (
            <Task/>
          )
        }
        ListEmptyComponent={()=>(
          <Text>Você não cadastrou tarefas!</Text>
        )}
        />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28385E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 64,
    gap: 16,
  },
  InputContainer:{
    flexDirection:'row',
    borderRadius: 4,
    backgroundColor: '#252627',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#fff'
  },
  inputButton: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 4,
  },
  tasks:{
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
  }
});
