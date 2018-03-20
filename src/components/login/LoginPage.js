import React, {PropTypes} from 'react';
import {Link , browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';


class LoginPage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {      
            credentials: {userName: '', password: ''},    
            submiting: false
        };

        this.onLogin = this.onLogin.bind(this);
        this.onChange = this.onChange.bind(this);          
   
    }

  
    onChange(event){
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({credentials: credentials});     
    }

    onLogin(event) {
        const self = this;
        event.preventDefault();
        let {credentials} = this.state;       
        if(credentials.userName === '' || credentials.password === '') {
            toastr.error("Please enter your username and password.");
        } else {
            this.setState({submiting: true});    
            this.props.actions.logInUser(this.state.credentials);              
            
            this.setState({submiting: false}); 
            this.state = {      
                credentials: {userName: '', password: ''}                 
        };
      }
    }

    getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
    
    render(){    
        return(           
            <LoginForm         
                credentials={this.state.credentials}
                onLogin={this.onLogin}
                onChange={this.onChange} 
                submiting={this.state.submiting}    
                csrfToken={this.getCookie("csrfToken")}            
            />  
        );
    }
        
}

LoginPage.propTypes = {  
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,   
    credentials: PropTypes.object,
    submiting: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    onLogin: PropTypes.func

    
};


function mapStateToProps(state, ownProps){
    return {        
        credentials: state.credentials 
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)   
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);