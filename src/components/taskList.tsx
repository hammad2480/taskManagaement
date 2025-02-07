import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import SearchBar from './Searchbar';
import ListEmptyComponent from './listEmptyComponent';

const TaskList = ({title, tasks, navigation, user, disabled}) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleSearch = txt => {
    if (!txt) {
      setFilteredTasks(tasks);
      return;
    }
    setFilteredTasks(
      tasks.filter(task =>
        task.title.toLowerCase().includes(txt.toLowerCase()),
      ),
    );
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <SearchBar onSearch={handleSearch} />
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyCard}>
          <ListEmptyComponent isSmallList={true} txt={`No ${title}`} />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {filteredTasks.slice(0, 3).map(task => (
            <TouchableOpacity
              disabled={disabled}
              key={task.id}
              onPress={() =>
                navigation.navigate('TaskAssign', {
                  task,
                  user,
                  status:
                    task?.users?.find(item => item?.userId === user?.id)
                      ?.status || 'Not Assigned',
                })
              }
              style={styles.card}>
              <View style={styles.infoContainer}>
                <View style={styles.contentContainer}>
                  <Text style={styles.name}>{task.title}</Text>
                  <View style={styles.statusView}>
                    <View
                      style={[
                        styles.statusColor,
                        {
                          backgroundColor:
                            task?.users?.find(item => item?.userId === user?.id)
                              ?.status == 'Completed'
                              ? 'green'
                              : task?.users?.find(
                                  item => item?.userId === user?.id,
                                )?.status == 'In Progress'
                              ? 'yellow'
                              : 'red',
                        },
                      ]}
                    />
                    <Text style={styles.status}>
                      {task?.users?.find(item => item?.userId === user?.id)
                        ?.status || 'Not Assigned'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.description}>{task.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginVertical: '5%',
  },
  scrollContainer: {
    marginTop: '2%',
    paddingBottom: 20,
  },
  status: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFE4E1',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  emptyCard: {
    backgroundColor: '#FFE4E1',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {flex: 1},
  name: {fontSize: 16, fontWeight: 'bold'},
  description: {fontSize: 14, color: '#FF6B6B'},
  statusView: {
    flexDirection: 'row',
    width: '26%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusColor: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
});

export default TaskList;
