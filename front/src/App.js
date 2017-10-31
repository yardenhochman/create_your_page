import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Setup from './components/setup'; //user enters information to be stored on his profile
import findSite from './components/findSite'; //the user's information is used to generate a website. no auth required to view
import LoadSite from './components/display'; //the view with the current user's information
import Test from './components/test';
import destroy from './components/destroy';

const About = () => (
  <div className="about">
    <p className="about">
    It's 2017. All of us browse the web and have an online presence.<br/>
    Most of us however, lack a personal website that will allow us to reign over our online persona.
    With this website I hope to help you create, edit, and showcase a public page about yourself
    The setup process is quick and simple and aims to provide you with a simple, modern online card.<br/>
    </p>
  </div>
)

const Welcome = () => (
  <div className="nav">
    <Link to="/welcome/About" className="nav-button">About Us</Link><br/>
    <Link to="/welcome/setup" className="nav-button">Setup your Page</Link><br/>{/* 
    <Link to="/welcome/test" className="nav-button">Testing Grounds</Link><br/> */}
    <Link to="/site/kevin" className="nav-button">example</Link><br/>
    <Link to="/welcome/delete" className="nav-button">Remove a Website</Link><br/>
  </div>
)
const App = () => (  
  <div className="app">
    <Route exact path="/" component={Welcome}/>
    <Route path="/welcome" component={Welcome}/>
      <Route path="/welcome/about" component={About}/>
      <Route path="/welcome/findSite" component={findSite}/>
    <Route path="/about" component={About}/>
    <Route path="/welcome/setup" component={Setup}/>
    <Route path="/welcome/test" component={Test}/>
    <Route path="/site/:name" component={LoadSite}/>
    <Route path="/welcome/delete" component={destroy}/>
  </div>
)

export default App;

/* 
This page provides basic routing and simple components for the home page display

welcome:
the main page component. Welcomes the user and provides links to the apps different functionalities
  Links:
    1.about -->
    2.setup: will guide user through entering his data
    3.edit: will take the user to a login screen
    4.display: will generate a link to the user's page by name

About: 
loads on the same page, and shows a small description about this website and myself

pageLayout: 
allows for manipulation of the way a child component is displayed in relation to other elements 



*/