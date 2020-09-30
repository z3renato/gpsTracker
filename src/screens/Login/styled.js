import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
flex:1;
`;

export const Header = styled.SafeAreaView`
flex:1;
background-color:#4A69BD;
justify-content:center;
`;

export const BodyBg = styled.View`
flex:3;
background-color:#4A69BD;
`;

export const Input = styled.TextInput`
border: none;
border-top-width: 1px;
border-top-color:#CCC;
border-radius:4px;
border-bottom-width: 1px;
border-bottom-color:#CCC;
min-height: 40px;
height:50px;
font-size:14px;
width:90%;
color:#fff;
margin-left: 5%;
margin-top: 40%;
`;

export const Child = styled.TextInput`
border: none;
width:90%;
border-radius:4px;
border-bottom-width: 1px;
border-bottom-color:#CCC;
margin-top: 0;
height:10%;
min-height: 40px;
height:50px;
font-size:14px;
color:#fff;
margin-left: 5%;
`

export const ActionButton = styled.TouchableHighlight`
background-color:#FDB73C;
justify-content:center;
align-items:center;
min-height: 40px;
height:50px;
width:90%;
align-self:center;
border-radius:3px;
margin: 10px;
margin-top: 50px;
box-shadow: 0px 2px 2px #888;
`;

export const ActionButtonText = styled.Text`
color:#FFF;
font-size:18px;
`;

export const LoadingArea = styled.View`
position:absolute;
left:0;
top:0;
right:0;
bottom:0;
background-color:#4A69BD;
justify-content:center;
align-items:center;
`;

export const UnderlineText = styled.Text`
width:70%;
align-self:center;
color:#FFF;
font-size:12px;
letter-spacing: 1.2px;
text-decoration: none;
justify-content:center;
align-items:center;
margin-left: 150px;
margin-top: 40px;
`;





