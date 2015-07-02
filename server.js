var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Recruiter = require('./models/recruiter');
var Candidate = require('./models/candidates');

var server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

var db_url = 'mongodb://localhost:27017/company-app';

mongoose.connect(db_url, function(err, conn) {
    if(err) {
        console.log('Error while connecting to Mongoose : ' + err);
    }
});

server.post('/addRecruiter', bodyParser(), function(req, res){
    var recruiter = new Recruiter({
        name: req.body.name
    });

    recruiter.save(function(err){
        if (!err) {
            console.log("200 OK");
            res.send(recruiter);
        }
    });
});

server.post('/candidate', bodyParser(), function(req, res){
    var candidate = new Candidate({
        first: req.body.first,
        last: req.body.last,
        assigned: req.body.assigned,
        assignedTo: req.body.assignedTo
    });

    candidate.save(function(err){
        if(!err) {
            console.log('200 OK');
            res.send(candidate);
        }
    });
});

server.get('/candidate/:id', bodyParser(), function(req, res) {
    var candidate_id = req.params.id;
    console.log(candidate_id);

    Candidate.findOne({_id: candidate_id}).exec(function(err, candidate) {
        if(candidate) {
            res.send(candidate);
        } else {
            res.status(500).send("Something went wrong");
        }
    })
});

server.get('/candidates', function(req, res) {
    Candidate.find().exec(function(err, candidates){
        if(candidates) {
            res.send(candidates);
        } else {
            res.status(500).send("Something went wrong");
        }
    });
});

server.put('/candidate/:id', bodyParser(), function(req, res) {

    var candidate = new Candidate({
        first: req.body.first,
        last: req.body.last,
        assigned: req.body.assigned,
        assignedTo: req.body.assignedTo,
        assignedToRecruiterName: req.body.assignedToRecruiterName
    });

    candidate = candidate.toObject();
    delete candidate._id;

    Candidate.update({_id: req.body._id}, candidate, {upsert: true}, function(err, updated) {
        if(!err) {
            res.send(updated)
        } else {
            console.log(err);
        }
    });
});

server.get('/recruiters', function(req, res) {
    Recruiter.find().exec(function(err, recruiters) {
        if(recruiters) {
            res.send(recruiters);
        } else {
            res.status(500).send("Something went wrong");
        }
    });
});

server.get('/', function(req, res){
    res.status(200).send("OK");
    next();
});

var port = Number(process.env.PORT || 3000)

server.listen(port);
console.log('Server started ...');
