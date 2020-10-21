const permissionRepository = require('./permissionRepository');

async function getPermissions({ filters, pagination }) {
  try {
    pagination.count = await permissionRepository.countPermissions({ filters });
    const permissions = await permissionRepository.getPermissions({ filters, pagination });
    return {
      statusCode: 200,
      permissions,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: 'Internal server error',
    };
  }
}

async function getPermissionById(id) {
  try {
    const permission = await permissionRepository.getPermissionById(id);
    if (permission) {
      return { statusCode: 200, permission };
    }
    return { statusCode: 404 };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: 'Internal server error',
    };
  }
}

async function createPermission({
  name, slug, description, enabled,
}) {
  try {
    const permission = await permissionRepository.createPermission({
      name, slug, description, enabled,
    });
    return { statusCode: 201, permission };
  } catch (e) {
    return {
      statusCode: 500,
      message: e.message,
    };
  }
}

async function updatePermissionById(id, options) {
  try {
    const permission = await permissionRepository.updatePermissionById(id, options);
    return { statusCode: 200, permission };
  } catch (e) {
    return {
      statusCode: 500,
      message: e.message,
    };
  }
}

async function deletePermissionById(id, options) {
  try {
    await permissionRepository.deletePermissionById(id, options);
    return { statusCode: 204 };
  } catch (e) {
    return {
      statusCode: 500,
      message: e.message,
    };
  }
}

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
};
