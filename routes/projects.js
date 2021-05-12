const router = require("express").Router();
const Project = require('../models/Project');

router.post('/', (req, res, next) => {
  const { title, description } = req.body;
  Project.create({
    title,
    description
  })
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.json(err);
    })
});


router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.json(err))
});

router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json(project);
      } else {
        res.status(200).json(project);
      }
    })
});

router.put('/:id', (req, res, next) => {
  const { title, description } = req.body;
  Project.findByIdAndUpdate(
    req.params.id,
    { title, description },
    // if the return value of the mongoose should be the updated document you need to add this
    { new: true }
  )
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => res.json(err));
});

router.delete('/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' });
    })
})

module.exports = router;