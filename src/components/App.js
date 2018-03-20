//This component handles the App template used in every page.
import React,{PropTypes} from 'react';


class App extends React.Component{
    constructor(props, context){
        super(props, context);
        
        if (document.cookie.includes("logged_in") && !document.cookie.includes("logged_out")) {
            window.location = process.env.REDIRECT_URL;
       }        
    }   
 
    render(){
        return(
          <div className="container-fluid">             
                {this.props.children}   
          </div>
        );
    }
}

App.propTypes = {
     children: PropTypes.object.isRequired
};

export default App;