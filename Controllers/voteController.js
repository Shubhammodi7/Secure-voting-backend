const Candidate = require('../models/candidate.model');
const userModel = require('../models/user.model');

const castVote = async (req, res) => {
  try{
    const userId = req.user.id;
    const user = await userModel.findById(userId);


    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);

    if(!user){
      return res.status(403).json({
        message: "You are not logged-in to cast a vote"
      })
    }


    if(!candidate){
      return res.status(403).json({
        message: "Invalid candidate Id"
      })
    }

    if(user.role === 'admin'){
      return res.status(401).json({
        message: "Admin is not allowed to cast a vote"
      })
    }

    if(user.isVoted || user.voteCount > 0) {
      return res.status(404).json({
        message: "You already voted, One Person One Vote!"
      })
    }

    candidate.votes.push({user: userId});
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();


    console.log("Successfully casted your vote");
    res.status(200).json({
      message: "You successfully voted, Congrats!"
    })

  }
  catch(err){
    console.log("Error while voting", err);
    return res.status(400).json({error: "Error occurred"});
  }
}

const getCount = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({voteCount: -1});

  const voteRecord = candidates.map((data) => {
    return {
      name: data.name,
      party: data.party,
      count: data.voteCount
    }
  });

  return res.status(200).json({voteRecord});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error"
    })
  }
}

const getAllCandidates = async(req, res) => {
  try {
    const candidates = await Candidate.find({}, 'name party age_id');

    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {castVote, getCount, getAllCandidates};