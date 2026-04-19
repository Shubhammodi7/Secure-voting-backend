const express = require('express');
const route = express.Router();
const Candidate = require('../models/candidate.model')
const {jwtAuthMiddleware, generateToken, isAdmin} = require('../Middlewares/jwt');

const {castVote, getCount, getAllCandidates} = require('../Controllers/voteController')

route.post('/:candidateId', jwtAuthMiddleware, castVote);

route.get('/count', getCount);
route.get('/', getAllCandidates);

module.exports = route;