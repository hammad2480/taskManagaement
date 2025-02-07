import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SvgXml} from 'react-native-svg';
import {plus} from '../assets/svgs';
import selectImage from '../functions/imagePicker';
import {useDispatch} from 'react-redux';
import {AddUsers} from '../Store/userSlice';
import {generateRandomId} from '../functions/randomId';
import SuccessModal from '../components/SuccessModal';
const validationSchema = Yup.object().shape({
  img: Yup.string().required('Img is required'),
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .min(3, 'Role must be at least 5 characters')
    .required('Role is required'),
});

const CreateUserScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [modalTxt, setModalTxt] = useState('');
  const handleSubmit = values => {
    dispatch(
      AddUsers({
        id: generateRandomId(),
        name: values.name,
        image: values.img,
        email: values.email,
        role: values.role,
        tasks: [],
      }),
    );
    setModalTxt('User Created Successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', email: '', role: '', img: ''}}
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
          <>
            <View style={styles.pic}>
              {values?.img ? (
                <Image style={styles.img} source={{uri: values?.img}} />
              ) : (
                <Image
                  style={styles.img}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                  }}
                />
              )}

              <TouchableOpacity
                onPress={async () => {
                  const image = await selectImage();
                  console.log('>>>>>>>>>>>>>>>>>>>>>>', image);

                  setFieldValue('img', image);
                }}
                style={styles.uploadImg}>
                <SvgXml xml={plus} width={12} height={12} />
              </TouchableOpacity>
            </View>
            <Text style={styles.header}>Create User</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor={'#FF6B6B'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor={'#FF6B6B'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Role</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Role"
                placeholderTextColor={'#FF6B6B'}
                onChangeText={handleChange('role')}
                onBlur={handleBlur('role')}
                value={values.role}
              />
              {touched.role && errors.role && (
                <Text style={styles.error}>{errors.role}</Text>
              )}
              <View style={{paddingBottom: 100}} />
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                if (!values.img) {
                  setModalTxt('User Image is Required!');
                  setErrModal(true);
                  setTimeout(() => {
                    setErrModal(false);
                  }, 2000);
                  return;
                }
                handleSubmit();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Create User</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <SuccessModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        text={modalTxt}
      />
      <SuccessModal
        isErr
        visible={errModal}
        onClose={() => setErrModal(false)}
        text={modalTxt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAE3',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadImg: {
    width: '17%',
    height: '17%',
    position: 'absolute',
    bottom: 14,
    right: 5,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pic: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginBottom: '2%',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: '#FF6B6B',
    opacity: 1,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateUserScreen;
