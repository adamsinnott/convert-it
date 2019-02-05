import React from "react";

const SubmitButton = (props) => {
    return (
        <button className="input-buttons submit-button" onClick={props.onSubmit}>Submit</button>
    )
}

export default SubmitButton;