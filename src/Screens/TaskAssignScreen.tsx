import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AssignTaskToUser, ChangeTaskStatus} from '../Store/userSlice';
import {useDispatch} from 'react-redux';
import {AssignUserToTask, ChangeUserStatus} from '../Store/taskSlice';
import SuccessModal from '../components/SuccessModal';

const TaskAssignmentScreen = ({route, navigation}) => {
  const [successModal, setSuccessModal] = useState(false);
  const [modalTxt, setModalTxt] = useState('');
  const {user, task, status} = route.params;

  const dispatch = useDispatch();

  const handleAssignTask = () => {
    dispatch(AssignTaskToUser({userId: user?.id, taskId: task?.id}));
    dispatch(AssignUserToTask({userId: user?.id, taskId: task?.id}));
    setModalTxt('Task Assigned Successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.pop(2);
    }, 2000);
  };

  const handleUpdateStatus = () => {
    dispatch(
      ChangeTaskStatus({
        userId: user?.id,
        taskId: task?.id,
        status: 'Completed',
      }),
    );
    dispatch(
      ChangeUserStatus({
        userId: user?.id,
        taskId: task?.id,
        status: 'Completed',
      }),
    );
    setModalTxt('Task Completed Successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.pop(2);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {status == 'In Progress'
          ? 'Mark Task As Completed ✅'
          : 'Assign Task To User! 📌'}
      </Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>User</Text>
        <View style={styles.userContainer}>
          <Image source={{uri: user.image}} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Task</Text>
        <View style={styles.taskContainer}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (status == 'In Progress') {
            handleUpdateStatus();
          } else {
            handleAssignTask();
          }
        }}>
        <Text style={styles.buttonText}>
          {status == 'In Progress' ? 'Mark As Completed' : 'Assign Task'}
        </Text>
      </TouchableOpacity>
      <SuccessModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        text={modalTxt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAE3',
  },
  card: {
    backgroundColor: '#FFE4E1',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: '10%',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  taskContainer: {
    marginTop: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskAssignmentScreen;
