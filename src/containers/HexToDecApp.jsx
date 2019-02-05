import React from "react";
// import the components and containers used in the main app
import EntryText from "../components/entryText";
import PrimarySelection from "../components/primarySelection";
import SecondarySelection from "../components/secondarySelection";
import SwapButton from "../components/swapButton";
import SubmitButton from "../components/submitButton";
import OutputText from "../components/outputText";

class HexToDecApp extends React.Component {

    constructor(props) {
        super(props);
        // bind all the functions to this
        this.onKeyboardCommand=this.onKeyboardCommand.bind(this);
        this.onSelectionChange=this.onSelectionChange.bind(this);
        this.onEntryTextChange=this.onEntryTextChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.convert=this.convert.bind(this);
        this.convertToHex=this.convertToHex.bind(this);
        this.convertToDec=this.convertToDec.bind(this);
        this.convertToBin=this.convertToBin.bind(this);
        this.onSwapButton=this.onSwapButton.bind(this);
        this.swapState=this.swapState.bind(this);
        this.focusInputText=this.focusInputText.bind(this);

        // create a ref for the entryText
        this.entryTextRef = React.createRef();

        // create the starting state
        this.state = {
            primarySelection: "bin",
            secondarySelection: "dec",
            outputText: "0",
            entryText: "0",
            selectionCriteria: ["hex","dec","bin"]
        };
    };

    onEntryTextChange (v) {
        // create your regex pattern
        let rgxStr = '^[0-9a-f]{0,10}$'
        // initiate the regex object
        let rgx = new RegExp(rgxStr);
        // check if it matches 
        if (v.match(rgx)) {
            // set the state
            this.setState({entryText:v})
        }
    };

    onKeyboardCommand (event) {
        // create the index
        let index = 0;
        let changeStateTo = "";
        // if the key pressed is the one you want
        if ((event.key === 'k') || (event.key === 'K')) {
            // get the position in selectionCriteria array of the current selection
            index = this.state.selectionCriteria.indexOf(this.state.primarySelection)
            // increase the index
            index++
            // but reset the index if the end is reached
            if (index > (this.state.selectionCriteria.length-1)) {
                index = 0;
            }
            // get the new state from the array using the index
            changeStateTo=this.state.selectionCriteria[index]
            // now set the state
            this.setState({primarySelection:changeStateTo})
        }
        if ((event.key === 'l') || (event.key === 'L')) {
            // get the position in selectionCriteria array of the current selection
            index = this.state.selectionCriteria.indexOf(this.state.secondarySelection)
            // increase the index
            index++
            // but reset the index if the end is reached
            if (index > (this.state.selectionCriteria.length-1)) {
                index = 0;
            }
            // get the new state from the array using the index
            changeStateTo=this.state.selectionCriteria[index]
            // now set the state
            this.setState({secondarySelection:changeStateTo})
        }
        if ((event.key === 'x') || (event.key === 'X')) {
            this.swapState()
        }
        if ((event.key === 'i') || (event.key === 'I')) {
            this.focusInputText();
        }
        if ((event.key === 'r') || (event.key === 'R')) {
            this.setState({entryText: ""});
        }
        if (event.key === 'Enter') {
            this.onSubmit();
            this.focusInputText();
        }
    }

    focusInputText () {
        this.entryTextRef.current.focus()
    }

    swapState () {
        // swap the state of primary and secondary selections
        let primaryHolder = this.state.primarySelection;
        let secondaryHolder = this.state.secondarySelection;
        this.setState({primarySelection:secondaryHolder})
        this.setState({secondarySelection:primaryHolder})
    }
    onSelectionChange (propToChange, v) {
        // handle the change of both primary and secondary selections
        // check what selection and change the state to that passed in
        if (propToChange === "primarySelection")
            this.setState({primarySelection:v})   
        else if (propToChange === "secondarySelection")
            this.setState({secondarySelection:v})
        this.focusInputText();
    }

