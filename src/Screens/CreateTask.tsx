import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AddTask } from "../Store/taskSlice";
import { generateRandomId } from "../functions/randomId";
import SuccessModal from "../components/SuccessModal";
const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .required("Name is required"),
  
    description: Yup.string()
      .test(
        "word-count",
        "Description must be between 3 and 50 words",
        value => {
          if (!value) return false;
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount >= 3 && wordCount <= 50;
        }
      )
      .required("Description is required"),
  });

const CreateTaskScreen = ({navigation}) => {
    const dispatch = useDispatch()
          const [successModal,setSuccessModal] = useState(false)
          const [modalTxt,setModalTxt] = useState('')
    const [height, setHeight] = useState(40); 
  const handleSubmit = (values) => {
      dispatch(AddTask({
        id:generateRandomId(),
        title:values.name,
        description:values.description,
        users:[]
      }))
            setModalTxt('Task Created Successfully!')
            setSuccessModal(true)
           setTimeout(() => {
              setSuccessModal(false)
              navigation.goBack()
          }, 2000);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", description:''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <>
            
                <Text style={styles.header}>Create Task! ⭐</Text>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
                  placeholderTextColor={"#FF6B6B"}
              style={styles.input}
              placeholder="Enter Title"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
               style={[styles.input, { height }]}
              placeholder="Enter Description"
              placeholderTextColor={"#FF6B6B"}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              multiline
              onContentSizeChange={(event) =>
                setHeight(event.nativeEvent.contentSize.height)
              }
            />
            {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

        
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Create Task</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <SuccessModal visible={successModal} text={modalTxt} onClose={()=>setSuccessModal(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAE3",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
        marginTop: '10%',
    marginBottom:'5%'
  },
  uploadImg:{
      width: '17%',
      height: '17%',
      position: 'absolute',
      bottom: 20,
      right: 5,
      backgroundColor: 'black',
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 100
    },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pic:{
    width:'30%',
    height:'15%',
    alignSelf:'center',
    marginBottom:'2%',
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
  img:{
    width:'100%',
    height:'100%',
    borderRadius:100,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    position:'absolute',
    bottom:20,
    alignSelf:'center',
    width:'90%'
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateTaskScreen;
