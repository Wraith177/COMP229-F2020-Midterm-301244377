const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', function(req, res, next) {
  Contact.find({}, 'name number email') // Retrieve name, number, and email fields
    .sort({ name: 1 }) // Sort contacts alphabetically by name
    .exec()
    .then(contacts => {
      res.render('contacts', { title: 'Contacts', contacts: contacts });
    })
    .catch(err => {
      next(err);
    });
});

// GET route for the update view
router.get('/:id/edit', function(req, res, next) {
  const contactId = req.params.id;
  Contact.findById(contactId)
    .then(function(contact) {
      res.render('update', { title: 'Update Contact', contact: contact });
    })
    .catch(function(err) {
      console.log(err);
      res.redirect('/contacts');
    });
});


// POST route to handle the update form submission
router.post('/:id/update', function(req, res, next) {
  const { name, number, email } = req.body;

  Contact.findByIdAndUpdate(req.params.id, { name, number, email })
    .then(updatedContact => {
      res.redirect('/contacts');
    })
    .catch(error => {
      next(error);
    });
});

// Handle contact deletion
router.post('/:id', function(req, res, next) {
  const contactId = req.params.id;

  Contact.findByIdAndRemove(contactId)
    .exec()
    .then(() => {
      res.redirect('/contacts');
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
