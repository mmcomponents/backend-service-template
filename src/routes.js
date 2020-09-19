const express = require('express');
const modules = require('./modules');

const router = express.Router();

/* GET Status Health Check. */
router.get('/status', (req, res) => {
  res.status(200).json({ name: 'gateway-service' });
});

modules.forEach(module => {
  router.use(`/${module.path}`, module.router)
});

module.exports = router;
