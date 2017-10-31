require('dotenv').config(); 
const sha1 = require('sha1');
const superagent = require('superagent');


/* 
this does not work at this point. 
Leaving this for later
*/


 const cloudName = process.env.cloudName;
 const uploadPreset = process.env.uploadPreset;
 const api_key = process.env.api_key;

const imageSender2 = image => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const timestamp = Date.now()/1000
  const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}-MtjkttbQ3j-XPtL4VwET44kzCk`
  const signature = sha1(paramsStr)
  const params = {
    'api_key': api_key,
    'timestamp': timestamp,
    'upload_preset': uploadPreset,
    'signature': signature
  }
  let uploadRequest = superagent.post(url)
  uploadRequest.attach('file', image)
  Object.keys(params).forEach((key) => uploadRequest.field(key, params[key]))
  uploadRequest.end((err, res) => {
    console.log(`upload complete:${JSON.stringify(res.body)}`)
    const uploaded = JSON.stringify(res.body.url)
  })
}

const imageSender = (req,res,next) => {
  const image = req.body.image
  console.log(req)
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const timestamp = Date.now()/1000
  const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}-MtjkttbQ3j-XPtL4VwET44kzCk`
  const signature = sha1(paramsStr)
  const params = {
    'api_key': api_key,
    'timestamp': timestamp,
    'upload_preset': uploadPreset,
    'signature': signature
  }
  let uploadRequest = superagent.post(url)
  uploadRequest.attach('file', image)
  Object.keys(params).forEach((key) => uploadRequest.field(key, params[key]))
  uploadRequest.end((err, res) => {
    console.log(`upload complete:${JSON.stringify(res.body)}`)
    res.uploaded = JSON.stringify(res.body.url)
    next()
  })
  
}

module.exports = imageSender;
