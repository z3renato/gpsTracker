import React, {useState, useEffect} from 'react';
import { StatusBar, Platform, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import loginApi from '../../loginApi';
import { 
  Container, 
  Header, 
  BodyBg,
  Input,
  ActionButton,
  ActionButtonText,
  LoadingArea,
  UnderlineText,
  Child,
} from './styled';

const Login = (props) => {
  const api = loginApi();

  const [activeMenu, setActiveMenu] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    
    tinyLogo: {
      marginTop: 80,
      width: 105,
      height: 50,
      alignSelf:'center'
    },

    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  
  });

  useEffect(()=>{
    props.setToken('');
    props.setEmail('');
  }, [])

  const handleSignIn = async () => {
    if(email && password){

      setLoading(true);
      const res = await api.signin(email, password);
      setLoading(false);

      if(res.error){
        alert(res.error);
      }else{
        props.setToken(res.token);
        props.setEmail(email);
        
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions:[
            NavigationActions.navigate({routeName:'HomeDrawer'})
          ]
        }));
      }
    } 
  };

  return (
      <Container behavior={Platform.OS === 'ios'?'padding':null}>
        <StatusBar barStyle="light-content" />

        <BodyBg>
          <Image source={require('../../assets/logoPier.png')} style={styles.tinyLogo}/>
          <Input editable={!loading} value={email} onChangeText={t=>setEmail(t)} autoCapitalize="none" placeholder="E-mail" placeholderTextColor="#CCC" />
          <Child editable={!loading} value={password} onChangeText={t=>setPassword(t)} placeholder="Password" placeholderTextColor="#CCC" secureTextEntry={true}/>
          {activeMenu == 'signin' &&     
            <ActionButton disabled={loading} onPress={handleSignIn}>
              <ActionButtonText>ENTRAR</ActionButtonText>
            </ActionButton>
          }
          {loading &&
            <LoadingArea>
              <ActivityIndicator size="large" color="#3574cb"/>
            </LoadingArea>
          } 
          <TouchableOpacity>
            <UnderlineText>Esqueci a senha</UnderlineText>
          </TouchableOpacity>
          
        </BodyBg>
        
      </Container>
    );
  }

const mapStateToProps = (state) => {
  return {
    token:state.userReducer.token,
    email:state.userReducer.email
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken:(token)=>dispatch({type:'SET_TOKEN', payload:{token}}),
    setEmail: (email)=>dispatch({type:'SET_EMAIL', payload:{email}})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);