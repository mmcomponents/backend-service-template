const { normalizeDocument } = require('../../core/helpers/normalize-document');
const Permission = require('../permission-model');

function countPermissions({ filters = {} }) {
  return Permission.count({ filters });
}

function getPermissions({ filters, pagination }) {
  return Permission.find({ filters, pagination })
    .then((permissions) => permissions.map(normalizeDocument));
}

function getPermissionById(id) {
  return Permission.getById(id).then(normalizeDocument);
}

function createPermission({
  name, slug, description, enabled,
}) {
  return Permission.create({
    name, slug, description, enabled,
  }).then(normalizeDocument);
}

function updatePermissionById(id, options) {
  return Permission.updateDocumentById(id, options).then(normalizeDocument);
}

function deletePermissionById(id) {
  return Permission.deleteDocumentById(id);
}


module.exports = {
  countPermissions,
  getPermissions,
  createPermission,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
