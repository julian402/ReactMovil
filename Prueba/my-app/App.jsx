import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
 
const firebaseConfig = {  
  apiKey: "AIzaSyAJRRvlpCen4nquAERNsX-ZhaTUci8Oicw",
  authDomain: "digipets-e128a.firebaseapp.com",
  projectId: "digipets-e128a",
  storageBucket: "digipets-e128a.appspot.com",
  messagingSenderId: "329527904529",
  appId: "1:329527904529:web:34b69c7ca5a268018aa4b0",
  measurementId: "G-K2N85TXV5F"
}; 

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground style={styles.background} 
      source={require('./assets/background.jpeg')}>
      <View style={styles.back}></View>
      <Image style={styles.logo} 
      source={require('./assets/favicon.png')} />
        <View style={styles.authContainer}>
          
          <Text style={styles.txtlog}>
            Correo 
          </Text> 
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail} 
            autoCapitalize="none"
          />
          <Text style={styles.txtlog}>
            Contraseña
          </Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          /> 
          <View style={styles.buttonContainer}>
            <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress= {handleAuthentication} color='white'  /> 
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

 

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [fechaCita, setFechaCita] = useState('');

  const handleAgendarCita = () => {
  
    console.log('Tipo de Consulta:', tipoConsulta);
    console.log('Fecha de la Cita:', fechaCita);
  };
  return (
    <View style={styles.container}>
      {user && user.email && ( // Verificar si user y user.email están definidos
        <>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.emailText}>{user.email}</Text>
          <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
        </>
      )}
      <Text style={styles.formTitle}>Agendar Cita</Text>
      <TextInput
        style={styles.input1}
        value={tipoConsulta}
        onChangeText={setTipoConsulta}
        //placeholder="Tipo de Consulta"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input1}
        value={fechaCita}
        onChangeText={setFechaCita}
        placeholder="Fecha de la Cita"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button title="Agendar Cita" onPress={handleAgendarCita} color="#3498db" />
      </View>
    </View>
  );
};
export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //alignItems: 'stretch', 
    //backgroundColor: '#f0f0f0' 
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  back:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11418C',
    opacity: 0.6
  },
  authContainer: {
    alignSelf: 'center',
    width: 300,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#ccc',
    borderRadius: 25
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  input: {
    alignSelf: 'center',
    width: 300,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    color: 'white'   
     
  },
  title: {
    textAlign: 'center', 
    color: 'white'
  },

  buttonContainer: {
    marginBottom: 16, 

  },
  toggleText: {
    color: 'white',
    textAlign: 'center'
  },
  bottomContainer: {
    marginTop: 20   
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  txtlog: { 
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },
  
  input1:{
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4 
  }

}); 



