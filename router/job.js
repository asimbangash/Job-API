const express = require('express');
const router = express.Router();

const { getAllJobs, getJob, createJobs,updateJob,deleteJob } = require('../controllers/job');

router.route('/').post(createJobs).get(getAllJobs);
router.route("/id:").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;