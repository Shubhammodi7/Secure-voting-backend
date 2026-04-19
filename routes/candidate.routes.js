const express = require('express');
const route = express.Router();
const Candidate = require('../models/candidate.model')
const {jwtAuthMiddleware, generateToken, isAdmin} = require('../Middlewares/jwt');

const {addCandidate, updateCandidate, deleteCandidate} = require('../Controllers/candidateController');


// admin can perform CRUD operations on candidates

// POST to add a candidate
route.post('/add', jwtAuthMiddleware, isAdmin, addCandidate);
route.put('/update/:id', jwtAuthMiddleware, isAdmin, updateCandidate);
route.delete('/delete/:id', jwtAuthMiddleware, isAdmin, deleteCandidate)



module.exports = route;