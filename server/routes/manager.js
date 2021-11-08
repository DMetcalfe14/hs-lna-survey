const router = require('express').Router();
let Manager = require('../models/manager');

router.route('/').get((req, res) => {
    Manager.find().populate('roles')
        .then(managers => res.json(managers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
    const payroll = req.body.payroll;
    const roles = req.body.roles;

    const manager = new Manager({
        payroll,
        roles
    });

    manager.save()
        .then(() => res.json('Manager created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Manager.findById(req.params.id)
        .then(manager => res.json(manager))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:payno').get((req, res) => {
    Manager.find({payroll: req.params.payno})
        .populate('roles')
        .then(manager => res.json(manager))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Manager.findByIdAndDelete(req.params.id)
        .then(manager => res.json('Manager deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Manager.findByIdAndUpdate(req.params.id, { $set: {
        payroll: req.body.payroll,
        roles: req.body.roles
    }})
        .then(() => res.json('Manager updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;