var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var objId = Schema.ObjectId;

 var recruiterSchema = new Schema({
     name: String
 });

module.exports = mongoose.model('recruiter', recruiterSchema);
