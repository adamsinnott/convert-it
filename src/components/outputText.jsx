import React from "react";

const OutputText = (props) => {
    return (
        <div id="output-text-container">
            <label id="output-text">{props.outputText}</label>
        </div>
    )
}

export default OutputText;