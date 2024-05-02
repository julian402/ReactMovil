import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAmgv45cfuUl4Xfm3P2lRJ0jJRF7xYcAtY",
  authDomain: "test-4ddd4.firebaseapp.com",
  projectId: "test-4ddd4",
  storageBucket: "test-4ddd4.appspot.com",
  messagingSenderId: "10288342584",
  appId: "1:10288342584:web:1565f3e8671ceb667c68cd",
  measurementId: "G-53DPFJXR0S"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground style={styles.background} 
      source={require('./assets/background.jpeg')}>
      <Image style={styles.logo} 
      source={require('./assets/favicon.png')} />
      <View style={styles.back}></View>
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    ></ScrollView>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
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
    backgroundColor: '#f0f0f0'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  back:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11418C',
    opacity: 0.6,
  },
  authContainer: {
    alignSelf: 'center',
    width: 300,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    width: 80,
    marginBottom: 16,
    textAlign: 'center',
  
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4
  },
  buttonContainer: {
    marginBottom: 16,

  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
});