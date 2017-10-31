import React from 'react';
import pictureTaking from './pickPicture';
import Links from './links';
import { Link } from 'react-router-dom';

const {PickPicture, Pics} = pictureTaking;

const Step = {}
Step.PickPicture = PickPicture;
Step.TypeInfo = {}
Step.TypeInfo.Pics = Pics;
Step.TypeInfo.Links = Links;

Step.ProvideName = ({InputStep,name,occupation,done}) => (
  <div className="box">
    <div className="set">
        <div className="question-container">
          <h3 className="question">Name:</h3>
        </div>
        <input type="text" name="name" onChange = {InputStep} value={name}></input>
    </div>
    <div className="set">
      <div className="question-container">
        <h3 className="question">Occupation:</h3>
      </div>
    <input type="text" name="occupation" onChange = {InputStep} value={occupation}></input>
    </div>
    <button onClick={name&&occupation&&done}>OK</button>
  </div>
)

Step.Description = ({InputStep,BackStep,description,done}) => (
  <div>
    <h3>A small message from you to the site's visitors. This will be shown next to your profile picture.</h3>
    <textarea type="text" className="qdescription" name="description" onChange = {InputStep} value={description} rows="5" cols="20"></textarea>
    <div className="box">
      <button className='back_button' onClick={BackStep}>Back</button>
      <button onClick={description&&done}>OK</button>
    </div>
  </div>
)
Step.ProvideSM = ({InputStep,sm,done,BackStep}) => (
  <div>
    <h3>Provide your profile names for any of the following websites:</h3>
    
    <form onSubmit={sm?done:''}>
      <div className="box">
        <div className="set">
          <div className="question-container">
            <h3 className="question">LinkedIn</h3>
          </div>
          <input type="text" name="linkedin" onChange={InputStep} value={sm.linkedin}></input>
        </div>
        <div className="set">
          <div className="question-container">
            <h3 className="question">Facebook</h3>
          </div>
          <input type="text" name="facebook" onChange={InputStep} value={sm.facebook}></input>
        </div>
        <div className="set">
          <div className="question-container">
            <h3 className="question">Twitter</h3>
          </div>
          <input type="text" name="twitter" onChange={InputStep} value={sm.twitter}></input>
        </div>
        <div className="set">
          <div className="question-container">
            <h3 className="question">Instagram</h3>
          </div>
          <input type="text" name="instagram" onChange={InputStep} value={sm.instagram}></input>
        </div>
        <button className='back_button' onClick={BackStep}>Back</button>
        <input type="submit" value="OK"/>
    </div>
    </form>
  </div>
)
Step.PickType = ({InputStep,BackStep}) => (
  <div>
    <h3>What would you rather display, more pictures of yours or links to works of yours?</h3>
    <button id='pickPictures' name='profile_type' value='pictures' onClick={InputStep}>Pictures</button>
    <button id='picklinks' name='profile_type' value='links' onClick={InputStep}>links</button>
    <button className='back_button' onClick={BackStep}>Back</button>
  </div>
)
Step.PickPW = ({InputStep,BackStep,password,done}) => (
  <div>
    <form onSubmit={done}>
      <div className="box">
        <div className="set">
          <div className="question-container">
            <h3>Email</h3>
          </div>
        <input type="email" name="email" className="hello" onChange = {InputStep} required></input>
        </div>
        <div className="set">
          <div className="question-container">
            <h3>Password</h3>
          </div>
          <input type="password" name="password" onChange={InputStep} value={password} required /> 
        </div>
      </div>
      <div className="box">
        <button className='back_button' onClick={BackStep}>Back</button>
        <input type="submit" value="OK"/>
      </div>
    </form>
     
  </div>
)
Step.Prepare = () => (
  <div>
    <h3>Loading...</h3>    
  </div>
)
Step.Error = () => (
  <div>
    <h3>Something went wrong. Would you like to start over?</h3>  
    <Link to="/setup">Setup your Page</Link>
  </div>
)



export default Step;

/* 
TODO:

add a progress bar


*/
