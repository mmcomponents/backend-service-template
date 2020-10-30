const {
  OK,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
} = require('../../core/http-status-codes');
const { buildInternalServerErrorResponse } = require('../../core/helpers/response-builders/internalServerError');

const permissionRepository = require('./permissionRepository');

async function getPermissions({ filters, pagination }) {
  try {
    const [count, permissions] = await Promise.all([
      permissionRepository.countPermissions({ filters }),
      permissionRepository.getPermissions({ filters, pagination }),
    ]);
    pagination.setCount(count);
    return {
      statusCode: OK,
      permissions,
    };
  } catch (e) {
    return buildInternalServerErrorResponse(e);
  }
}

async function getPermissionById(id) {
  try {
    const permission = await permissionRepository.getPermissionById(id);
    if (permission) {
      return { statusCode: OK, permission };
    }
    return { statusCode: NOT_FOUND };
  } catch (e) {
    return buildInternalServerErrorResponse(e);
  }
}

async function createPermission({
  name, slug, description, enabled,
}) {
  try {
    const permission = await permissionRepository.createPermission({
      name, slug, description, enabled,
    });
    return { statusCode: CREATED, permission };
  } catch (e) {
    return buildInternalServerErrorResponse(e);
  }
}

async function updatePermissionById(id, options) {
  try {
    const permission = await permissionRepository.getPermissionById(id);
    if (!permission) {
      return { statusCode: NOT_FOUND };
    }
    const updatedPermission = await permissionRepository.updatePermissionById(id, options);
    return { statusCode: OK, permission: updatedPermission };
  } catch (e) {
    return buildInternalServerErrorResponse(e);
  }
}

async function deletePermissionById(id) {
  try {
    const permission = await permissionRepository.getPermissionById(id);
    if (!permission) {
      return { statusCode: NOT_FOUND };
    }
    await permissionRepository.deletePermissionById(id);
    return { statusCode: NO_CONTENT };
  } catch (e) {
    return buildInternalServerErrorResponse(e);
  }
}

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
};
