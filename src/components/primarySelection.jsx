import React from "react";

const PrimarySelection = (props) => {
    return (
        <span>
            <select
                className="input-select" 
                onChange={(event)=>props.onSelectionChange("primarySelection", event.target.value)}
                value={props.primarySelection}
                >
                {props.selectionCriteria.map((singleSelection, key) => (
                    <option key={key} value={singleSelection}>{singleSelection}</option>
                ))}
            </select>
        </span>
    )
}

export default PrimarySelection;