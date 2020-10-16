const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require('./../helper/buypackHelper');

const UserController = require('./../controllers/users');

router.route('/buypack')
    .post( validateBody( schemas.authSchema ), UserController.buypack );

module.exports = router;