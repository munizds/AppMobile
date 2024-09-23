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

  function handleTaskChangeStatus(taskToChange: {description: string; check: boolean}){
    const updatedTasks = tasks.filter((task)=> task.description !== taskToChange.description);
    const newTask ={
      description: taskToChange.description,
      check: !taskToChange.check,
    }
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  }


  function handleTaskDelete (taskToDelete : {description: string; check: boolean}){
    // Alert.alert ("Atenção!", `Deseja realmente remover a tarefa ${taskToDelete.description}?`,
    //   [
    //   {text: "Sim", onPress: ()=>{
    //     const updateTasks = tasks.filter((task)=> task != taskToDelete)
    //     setTasks(updateTasks)
    //   }},
    //   {text: "Cancelar", style: "cancel"}
    //   ]
    // )
    const updateTasks = tasks.filter((task)=> task != taskToDelete)
        setTasks(updateTasks)

  }

  useEffect(() =>{
    let totalTasks = tasks.length
    setCountTask(totalTasks);
  }, [tasks])

  return (
    <View style={styles.container}>
      <InputAddTask onPress={handleTaskAdd} onChangeText={setTaskText} value={taskText}/>
      <View style={{flexDirection: 'row', gap: 16}}>
        
      <CardNumber title={"Cadastradas"} num={countTask} color={"#1E1E1E"}/>
      <CardNumber title={"Em Aberto"} num={0} color={"#E88A1A"}/>
      <CardNumber title={"Finalizadas"} num={0} color={"30E9577"}/>
        </View> 
        <View style={styles.tasks}>
        <FlatList
        data={tasks}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={
          ({item})=> (
            <Task 
            title={item.description}
            status={item.check}
            onCheck={()=>handleTaskChangeStatus(item)}
            onRemove={()=>handleTaskDelete(item)}
            />
          )
        }
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
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 64,
    gap: 16,
  },
  inputContainer:{
    width: '100%',
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
