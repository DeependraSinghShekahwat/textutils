import React, { useState } from 'react';

export default function TextForm(props) {
    // Utility functions
    const removeEmptyStr = (arr) => {
        const newArr = [];
        arr.forEach(element => {
            if(element !== "") newArr.push(element);
        })
        return newArr;
    }

    const handleUpperClick = () => {
        const newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Text converted to UpperCase", "success")
    }
    const handleLowerClick = () => {
        const newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Text converted to LowerCase", "success")
    }
    const handleInverseClick = () => {
        const lowerCase = new RegExp(/[a-z]/g)
        const letter = new RegExp(/[a-zA-Z]/g)
        let newText = text.replace(letter, (match) => {
            if(match.match(lowerCase)) return match.toUpperCase();
            return match.toLowerCase();
        })
        setText(newText)
        props.showAlert("Text converted to InverseCase", "success")
    }
    const handleRemoveSpacesClick = () => {
        const formattedText = text.split(/[ ]+/).join(" ");
        setText(formattedText);
        props.showAlert("Extra spaces removed from text", "success")
    }
    const handleRemoveLinesClick = () => {
        const formattedText = removeEmptyStr(text.split("\n")).join("\n");
        setText(formattedText);
        props.showAlert("Extra lines removed from text", "success")
    }
    const handleClearClick = () => {
        setText("")
        props.showAlert("Text cleared", "success")
    }
    const handleOnChange = (e) => {
        setText(e.target.value)
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied", "success")
    }
    const [text, setText] = useState("");
    return (
        <>
            <div className='container' style={{color: props.mode === "light" ? "black" : "white"}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'light' ? 'white' : 'grey', color: props.mode === "light" ? "black" : "white"}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpperClick}>Convert to UpperCase</button>
                <button className="btn btn-primary mx-2" onClick={handleLowerClick}>Convert to LowerCase</button>
                <button className="btn btn-primary mx-2" onClick={handleInverseClick}>Convert to InverseCase</button>
                <button className="btn btn-primary mx-2" onClick={handleRemoveSpacesClick}>Remove extra spaces</button>
                <button className="btn btn-primary mx-2" onClick={handleRemoveLinesClick}>Remove empty lines</button>
                <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy text</button>
                <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear</button>
            </div>
            <div className="container my-3" style={{color: props.mode === "light" ? "black" : "white"}}>  
                <h1>Your text summary</h1>
                <p><b>{removeEmptyStr(text.split(" ")).length}</b> words <b>{text.length}</b> chars <b>{Array.from(text).reduce((spaceCount, val) => val === " "? spaceCount += 1 : spaceCount, 0)}</b> spaces <b>{!text.length ? 0 : text.split("\n").length}</b> lines</p>
                <p><b>{(0.0016 * text.length).toFixed(3)}</b> Minutes read</p>
                <h2>Preview</h2>
                <p style={{whiteSpace: 'pre-wrap'}}>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
            </div>
        </>
    )
}
