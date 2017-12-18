import React, { Component } from 'react';
import EditForm from './EditForm';

class LinkItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: props.link,
            displayEditForm: false
        };
        this.deleteLink = this.deleteLink.bind(this)
        this.updateLink = this.updateLink.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)
    }
    deleteLink() {
        this.props.updateLinks(0, this.props.linkId,'delete')
    }
    updateLink(event) {
        event.preventDefault();
        this.setState({ displayEditForm: true })
    }
    cancelUpdate() {
        this.setState({ displayEditForm: false })
    }

    renderForm() {
        const { displayEditForm } = this.state;
        const { link, linkId, updateLinks } = this.props
        return (
            <div className="new-link-box">
                <EditForm 
                    linkId={linkId} 
                    link={link} 
                    updateLinks={updateLinks} 
                    cancelUpdate={this.cancelUpdate}
                    displayEditForm={this.state.displayEditForm}
                />
            </div>
        )
    }
    chooseRender({ link, linkId, updateLinks }) {
        const { displayEditForm } = this.state;
        if (!displayEditForm) {
            return (
                <div className="link">
                    <h3>{link.Title}</h3>   
                    <p>{link.Description}</p>               
                    <button
                        onClick={this.updateLink}>
                        <span aria-hidden="true">Edit</span>
                    </button>
                    <button
                        onClick={this.deleteLink}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }
        return this.renderForm();
    }
    render() {
        return (
            <div>
                {this.chooseRender(this.props)}
            </div>
        )
    }
}
export default LinkItem;
