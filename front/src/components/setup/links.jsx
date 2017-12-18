import React, { Component } from 'react';
import NewLinkForm from './links/NewLinkForm';
import LinkList from './links/LinkList';

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links:[],
      showForm:false
    }
    this.updateLinks = this.updateLinks.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }
  displayForm(event=0) {
    event &&event.preventDefault();
    this.setState({ showForm: true });
  }
  hideForm(event=0) {
    event&&event.preventDefault();
    this.setState({ showForm: false });
  }

  updateLinks(link, id = -1, action = 'create') {
    const links = this.state.links;
    switch (action) {
      case 'create':
        links.push(link);
        break;
      case 'update':
        links[id] = link;
        break;
      case 'delete':
        delete links[id]
        break;
      default:
        console.log('here')
    }
    this.setState( {links: links} )
  }
  
  render() {
    const {sendLinks, BackStep, done} = this.props
    return (
      <div className="App container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <NewLinkForm 
              updateLinks={this.updateLinks} 
              displayForm={this.displayForm} 
              hideForm={this.hideForm} 
              showForm={this.state.showForm} 
            />
          </div>
          {!this.state.showForm&&<div>
            <h2 className="text-center">Your Project List</h2>
            <LinkList 
              links={this.state.links} 
              updateLinks={this.updateLinks} 
            />
          
          <div className="box">
            <button id='sendImage' name='profile_pic' onClick={done}>OK</button>
            <button className='back_button' onClick={BackStep}>Back</button>
          </div>
          </div>}
        </div>
      </div>
    );
  }

}
export default Links;



/*   submitLink(event) {
    event.preventDefault()
    const title = event.target.title.value;
    const description = event.target.description.value;
    const url = event.target.url.value;
    let linksList = [];
    this.state.links&&(linksList = this.state.links); //just being fancy. This is akin to a if statement, on the left, do right.
    let link = {}
    link.title = title;
    link.description = description;
    link.url = url;
    linksList.push(link);
    this.setState({links: linksList})
  } */
/*   renderList() {
    if (!this.state.links)
      return
    return this.state.links.map( (link,i) => 
    <li key={link.title + i}>{link.title}
      <img src={link.url} className="profileImage Preview" />
    </li> )
  } */






/* 

http://free.pagepeeker.com/v2/thumbs.php?size=x&url=http://google.com

*/