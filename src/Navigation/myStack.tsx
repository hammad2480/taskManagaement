import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../Screens/Landing';
import BottomTabs from './BottomTabs';
import CreateUserScreen from '../Screens/CreateUser';
import CreateTaskScreen from '../Screens/CreateTask';
import UserDetailScreen from '../Screens/userDetailScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskAssignmentScreen from '../Screens/TaskAssignScreen';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='Landing'
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bottom" component={BottomTabs} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="CreateUser" component={CreateUserScreen}/>
      <Stack.Screen name="CreateTask" component={CreateTaskScreen}/>
      <Stack.Screen name="UserDetail" component={UserDetailScreen}/>
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen}/>
      <Stack.Screen name="TaskAssign" component={TaskAssignmentScreen}/>
    </Stack.Navigator>
  );
};

export default MyStack;