    // use a lifecycle method to add the event listener
    // only on mounting the component to prevent memory leaks
    componentDidMount(){
      document.addEventListener("keydown", this.onKeyboardCommand, false);
      this.focusInputText();
    }
    // when the component unmounts remove the event listener
    componentWillUnmount(){
      document.removeEventListener("keydown", this.onKeyboardCommand, false);
    }

    convert (value, primarySelection, secondarySelection) {
        var convertedValue = "";
        if ((secondarySelection === this.state.selectionCriteria[0])) {
            convertedValue = this.convertToHex(value, primarySelection);
        }
        else if ((secondarySelection === this.state.selectionCriteria[1])) {
            convertedValue = this.convertToDec(value, primarySelection);
        }
        else if ((secondarySelection === this.state.selectionCriteria[2])) {
            convertedValue = this.convertToBin(value, primarySelection);
        }
        this.setState({outputText:convertedValue})
    }

    convertToHex (value, primarySelection) {
        let convertedValue = "";
        if ((primarySelection === this.state.selectionCriteria[0])) {
            convertedValue = value;
        }
        else if ((primarySelection === this.state.selectionCriteria[1])) {
            convertedValue = parseInt(value, 10).toString(16);
        }
        else if ((primarySelection === this.state.selectionCriteria[2])) {
            convertedValue = parseInt(value, 2).toString(16);
        }
        return convertedValue;
    }

    convertToDec (value, primarySelection) {
        let convertedValue = "";
        if ((primarySelection === this.state.selectionCriteria[0])) {
            convertedValue = parseInt(value, 16).toString(10);
        }
        else if ((primarySelection === this.state.selectionCriteria[1])) {
            convertedValue = value;
        }
        else if ((primarySelection === this.state.selectionCriteria[2])) {
            convertedValue = parseInt(value, 2).toString(10);
        }
        return convertedValue;
    }

    convertToBin (value, primarySelection) {
        let convertedValue = "";
        if ((primarySelection === this.state.selectionCriteria[0])) {
            convertedValue = parseInt(value, 16).toString(2);
        }
        else if ((primarySelection === this.state.selectionCriteria[1])) {
            convertedValue = parseInt(value, 10).toString(2);
        }
        else if ((primarySelection === this.state.selectionCriteria[2])) {
            convertedValue = value;
        }
        return convertedValue;
    }

    onSubmit () {
        // hex dec bin
        let primarySelection = this.state.primarySelection;
        let secondarySelection = this.state.secondarySelection;
        var value = this.state.entryText;

        this.convert(value, primarySelection, secondarySelection)
        this.focusInputText();
    }

    onSwapButton () {
        this.swapState();
        this.focusInputText();
    }

    render () {
        return (
            <div id="app-wrapper">
                <div id="controls-text">
                    <p>
                        Controls:
                    </p>
                    <ul><li>i: highlight text box</li><li>k: cycle through primary selection</li><li>l: cycle through secondary selection</li><li>
                        enter: perform the calculation</li><li>r: reset
                    </li></ul>
                </div>
                <EntryText onInputFocus={this.onInputFocus} onInputBlur={this.onInputBlur} onEntryTextChange={this.onEntryTextChange} entryText={this.state.entryText} entryTextRef={this.entryTextRef}/>
                <PrimarySelection selectionCriteria={this.state.selectionCriteria} primarySelection={this.state.primarySelection} onSelectionChange={this.onSelectionChange}/>
                <SwapButton onSwapButton={this.onSwapButton}/>
                <SecondarySelection  selectionCriteria={this.state.selectionCriteria} secondarySelection={this.state.secondarySelection} onSelectionChange={this.onSelectionChange}/>
                <SubmitButton onSubmit={this.onSubmit} />
                <OutputText outputText={this.state.outputText} />
                <p>
                Work in progress, issues to be sorted:
                </p>
                <ul>
                <li>Validation of the input based on the selection</li>
                </ul>
            </div>
        )
    };
}

export default HexToDecApp;