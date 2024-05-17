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
            <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress= {handleAuthentication} color='#11418C'  /> 
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


//### FORMULARIO AGENDAMIENTO DE CITAS ### 

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [idMascota, setIdMascota] = useState('');
  const [fechaCita, setFechaCita] = useState('');


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.17.25.34/PosteoAgendarCitaAppMovil/AgendarCita.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          identificacion: identificacion,
          correo: correo,
          idMascota: idMascota,
          fecha: fechaCita,
        }),
      });
      const data = await response.text();
      console.log(data); // Manejar la respuesta del servidor si es necesario
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.nav}>
      <Image style={styles.logoFormAgendar}
      source={require('./assets/LOGO-VERTICAL_AZUL.png')}></Image>
      <Text style={styles.titleFormAgendar}>AGENDAMIENTO</Text>
    </View>  
    <ImageBackground style={styles.background} 
    source={require('./assets/background.jpeg')}>
    <View style={styles.back}></View>

      <View style={styles.containerFormCitas}>
        <Text style={styles.txtlog}>Nombre</Text> 
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="none"
        />
        <Text style={styles.txtlog}>Identificacion</Text> 
        <TextInput
          style={styles.input}
          value={identificacion}
          onChangeText={setIdentificacion}
          autoCapitalize="none"
        />
        <Text style={styles.txtlog}>Correo</Text> 
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
        />
        <Text style={styles.txtlog}>ID Mascota</Text> 
        <TextInput
          style={styles.input}
          value={idMascota}
          onChangeText={setIdMascota}
          autoCapitalize="none"
        />
        <Text style={styles.txtlog}>Fecha</Text> 
        <TextInput
          style={styles.input}
          value={fechaCita}
          onChangeText={setFechaCita}
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button title="Agendar Cita" onPress={handleSubmit} color='#11418C' />
        </View>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c"/>
      </View>
    </ImageBackground>  
    </ScrollView>
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

  logoFormAgendar: {
    marginTop: 55, 
    height: 150,
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
    justifyContent: 'center',
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
    color: 'white',  
    fontSize: 20, 
     
  },
  titleFormAgendar: {
    textAlign: 'center', 
    color: '#11418C',
    fontSize: 25,
  },

  buttonContainer: {
    alignSelf: 'center',
    width: 250,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 50
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
    fontSize: 20, 
  },
  
  input1:{
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4 
  },
  
  containerFormCitas:{
    alignSelf: 'center',
    width: 300,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  nav:{
    backgroundColor: 'white',
    height: 250
  }

}); 



