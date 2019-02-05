import React from "react";

const SecondarySelection = (props) => {
    return (
        <span>
            <select
                className="input-select"
                onChange={(event)=>props.onSelectionChange("secondarySelection", event.target.value)}
                value={props.secondarySelection}
                >
                {props.selectionCriteria.map((singleSelection, key) => (
                    <option key={key} value={singleSelection}>{singleSelection}</option>
                ))}
            </select>
        </span>
    )
}

export default SecondarySelection;