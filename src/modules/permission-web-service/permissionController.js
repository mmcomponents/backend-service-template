const Pagination = require('../../core/pagination');
const permissionService = require('./permissionService');

function getPermissionsFilters(req) {
  const filters = {};
  if (req.query.name) {
    filters.name = req.query.name;
  }
  if (req.query.slug) {
    filters.slug = req.query.slug;
  }
  if (req.query.enabled) {
    filters.enabled = req.query.enabled !== 'false';
  }
  return filters;
}

async function getPermissions(req, res) {
  const pagination = new Pagination(req);
  const filters = getPermissionsFilters(req);
  try {
    const {
      statusCode,
      permissions,
    } = await permissionService.getPermissions({ filters, pagination });
    res.status(statusCode).json({ permissions, pagination: pagination.toJSON() });
  } catch (error) {
    res.status(error.statusCode).json({ errorMessage: error.message });
  }
}

async function getPermissionById(req, res) {
  const { id } = req.params;
  try {
    const {
      permission,
      statusCode,
    } = await permissionService.getPermissionById(id);
    res.status(statusCode).json(permission);
  } catch (error) {
    res.status(error.statusCode).json({ errorMessage: error.message });
  }
}

async function createPermission(req, res) {
  try {
    const {
      name, slug, description, enabled,
    } = req.body;
    const { statusCode, permission } = await permissionService.createPermission({
      name, slug, description, enabled,
    });
    res.status(statusCode).json(permission);
  } catch (error) {
    res.status(error.statusCode).json({ errorMessage: error.message });
  }
}

async function updatePermissionById(req, res) {
  try {
    const { id } = req.params;
    const { statusCode, permission } = await permissionService.updatePermissionById(id, req.body);
    res.status(statusCode).json(permission);
  } catch (error) {
    res.status(error.statusCode).json({ errorMessage: error.message });
  }
}

async function deletePermissionById(req, res) {
  try {
    const { id } = req.params;
    const { statusCode } = await permissionService.deletePermissionById(id);
    res.status(statusCode).json();
  } catch (error) {
    res.status(error.statusCode).json({ errorMessage: error.message });
  }
}

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
};
