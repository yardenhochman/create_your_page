import React, { Component } from 'react';
import RenderForm from './RenderForm';

class NewLinkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: '',
            Description: '',
            URL: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        event.preventDefault();
        let inputName = event.target.name;
        let value = event.target.value;
        this.setState({ [inputName]: value })
    }
    handleSubmit(event) {
        event.preventDefault();
        const updateLinks = this.props.updateLinks;

        let newLink = {
            Title: this.state.Title,
            Description: this.state.Description,
            URL: this.state.URL
        }
        updateLinks(newLink, this.props.key)
        this.setState( { Title: '', Description: '', URL: ''} );
        this.props.hideForm()
    }
    renderButton() {
        return (
            <button className="btn btn-sm btn-block btn-primary" onClick={this.props.displayForm}>
                Add a new Link
            </button>
        );
    }
    render() {
        let content;
        if (this.props.showForm)
            return <RenderForm 
                handleChange={this.handleChange} 
                Title={this.state.Title} 
                Description={this.state.Description} 
                URL={this.state.URL} 
                hideForm={this.props.hideForm} 
                handleSubmit={this.handleSubmit}
            />;
        else
            return this.renderButton();
    }
}

export default NewLinkForm;
