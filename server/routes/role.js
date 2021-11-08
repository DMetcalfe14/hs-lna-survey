const router = require('express').Router();
let Role = require('../models/role');

router.route('/').get((req, res) => {
    Role.find()
        .then(roles => res.json(roles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
    const name = req.body.name;

    const role = new Role({
        name
    });

    role.save()
        .then(() => res.json('Role created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Role.findById(req.params.id)
        .then(role => res.json(role))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Role.findByIdAndDelete(req.params.id)
        .then(role => res.json('Role deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Role.findByIdAndUpdate(req.params.id, { $set: {
        name: req.body.name
    }})
        .then(() => res.json('Role updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;