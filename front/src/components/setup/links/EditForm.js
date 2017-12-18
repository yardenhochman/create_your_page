import React, { Component } from 'react';
import RenderForm from './RenderForm';

const EditForm = ({ updateLinks, displayEditForm, link, linkId, cancelUpdate} ) => {
    
    const handleChange = (event) => {
        event.preventDefault();
        let Name = event.target.name;
        let value = event.target.value;
        let updatedLink = link;
        updatedLink[Name] = value;
        updateLinks(updatedLink, linkId, 'update')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        cancelUpdate();
    }
    const hideForm = (event) => {
        event.preventDefault();
        cancelUpdate();
    }
    return <RenderForm 
                handleChange={handleChange} 
                hideForm={hideForm}
                handleSubmit={handleSubmit}
                Title={link.Title} 
                Description={link.Description} 
                URL={link.URL} 
                cancel={false}
            />;
}

export default EditForm;