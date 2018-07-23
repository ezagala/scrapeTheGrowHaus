const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerID: {type: String, required: true},
  address: {type: String, required: true}, 
  city: {type: String, required: true}, 
  state: {type: String, required: true},
  zip: {type: Number, required: true}, 
  children: { type: String}, 
  adults: {type: String},  
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;  