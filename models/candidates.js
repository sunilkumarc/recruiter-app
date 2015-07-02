var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var objId = Schema.ObjectId;

 var candidateSchema = new Schema({
     first: String,
     last: String,
     assigned: Number,
     assignedTo: objId,
     assignedToRecruiterName: String 
 });

module.exports = mongoose.model('candidates', candidateSchema);
