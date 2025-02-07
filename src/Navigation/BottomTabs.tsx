import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UsersScreen from '../Screens/userScreen';
import TasksScreen from '../Screens/taskScreen';
import {SvgXml} from 'react-native-svg';
import {tasks, users} from '../assets/svgs';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarStyle: {
          backgroundColor: '#FFE4E1',
          height: 60,
          marginHorizontal: '5%',
          position: 'absolute',
          bottom: '2%',
          borderRadius: 100,
        },
        tabBarLabelStyle: {fontSize: 14},
      }}>
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: () => <SvgXml width={20} height={20} xml={users} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: () => <SvgXml width={20} height={20} xml={tasks} />,
        }}
      />
    </Tab.Navigator>
  );
}
