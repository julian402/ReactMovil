import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ImageBackground } from 'react-native';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí podrías agregar la lógica para autenticar al usuario
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };

  return (

    
      <ImageBackground style={styles.background}
        source={require('./assets/background.jpeg')}>
        
        <View style={styles.back}></View>
        <View style={styles.container}> 
        

          <Image style={styles.logo}
          source={require('./assets/favicon.png')} 
          />

          <Text style={styles.txtiniciosesion}>
            Iniciar sesión
          </Text>

          <Text style={styles.txtlog}>
            Correo
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.txtlog}>
            Contraseña
          </Text>

          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
      </ImageBackground>
  );
};



const styles = StyleSheet.create({
  
  back:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11418C',
    opacity: 0.6,
  },
  background: {
    flex: 1,
    opacity: 5,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
    justifyContent: 'center', // Centra verticalmente
  },

  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
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
  },
  logo: {
  
    width: 100,
    height: 100,
    alignSelf: 'center',
    color: 'white',
    resizeMode: 'contain', // Modo de redimensionamiento de la imagen
  },

  txtiniciosesion: {
    paddingBottom: 100,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  txtlog: {
    paddingLeft : 30,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  }



  
});

export default LoginForm;
