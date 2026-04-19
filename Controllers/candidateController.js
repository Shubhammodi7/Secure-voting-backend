const Candidate = require('../models/candidate.model');
const userModel = require('../models/user.model');

const addCandidate = async (req, res) => {
  try {

    const data = req.body;
    
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();

    console.log("Data saved");
    res.status(200).json({
      response: response
    })

  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ error: 'Failed to add candidate' });
  }
}

const updateCandidate = async(req, res) => {
  try {
    const candidateId = req.params.id;
    const updatedCandidate = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updatedCandidate,
      { new: true }
    );

    if(!response) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Failed to update candidate' });
  }
};


const deleteCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;

    const response = await Candidate.findByIdAndDelete(candidateId);

    if(!response){
      res.status(404).json({
        message: "Candidate not found"
      })
    }

    console.log("Candidate Deleted");
    return res.status(200).json({
      message: "Candidate deleted successfully"
    });

  } catch (error) {
    console.log("Error deleting the candidate");
    res.status(500).json({
      message: "Internal server errro"
    })
  }
}


module.exports = {addCandidate, updateCandidate, deleteCandidate};