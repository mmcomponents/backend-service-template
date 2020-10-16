const permission = require('./model');

const FIELDS = 'name slug description enabled deleted id createdAt updatedAt';

class Permission {
  constructor(model) {
    this.model = model;
  }

  exists(filters) {
    return this.model.exists(filters);
  }

  count({filters = {}}) {
    return new Promise((resolve, reject) => {
      this.model.countDocuments(filters, (err, count) => (err ? reject(err) : resolve(count)));
    });
  }

  find({ filters, pagination }) {
    return new Promise((resolve, reject) => {
      this.model.find(filters, FIELDS, {
        sort: pagination.getSortConfiguration(),
        skip: pagination.getQuerySkip(),
        limit: pagination.getQueryLimit(),
      }, (error, documents) => {
        error ? reject(error) : resolve(documents);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.model.findById(id, (error, document) => (error ? reject(error) : resolve(document)));
    });
  }

  create(args) {
    const model = new this.model(args);
    return new Promise((resolve, reject) => {
      model.save((error, document) => (error ? reject(error) : resolve(document)));
    });
  }

  updateDocumentById(id, options) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, options, {
        new: true,
      }, (error, object) => (error ? reject(error) : resolve(object)));
    });
  }

  deleteDocumentById(id) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, { deleted: true }, {
        new: true,
      }, (error, object) => (error ? reject(error) : resolve(object)));
    });
  }
}

module.exports = new Permission(permission);
