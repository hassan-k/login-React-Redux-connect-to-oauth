import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import toastr from 'toastr';
import {Link , browserHistory} from 'react-router';


export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS};
}

let redirectUrl = process.env.REDIRECT_URL;

function redirect() {     
    window.location =  redirectUrl + '?access_token=' + sessionStorage.access_token 
                    + '&refresh_token=' + sessionStorage.refresh_token + '&cookie=' + document.cookie;
//    window.location = {
//        href: redirectUrl + '?access_token=' + sessionStorage.access_token 
 //                    + '&refresh_token=' + sessionStorage.refresh_token
     //   cookie : document.cookie             
 //   }
    deleteTokens();
}

export function logInUser(credentials){
    return function(dispatch){ 
        return loginApi.login(credentials)
        .then(response => { 
            const status = response ? response.status : 500;
            if (status == 200) {
                let payload = response.json()
                    .then((data) => {
                        sessionStorage.setItem('access_token', data.access_token);
                        sessionStorage.setItem('refresh_token', data.refresh_token);
                        dispatch(loginSuccess());         
                        deleteAllCookies();              
                        document.cookie = "logged_in";                        
                        redirect();
                    });                               
            } else if (status == 400) {      
                 toastr.error("Username or password is incorrect!");  // Bad credentials               
            } else if (status == 401) {            
                 toastr.error("Unauthorized user! Try to login later."); // Unauthorized user!               
            } else if (status == 403) { 
                toastr.error("Server is not available!");             
            } else {
                toastr.error("Error");
            }     
                          
        }).catch(error =>{ 
          
        });
    };
}

export function deleteTokens() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token'); 
}

export function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function logOutUser() {
    deleteTokens();
    return {type: types.LOG_OUT};
}
 
export function meta() {
    let meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName('head')[0].appendChild(meta);
    
}
    