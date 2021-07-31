const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint???????????

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [Product],
  })
    .then(categories => {
      res.json(categories)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [Product]
  })
    .then(category => {
      res.json(category)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(category => {
      res.status(200).json(category)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  console.log('id', req.params.id);
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


module.exports = router;
