import React from "react";

const SwapButton = (props) => {
    return (
        <button className="input-buttons swap-button" onClick={props.onSwapButton}>&#60;&#62;</button>
    )
}

export default SwapButton;