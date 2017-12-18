import React from 'react';

const RenderForm = ( { handleChange, Title, Description, URL, hideForm, handleSubmit, cancel=true} ) => (
    <div className="edit-link-box">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    className="form-control"
                    placeholder="Project Title"
                    name="Title"
                    value={Title}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input
                    className="form-control"
                    placeholder="Project Description"
                    name="Description"
                    value={Description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Link to Project</label>
                <input
                    className="form-control"
                    placeholder="Project URL"
                    name="URL"
                    value={URL}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <button
                    className="btn btn-sm btn-success btn-block"
                    onClick={handleSubmit}>
                    Save
                </button>
                {cancel&&<button
                    className="btn btn-sm btn-link btn-block"
                    onClick={hideForm}>
                    Cancel
                </button>}
            </div>
        </form>
    </div>
);


export default RenderForm;
