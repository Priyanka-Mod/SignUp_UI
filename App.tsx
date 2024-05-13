import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Input from './src/components/Input'
import LottieView from 'lottie-react-native'
import data from './data.json'

const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Phone Number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const App = () => {

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ width: "80%", alignItems: 'center' }}>
          <Text>Sign Up Screen</Text>
          <LottieView
            style={{ height: 300, width: 300 }}
            source={require('./src/assests/lottie/loginAnimation.json')}
            autoPlay
            loop />
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => console.log(values)}
            validationSchema={signUpValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={Input}
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  component={Input}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={Input}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={Input}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={Input}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />


                {/* demo prac diff between touchableOpacity */}

                {/* <TouchableWithoutFeedback onPress={() => console.log("submitted")}>
                  <View>
                    <Text style={{ color: 'purple', fontSize: 16, fontWeight: '700' }}>SIGN UP</Text>
                  </View>
                  {/* <Text style={{ color: 'purple', fontSize: 16, fontWeight: '700' }}>SIGN UP</Text> */}

                {/* </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => console.log("jahsvdnbds")
                }>
                  <View
                    style={{ marginTop: 20, backgroundColor: "lavender", padding: 12, borderRadius: 10 }}
                  >
                    <Text>Touch Here</Text>
                  </View>
                </TouchableWithoutFeedback> */}

                <TouchableOpacity onPress={() => handleSubmit()} disabled={!isValid} style={{ marginTop: 20, backgroundColor: "lavender", padding: 12, borderRadius: 10 }}>
                  <Text style={{ color: 'purple', fontSize: 16, fontWeight: '700' }}>SIGN UP</Text>
                </TouchableOpacity>

              </>
            )}

          </Formik>

        </View>
      </SafeAreaView>
    </>
    // <SafeAreaView style={{ paddingHorizontal: 20 }}>
    //   <FlatList
    //     data={data}
    //     initialNumToRender={5}
    //     windowSize={11}
    //     onEndReached={(res) => console.log(res)}
    //     maxToRenderPerBatch={5}
    //     updateCellsBatchingPeriod={6000}
    //     // getItemCount={(data) => data}
    //     renderItem={({ item }) => {
    //       return (
    //         <View>
    //           <Text style={{ paddingVertical: 20 }}>{item.id}   {item.quote}</Text>
    //         </View>
    //       )
    //     }}
    //   />
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App