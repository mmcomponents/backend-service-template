const express = require('express');
const {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
} = require('./permissionController');

const router = express.Router();

router.get('/', getPermissions);
router.post('/', createPermission);

router.get('/:id', getPermissionById);
router.patch('/:id', updatePermissionById);
router.delete('/:id', deletePermissionById);


module.exports = router;
