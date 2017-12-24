import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import sha1 from 'sha1';
import superagent from 'superagent'
import axios from 'axios';

import Steps from './setup/steps';

String.prototype.capitalize = function() { return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase() }) }; //taken from stackOverflow

let demo = {
      description: "I love coding",
      facebook: "facebook profile name",
      instagram: "instagram profile name",
      twitter: "twitter profile name",
      linkedin: "linkedin profile name",
      occupation: "Mastering the abyss of existance.",
      email: "filledThatOutForYa@email.com",
      name: "demo",
      profile_type: "fds"
    }
let picture = {}
  picture.picture="hello"

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      step: 1,
      picture: null,
      fireRedirect: false
    }
    this.QuestionStep = this.QuestionStep.bind(this)
    this.InputStep = this.InputStep.bind(this)
    this.NextStep = this.NextStep.bind(this)
    this.imageHandler = this.imageHandler.bind(this)
    this.profilePicture = this.profilePicture.bind(this)
    this.BackStep = this.BackStep.bind(this)
    this.set1 = this.set1.bind(this)
    this.set2 = this.set2.bind(this)
    this.set3 = this.set3.bind(this)
    this.LastStep = this.LastStep.bind(this)
    this.sendLinks = this.sendLinks.bind(this)
  }
  imageHandler(files,property){ //learned and borrowed some code from here: https://codepen.io/hartzis/pen/VvNGZP?editors=1010 
    const image = files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let pictureObject = {};
      pictureObject[property] = {}
      if (this.state.picture)
        pictureObject = this.state.picture;
      pictureObject[property].Image = image;
      pictureObject[property].url = reader.result;
      this.setState({picture: pictureObject}); 
    }//stores the latest provided image url in this.picture.recent, and the image in this.picture.recentImage
    reader.readAsDataURL(image)
  }
  profilePicture(files){
    this.imageHandler(files,"profile_pic")
  }
  set1(files){
    this.imageHandler(files,"picture1")
  }
  set2(files){
    this.imageHandler(files,"picture2")
  }
  set3(files){
    this.imageHandler(files,"picture3")
  }
  getThumbnails(links) {
    if (!links.length)
      return this.setupDone()
    axios.get(`http://free.pagepeeker.com/v2/thumbs.php?size=x&url=${links[0].url}`)
    .then(res => {
      console.log(res)
      let userInfo = this.state.userInfo; 
      let index = this.state.links.length-links.length;
      userInfo.links[index].thumbnail = res
      this.setState({userInfo: userInfo})
      links.shift();
      return this.getThumbnails(links)
    })
  }
  sendLinks(links) {
    console.log(links)
    let userInfo = this.state.userInfo;
    userInfo.links = links;
    this.getThumbnails(links)
  }
  sendPictures(images,names) {
    if (!images.length)
      return this.setupDone()
    else {
      if (!images[0].Image) {
        images.shift()
        names.shift()
        return this.sendPictures(images,names)
      }
        
    }
    const key = names[0];
    const uploadPreset = 'kphturhe'
    const api_key = '396769864749733';
    const cloudName = 'dz2nxhscn';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const timestamp = Date.now()/1000;
    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}-MtjkttbQ3j-XPtL4VwET44kzCk`;
    const signature = sha1(paramsStr);
    const params = {
      'api_key': api_key,
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }
    const uploadRequest = superagent.post(url);
    //consider placing in backend
    uploadRequest.attach('file', images[0].Image)
    Object.keys(params).forEach((key) => uploadRequest.field(key, params[key]))
    uploadRequest.end((err, res) => {
      if (err)
        return console.log(err)
      let userInfo = this.state.userInfo
      userInfo[key] = res.body.url;
      this.setState({userInfo: userInfo})
      images.shift();
      names.shift();
      this.sendPictures(images,names)
    })
  }
  setupDone() {
    axios({
    method: 'POST',
    url: 'http://localhost:3002/create/1',
    data: this.state.userInfo
    }).then( res => this.setState( {fireRedirect: true} ) )
      .catch( res => this.setState( {step: 0} ) )
  }
  LastStep() {
    //send & save the picture's url
    const picture = this.state.picture
    const pictureList = [picture.profile_pic,picture.picture1,picture.picture2,picture.picture3]
    const names = ["profile_pic","picture1","picture2","picture3"]
    //this.cleanUp(pictureList,names) removes any empty objects and their corresponding names
    this.sendPictures(pictureList,names) 


    let newStep = this.state.step;
    newStep++;
    this.setState({step: newStep})
  }
  NextStep() {
    let newStep = this.state.step;
    newStep++;
    this.setState({step: newStep})
  }
  BackStep() {
    let newStep = this.state.step;
    newStep--;
    this.setState({step: newStep})
  }
  InputStep(event) {
    event.preventDefault()
    let userObject = {}
    this.state.userInfo?userObject=this.state.userInfo:''
    const step = this.state.step;
    let property = event.target.name;
    let userInput = event.target.value;
    let picture = this.state.picture;
    if (step === 1 && !(userInput.match(/^[a-zA-Z" "]*$/)))
      return 
    else {
      switch (step) {
        case 1:
          userInput = userInput.capitalize();
          break;
        case 2://choose picture
          if (!picture)
            return
          property = 'profile_pic'
          userInput = 'ready'
          this.NextStep()
          break;
        case 5:
          if (!picture.picture1) 
            picture.picture1 = {};
          if (!picture.picture2)
            picture.picture2 = {};
          if (!picture.picture3)
            picture.picture3 = {};
          this.setState({picture:picture})
          this.NextStep()
          break;
      }
      userObject[property] = userInput;
      this.setState({userInfo: userObject})
      }
    }

  QuestionStep() {
    const {ProvideName,PickPicture,Description,ProvideSM,PickType,TypeInfo:{Pics,Links},PickPW,Prepare,Error} = Steps
    const userInfo = this.state.userInfo
    const step = this.state.step
    switch (step) {
      case 0:
        return <Error />
      case 1:
        return <ProvideName InputStep={this.InputStep} name={userInfo?userInfo.name:""} occupation={userInfo?userInfo.occupation:""} done = {this.NextStep}/>
      case 2:
        const {name,occupation} = this.state.userInfo
        return <PickPicture InputStep={this.InputStep} BackStep={this.BackStep} name={name} profilePicture={this.profilePicture} picture={this.state.picture?this.state.picture.profile_pic:''}/>
      case 3:
        return <Description InputStep={this.InputStep} BackStep={this.BackStep} description={userInfo.description||''} done = {this.NextStep} />
      case 4:
        let sm = {};
        sm.facebook = this.state.userInfo.facebook||""
        sm.instagram = this.state.userInfo.instagram||""
        sm.linkedin = this.state.userInfo.linkedin||""
        sm.twitter = this.state.userInfo.twitter||""
        return <ProvideSM InputStep={this.InputStep} sm={sm} done={this.NextStep} BackStep={this.BackStep}/>
      case 5:
        return <PickType InputStep={this.InputStep} BackStep={this.BackStep} />
      case 6:
        const picGallery = {};
        picGallery.set1 = this.set1;
        picGallery.set2 = this.set2;
        picGallery.set3 = this.set3;
        picGallery.pic1 = this.state.picture.picture1
        picGallery.pic2 = this.state.picture.picture2
        picGallery.pic3 = this.state.picture.picture3
        if (!this.state.picture) { //for testing purposes
          let picture = {}
          this.setState({picture:picture})
        }
        if (userInfo.profile_type === "pictures")
          return <Pics InputStep={this.InputStep} BackStep={this.BackStep} picGallery={picGallery} done={this.NextStep}/> //will add a conditional here
        return <Links sendLinks={this.sendLinks} BackStep={this.BackStep} />
      case 7:
        return <PickPW InputStep={this.InputStep} BackStep={this.BackStep} done={this.LastStep} />
      case 8:
        return <Prepare />

    } 
  }
  render() {

    return (
      <div className="setup">
        <h2>{`Let's get this page up! You're at step ${this.state.step}/7`}</h2>
          {this.QuestionStep()}
          {this.state.fireRedirect? <Redirect push to={`/site/${this.state.userInfo.name}`} />:''}
      </div>
    )
  }
}

export default Setup;

/* 
Todo

-retreive existing website name list to ensure name isn't taken


concept:
all information will be stored in the state,
each question is a seperate component displayed, one at a time
the component will update the state via a function passed down to it.

Bonus:
add a progress bar
maybe ask: what is your favorite thing about yourself?

*/