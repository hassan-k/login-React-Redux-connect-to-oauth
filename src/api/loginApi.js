
let baseUrl = process.env.BASE_URL;
let oauthUsername = process.env.OAUTH_USERNAME;
let oauthPassword = process.env.OAUTH_PASSWORD;

export const hash = new Buffer(`${oauthUsername}:${oauthPassword}`).toString('base64');

class LoginApi { 
    static login(credentials= {userName:'', password:''}) {
       
        const request = new Request(baseUrl + '/oauth/token?grant_type=password&username=' + credentials.userName
            + '&password=' + credentials.password, {                 
            method: 'POST',
            headers: new Headers({
             'Content-Type': 'application/json',
             'Authorization': `Basic ${hash}`
            })                           
        });      
        return fetch(request).then(Response => { 
                return Response;               
            }).catch(error => {
                return error;
            });
    }

    static getNewAccessToken(refresh_token) {
        
        const request = new Request(baseUrl + '/oauth/token?grant_type=refresh_token&refresh_token=' + refresh_token, {                
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${hash}`
            })                                    
        });            
        return fetch(request).then(response => { 
          //      sessionStorage.removeItem('access_token');
          //      sessionStorage.removeItem('refresh_token');                
                sessionStorage.getItem('access_token', response.access_token);
                sessionStorage.getItem('refresh_token', response.refresh_token);
                return response;               
            }).catch(error => {
                return error;
            });
    }
}

export default LoginApi;