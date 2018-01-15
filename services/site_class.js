class SiteDetails {
  constructor({ name, profile_pic, profile_type, facebook, twitter, email, color1, color2, occupation, description, password, picture1, picture2, picture3 }) {
    this.name = name;
    this.profile_type = profile_type;
    this.profile_pic = profile_pic;
    this.facebook = facebook;
    this.linkedIn = linkedIn;
    this.twitter = twitter;
    this.email = email;
    this.color1 = color1;
    this.color2 = color2;
    this.occupation = occupation;
    this.description = description;
    this.password = this.encrypt(password);
    this.picture1 = picture1;
    this.picture2 = picture2;
    this.picture3 = picture3;
  }
  encrypt(pw) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(pw, salt);
  }
}

module.exports = siteDetails;
