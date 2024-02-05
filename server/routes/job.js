const express = require('express');
const JobPost = require('../models/jobs');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// Create Job Post API
router.post('/job-posts', requireAuth, async (req, res) => {
  const {  companyName,
    logoURL,
    position,
    salary,
    jobType,
    remote,
    location,
    description,
    skillsRequired,
    about } = req.body;
  const recruiterName = req.body.name;
    console.log(req.body)
   let skillsArray = skillsRequired;
  if (typeof skillsRequired === 'string') {
    skillsArray = skillsRequired.split(',').map(skillsRequired => skillsRequired.trim());
  }

  
  try {
    const jobPost = new JobPost({
     companyName,
    logoURL,
    position,
    salary,
    jobType,
    remote,
    location,
    description,
    about,
    skillsRequired: skillsArray,
      recruiterName
    });

    await jobPost.save();

    return res.json({ message: 'Job post created successfully', name:recruiterName });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit Job Post API
router.put('/job-posts/:id', requireAuth, async (req, res) => {
  const jobId = req.params.id;
  const { companyName, jobType, skillsRequired } = req.body;
  const recruiterName = req.body.name;

  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    jobPost.companyName = companyName;
    jobPost.jobType = jobType;
    jobPost.skillsRequired = skillsRequired;
    jobPost.recruiterName = recruiterName;

    await jobPost.save();

    return res.json({ message: 'Job post updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Get Job Posts with Filters API
router.get('/job-posts', async (req, res) => {
  const { jobType, skillsRequired } = req.query;

  try {
    let query = {};

    if (jobType) {
      query.jobType = jobType;
    }

    if (skillsRequired) {
      query.skillsRequired = { $in: skillsRequired.split('&') };
    }
    console.log(query)
    const jobPosts = await JobPost.find(query).sort({ createdAt: -1 });

    return res.json({ jobPosts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Job Post Detail API
router.get('/job-posts/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.json({ jobPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;