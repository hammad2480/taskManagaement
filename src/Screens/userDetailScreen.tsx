import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SvgXml} from 'react-native-svg';
import {edit, plus} from '../assets/svgs';
import selectImage from '../functions/imagePicker';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteUser, UpdateUser} from '../Store/userSlice';
import TaskList from '../components/taskList';
import {selectTasksByIds} from '../Store/taskSlice';
import ConfirmationModal from '../components/confirmModal';
import SuccessModal from '../components/SuccessModal';

const UserDetailScreen = ({navigation, route}) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>SSSSS', userTasks);

  const dispatch = useDispatch();
  const {user} = route?.params;
  const userTasks = useSelector(state =>
    selectTasksByIds(state, user?.tasks?.map(task => task.taskId) || []),
  );
  const allTasks = useSelector(state => state?.task?.tasks);
  const [editableField, setEditableField] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalText, setModalTxt] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .required('Name is Required'),
    role: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Role is required'),
    image: Yup.string().required('Image is Required'),
  });

  const handleSubmit = values => {
    const updatedData = {
      name: values.name,
      role: values.role,
      image: values.image,
    };
    dispatch(UpdateUser({userId: user.id, updatedData}));
    setModalTxt('User Updated Sucessfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  };

  const handleDelete = () => {
    dispatch(DeleteUser({userId: user.id}));
    setModalTxt('User Deleted Sucessfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <Formik
      initialValues={{
        name: user.name,
        role: user.role,
        image: user.image,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Update User Details! ⚡</Text>
          <View>
            <TouchableOpacity
              onPress={async () => {
                const image = await selectImage();
                setFieldValue('image', image);
              }}
              style={styles.uploadImg}>
              <SvgXml xml={plus} width={12} height={12} />
            </TouchableOpacity>
            <Image source={{uri: values.image}} style={styles.userImage} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              {key: 'name', label: 'Name'},
              {key: 'role', label: 'Role'},
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
                    onBlur={handleBlur(field.key)}
                    editable={editableField === field.key}
                    onSubmitEditing={() => setEditableField(false)}
                  />
                  <TouchableOpacity onPress={() => setEditableField(field.key)}>
                    <SvgXml
                      style={{marginLeft: 10}}
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
            <TaskList
              disabled={false}
              user={user}
              title={'Assigned Tasks'}
              tasks={userTasks.filter(task =>
                task.users.some(userTask => userTask.status === 'In Progress'),
              )}
              navigation={navigation}
            />

            <TaskList
              disabled={true}
              user={user}
              title={'Completed Tasks'}
              tasks={userTasks.filter(task =>
                task.users.some(userTask => userTask.status === 'Completed'),
              )}
              navigation={navigation}
            />

            <TaskList
              disabled={false}
              title="Available Tasks"
              user={user}
              tasks={allTasks?.filter(
                task => !userTasks?.some(userTask => userTask.id === task.id),
              )}
              navigation={navigation}
            />
            <View style={{paddingBottom: 150}} />
          </ScrollView>
          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalTxt('Are you sure you want to delete this user!');
              setConfirm(true);
            }}
            style={[
              styles.saveButton,
              {
                bottom: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'red',
              },
            ]}>
            <Text style={styles.DeleteButtonText}>Delete User</Text>
          </TouchableOpacity>
          <ConfirmationModal
            message={modalText}
            onClose={() => setConfirm(false)}
            visible={confirm}
            onConfirm={() => {
              setConfirm(false);
              handleDelete();
            }}
          />
          <SuccessModal
            visible={successModal}
            onClose={() => setSuccessModal(false)}
            text={modalText}
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
    marginBottom: '5%',
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: '5%',
  },
  inputContainer: {marginBottom: 15},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  editButton: {color: 'blue', padding: 10},
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
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  DeleteButtonText: {
    color: 'red',
    fontSize: 16,
  },
  uploadImg: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 30,
    right: 132,
    zIndex: 3,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

export default UserDetailScreen;
