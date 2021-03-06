import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => {

    if(!props.token) {
        //LOGIN
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        }));
    }else{
        //HomeDrawer
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions:[
                NavigationActions.navigate({routeName:'HomeDrawer'})
            ]
        }));
    }

    return null;
}

const mapStateToProps = (state) => {
    return {
        token:state.userReducer.token,
        email:state.userReducer.email
    };
}

export default connect(mapStateToProps)(Preload);