import React, { Component } from 'react';

export default class ProvideName extends Component {
    state = {
        
    }
    render = () => {
        const { InputStep, name, occupation, done, nameList } = this.props
        return (
            <div className="box">
                <div className="set">
                    <div className="question-container">
                        <h3 className="question">Name:</h3>
                    </div>
                    <input type="text" name="name" onChange={InputStep} value={name} />
                </div>
                <div className="set">
                    <div className="question-container">
                        <h3 className="question">Occupation:</h3>
                    </div>
                    <input
                        type="text"
                        name="occupation"
                        onChange={InputStep}
                        value={occupation}
                    />
                </div>
                <button onClick={name && nameList.indexOf(name)===-1 && occupation && done}>OK</button>
            </div>
        )
    }
}

/* 
TODO:

-make input logic local
-add redux logic

-Implement Errors:
    cannot have number in names
    name already exists

*/