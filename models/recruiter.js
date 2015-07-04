var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var objId = Schema.ObjectId;

 var recruiterSchema = new Schema({
     name: String,
     employees_count: Number,
     address: String
 });

module.exports = mongoose.model('recruiter', recruiterSchema);
