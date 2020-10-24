const Model = require('../../core/model');
const permission = require('./model');

const FIELDS = 'name slug description enabled deleted id createdAt updatedAt';

module.exports = new Model({ model: permission, fields: FIELDS });
