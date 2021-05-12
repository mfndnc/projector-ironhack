const router = require('express').Router();
const Sample = require('../models/Sample');

router.post('/', (req, res, next) => {
  const { title, description } = req.body;
  Sample.create({
    title,
    description,
  })
    .then((sample) => {
      res.status(201).json(sample);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/', (req, res, next) => {
  Sample.find()
    .then((samples) => {
      res.status(200).json(samples);
    })
    .catch((err) => res.json(err));
});

router.get('/:id', (req, res, next) => {
  Sample.findById(req.params.id).then((sample) => {
    if (!sample) {
      res.status(404).json(sample);
    } else {
      res.status(200).json(sample);
    }
  });
});

router.put('/:id', (req, res, next) => {
  const { title, description } = req.body;
  Sample.findByIdAndUpdate(
    req.params.id,
    { title, description },
    // if the return value of the mongoose should be the updated document you need to add this
    { new: true }
  )
    .then((sample) => {
      res.status(200).json(sample);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Sample.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ message: 'sample deleted' });
  });
});

module.exports = router;
