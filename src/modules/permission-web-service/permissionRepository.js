const Permission = require('../permission-model');

function normalizeDocument(document) {
  if (document) {
    const object = document.toObject();
    object.id = object._id;
    delete object._id;
    return object;
  }
  return document;
}

async function countPermissions({ filters }) {
  return Permission.count({filters});
}

async function getPermissions({ filters, pagination }) {
  return Permission.find({ filters, pagination }).then((permissions) => permissions.map(normalizeDocument));
}

async function createPermission({
  name, slug, description, enabled,
}) {
  return Permission.create({
    name, slug, description, enabled,
  }).then(normalizeDocument);
}

async function updatePermissionById(id, options) {
  return Permission.updateDocumentById(id, options).then(normalizeDocument);
}

async function deletePermissionById(id) {
  return Permission.deleteDocumentById(id);
}

async function getPermissionById(id) {
  return Permission.getById(id).then(normalizeDocument);
}

module.exports = {
  countPermissions,
  getPermissions,
  createPermission,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
