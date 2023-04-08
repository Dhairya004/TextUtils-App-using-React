import React, {useState} from 'react'


export default function TextForm(props) {

    const convertCase = (event)=>{
        if(event.currentTarget.id==='up') {
            setText(text.toUpperCase());
            props.showAlert("Converted to uppercase!", "success");
        }

        else if(event.currentTarget.id==='low') {
            setText(text.toLowerCase());
            props.showAlert("Converted to lowercase!", "success");
        }

        else if(event.currentTarget.id==='clear') {
            setText('');
            props.showAlert("Text Cleared!", "success");
        }

        else if(event.currentTarget.id==='copy') {
            navigator.clipboard.writeText(text); 
            props.showAlert("Copied to Clipboard!", "success");
        }

        else if(event.currentTarget.id==='extra') {
            let newText = text.split(/[ ]+/);
            setText(newText.join(" "));
            props.showAlert("Extra spaces removed!", "success");
        }

        else if(event.currentTarget.id==='sentence') {
            const regex = /\.\s+[a-z]/g;

            var modifiedText = text.replace(regex, function(match) {
                return ". "+match[match.length-1].toUpperCase();
            });

            setText(modifiedText);
        }
    }

    const handleOnChange = (event) => {
        setText(event.target.value) 
    }

    const [text, setText] = useState(''); 
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button id="up" disabled={text.length===0} className="btn btn-dark mx-1 my-1" style={{width: '150px'}} onClick={convertCase}>Uppercase</button>

                <button id="low" disabled={text.length===0} className="btn btn-light mx-1 my-1" style={{width: '150px'}} onClick={convertCase}>Lowercase</button>

                <button id="clear" disabled={text.length===0} className="btn btn-dark mx-1 my-1" style={{width: '150px'}} onClick={convertCase}>Clear Text</button>

                <button id="copy" disabled={text.length===0} className="btn btn-light mx-1 my-1" style={{width: '150px'}} onClick={convertCase}>Copy Text</button>

                <button id="extra" disabled={text.length===0} className="btn btn-dark mx-1 my-1" style={{width: '150px'}} onClick={convertCase}>Remove Extra Spaces</button>
                
                <button id="sentence" disabled={text.length===0} className="btn btn-light mx-1 my-1" onClick={convertCase}>Sentence Case</button>
            </div>
        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
        </div>
        </>
    )
}