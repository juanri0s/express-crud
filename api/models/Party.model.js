const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostPartySchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name'
  },
  partySize: {
    type : Number,
  },
  mobileNumber: {
    type: String,
    required: 'Enter a valid mobile number'
  }
});


PostPartySchema.methods.name = (first_name) => {
    this.firstName = first_name;
    return this.save();
}

PostPartySchema.methods.party = (party_size) => {
  this.partySize = party_size;
  return this.save();
}

PostPartySchema.methods.number = (mobile_number) => {
  this.mobileNumber = mobile_number;
  return this.save();
}

const Party = mongoose.model('Party', PostPartySchema);

module.exports = Party;
