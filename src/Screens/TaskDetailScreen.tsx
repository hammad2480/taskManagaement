import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteTask, UpdateTask} from '../Store/taskSlice';
import {SvgXml} from 'react-native-svg';
import {edit} from '../assets/svgs';
import UserList from '../components/userList';
import ConfirmationModal from '../components/confirmModal';
import SuccessModal from '../components/SuccessModal';

const TaskDetailScreen = ({navigation, route}) => {
  const {users} = useSelector(state => state?.user);
  const dispatch = useDispatch();
  const {task} = route?.params;
  const [editableField, setEditableField] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalText, setModalTxt] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Title is required'),
    description: Yup.string()
      .test(
        'word-count',
        'Description must be between 3 and 50 words',
        value =>
          value &&
          value.trim().split(/\s+/).length >= 3 &&
          value.trim().split(/\s+/).length <= 50,
      )
      .required('Description is required'),
  });

  const handleSubmit = values => {
    dispatch(UpdateTask({taskId: task.id, updatedData: values}));
    setModalTxt('Task Updated Successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  };

  const handleDelete = () => {
    dispatch(DeleteTask({taskId: task.id}));
    setModalTxt('Task Deleted Successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <Formik
      initialValues={{title: task.title, description: task.description}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <Text style={styles.header}>Update Your Task! ⚡</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              {key: 'title', label: 'Title'},
              {key: 'description', label: 'Description'},
            ].map(field => (
              <View key={field.key} style={styles.inputContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      editableField === field.key && styles.editableInput,
                    ]}
                    value={values[field.key]}
                    onChangeText={handleChange(field.key)}
                    multiline={field.key === 'description'}
                    onBlur={handleBlur(field.key)}
                    editable={editableField === field.key}
                    onSubmitEditing={() => setEditableField(false)}
                  />
                  <TouchableOpacity onPress={() => setEditableField(field.key)}>
                    <SvgXml
                      style={styles.editIcon}
                      xml={edit}
                      width={20}
                      height={20}
                    />
                  </TouchableOpacity>
                </View>
                {touched[field.key] && errors[field.key] && (
                  <Text style={styles.errorText}>{errors[field.key]}</Text>
                )}
              </View>
            ))}
            <UserList
              title="Available Users List"
              users={users.filter(
                user =>
                  !user.tasks ||
                  !user.tasks.some(userTask => userTask.taskId === task.id),
              )}
              task={task}
              navigation={navigation}
            />

            <UserList
              title="Already Assigned Users"
              users={users.filter(
                user =>
                  user.tasks &&
                  user.tasks.some(
                    userTask =>
                      userTask.taskId === task.id &&
                      userTask?.status === 'In Progress',
                  ),
              )}
              task={task}
              navigation={navigation}
            />
            <UserList
              disabled={true}
              title="Completed Users List"
              users={users.filter(
                user =>
                  user.tasks &&
                  user.tasks.some(
                    userTask =>
                      userTask.taskId === task.id &&
                      userTask?.status === 'Completed',
                  ),
              )}
              task={task}
              navigation={navigation}
            />
            <View style={{paddingBottom: 150}} />
          </ScrollView>

          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalTxt('Are you sure you want to delete this task!');
              setConfirm(true);
            }}
            style={[styles.saveButton, styles.deleteButton]}>
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
          <ConfirmationModal
            message={modalText}
            visible={confirm}
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              setConfirm(false);
              handleDelete();
            }}
          />
          <SuccessModal
            visible={successModal}
            text={modalText}
            onClose={() => setSuccessModal(false)}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#FFFAE3'},
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '10%',
    marginBottom: '5%',
  },
  inputContainer: {marginBottom: 15},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  inputWrapper: {flexDirection: 'row', alignItems: 'center'},
  input: {
    borderColor: '#FFA69E',
    borderWidth: 1,
    opacity: 0.7,
    borderRadius: 10,
    flex: 1,
    fontSize: 16,
    padding: 8,
    paddingLeft: 10,
  },
  editableInput: {
    backgroundColor: 'white',
    borderColor: '#FF6B6B',
    opacity: 1,
    borderWidth: 1,
    borderRadius: 10,
  },
  editIcon: {marginLeft: 10},
  errorText: {color: 'red', fontSize: 12, marginTop: 5},
  saveButton: {
    backgroundColor: '#FF6B6B',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  deleteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    bottom: 20,
  },
  saveButtonText: {color: 'white', fontSize: 16},
  deleteButtonText: {color: 'red', fontSize: 16},
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginVertical: '5%',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  infoContainer: {flex: 1},
  name: {fontSize: 16, fontWeight: 'bold'},
  role: {fontSize: 14, color: '#666'},
  email: {fontSize: 14, color: '#888'},
});

export default TaskDetailScreen;
