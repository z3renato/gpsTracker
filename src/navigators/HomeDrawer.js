import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';

export default createDrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: { title: 'Dashboard' },
    },
    Login:{
        screen: Login,
        navigationOptions: { title: 'Sair' },
    }
});