import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, value, placeholder, type, error}) => {
    let wrapperClass= 'form-group';
    if(error && error.length > 0 ){
        wrapperClass += " " + 'has error';
    }
    
    return (
        <div className={wrapperClass}>        
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    value={value}
                    placeholder={placeholder}                                        
                    onChange={onChange}
                    required={"true"}  />
                {error && <div className="alert alert-danger" >{error}</div>}
            </div>
        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string
};

export default TextInput;