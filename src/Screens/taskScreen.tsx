import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {plus} from '../assets/svgs';
import {useSelector} from 'react-redux';
import ListEmptyComponent from '../components/listEmptyComponent';

const TaskScreen = ({navigation}) => {
  const {tasks} = useSelector(state => state?.task);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TaskDetail', {task: item})}
      style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Tasks Available! 🧪</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={
          tasks?.length === 0 ? styles.flatListContainer : {}
        }
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <ListEmptyComponent txt={'No Tasks Found!'} />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}>
        <SvgXml width={20} height={20} xml={plus} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAE3',
    padding: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFE4E1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#FF5E78',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 130,
    backgroundColor: '#FF6B6B',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
});

export default TaskScreen;
