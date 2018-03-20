import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';


const LoginForm = ({credentials, onLogin, onChange, submiting, errors,csrfToken}) => { 
    return (
        <form>
            <h1>Sign in</h1>
            <br/>
            <TextInput 
                type="hidden"
                name="_csrf"
                value={csrfToken}
            />
            <TextInput  
                type="text"              
                name="userName"
                label="User Name"
                value={credentials.userName}
                onChange={onChange}
            />
           
            <TextInput  
                type="password"               
                name="password"
                label="Password"                
                value={credentials.password}
                onChange={onChange}
            />
          
            <input
                type="submit"
                disabled={submiting}
                value={submiting ? 'Signing in ...' : 'Sign in'}
                className="btn btn-primary"
                onClick={onLogin} 
            />    
                        
        </form>
    );    
};
LoginForm.propTypes = {    
    credentials: PropTypes.object.isRequired,   
    onLogin: PropTypes.func,   
    onChange: PropTypes.func.isRequired,
    submiting: PropTypes.bool,
    errors: PropTypes.object,
    userName: PropTypes.string,
    password: PropTypes.string,
    csrfToken:PropTypes.string
};

export default LoginForm;