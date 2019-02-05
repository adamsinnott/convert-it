import React from "react";

const EntryText = (props) => {
    return (
        <span>
            <input id="entry" onFocus={props.onInputFocus} onBlur={props.onInputBlur} value={props.entryText} ref={props.entryTextRef} onChange={(event) => props.onEntryTextChange(event.target.value)}></input>
        </span>
    )
}

export default EntryText;