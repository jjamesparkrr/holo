const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./rentalRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/api', postRoutes);
router.use('/api', commentRoutes);

module.exports = router;
