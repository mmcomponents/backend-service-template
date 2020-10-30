const {
  OK,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
} = require('../../core/http-status-codes');
const HttpError = require('../../core/http-error');
const {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
} = require('./permissionService');
const permissionRepository = require('./permissionRepository');

jest.mock('./permissionRepository');

function getIdMock() {
  return 'mock-id';
}

function getErrorMock() {
  return new HttpError(500, 'Internal server error');
}

function getCountMock() {
  return 10;
}

function getFiltersMock() {
  return {
    mockFilter: 'mock filter value',
  };
}

function getPaginationMock() {
  return {
    mockPagination: 'mock pagination',
    setCount: jest.fn(),
  };
}

function getPermissionMock() {
  return {
    id: 'mock-id',
    slug: 'mock-slug',
    name: 'mock-name',
    description: 'mock-description',
    enabled: true,
    deleted: false,
    createdAt: '2020-10-13T00:16:59.304Z',
    updatedAt: '2020-10-13T00:16:59.304Z',
  };
}

function getPermissionsMock() {
  return [getPermissionMock()];
}

describe('permissionService', () => {
  beforeEach(() => {
    permissionRepository.countPermissions.mockReset();
    permissionRepository.getPermissions.mockReset();
    permissionRepository.getPermissionById.mockReset();
    permissionRepository.createPermission.mockReset();
    permissionRepository.updatePermissionById.mockReset();
    permissionRepository.deletePermissionById.mockReset();
  });

  it('should get permission service', () => {
    expect(typeof getPermissions).toBe('function');
    expect(typeof getPermissionById).toBe('function');
    expect(typeof createPermission).toBe('function');
    expect(typeof updatePermissionById).toBe('function');
    expect(typeof deletePermissionById).toBe('function');
  });

  describe('getPermissions', () => {
    it('should count permissions with filters', async () => {
      permissionRepository.countPermissions.mockResolvedValue(getCountMock());
      permissionRepository.getPermissions.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      await getPermissions({ filters, pagination });

      expect(permissionRepository.countPermissions).toHaveBeenCalledTimes(1);
      expect(permissionRepository.countPermissions).toHaveBeenCalledWith({ filters });
    });

    it('should get permissions with filters and pagination', async () => {
      permissionRepository.countPermissions.mockResolvedValue(getCountMock());
      permissionRepository.getPermissions.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      await getPermissions({ filters, pagination });

      expect(permissionRepository.getPermissions).toHaveBeenCalledTimes(1);
      expect(permissionRepository.getPermissions).toHaveBeenCalledWith({ filters, pagination });
    });

    it('should set permissions count when get permissions', async () => {
      permissionRepository.countPermissions.mockResolvedValue(getCountMock());
      permissionRepository.getPermissions.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      await getPermissions({ filters, pagination });

      expect(pagination.setCount).toHaveBeenCalledTimes(1);
      expect(pagination.setCount).toHaveBeenCalledWith(getCountMock());
    });

    it('should get permissions', async () => {
      permissionRepository.countPermissions.mockResolvedValue(getCountMock());
      permissionRepository.getPermissions.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();
      const {
        statusCode,
        permissions,
      } = await getPermissions({ filters, pagination });

      expect(statusCode).toBe(OK);
      expect(permissions).toEqual(getPermissionsMock());
    });

    it('should build an internal server error when count fails', async () => {
      permissionRepository.countPermissions.mockRejectedValue(getErrorMock());
      permissionRepository.getPermissions.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      expect(getPermissions({ filters, pagination })).rejects
        .toEqual(getErrorMock());
    });

    it('should build an internal server error when get permissions fails', async () => {
      permissionRepository.countPermissions.mockResolvedValue(getCountMock());
      permissionRepository.getPermissions.mockRejectedValue(getErrorMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      expect(getPermissions({ filters, pagination })).rejects
        .toEqual(getErrorMock());
    });
  });

  describe('getPermissionById', () => {
    it('should get permission by id', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(getPermissionMock());
      const id = getIdMock();

      const { statusCode, permission } = await getPermissionById(id);

      expect(permissionRepository.getPermissionById).toHaveBeenCalledTimes(1);
      expect(permissionRepository.getPermissionById).toHaveBeenCalledWith(id);
      expect(statusCode).toBe(OK);
      expect(permission).toEqual(getPermissionMock());
    });

    it('should return not found response', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(null);
      const id = getIdMock();

      const { statusCode } = await getPermissionById(id);

      expect(statusCode).toBe(NOT_FOUND);
    });

    it('should build an internal server error when get by id fails', async () => {
      permissionRepository.getPermissionById.mockRejectedValue(getErrorMock());
      const id = getIdMock();

      expect(getPermissionById(id)).rejects
        .toEqual(getErrorMock());
    });
  });

  describe('createPermission', () => {
    it('should create permission', async () => {
      permissionRepository.createPermission.mockResolvedValue(getPermissionMock());

      const name = 'mock-name';
      const description = 'mock-description';
      const slug = 'mock-slug';
      const enabled = true;

      const { statusCode, permission } = await createPermission({
        name,
        slug,
        description,
        enabled,
      });

      expect(permissionRepository.createPermission).toHaveBeenCalledTimes(1);
      expect(permissionRepository.createPermission).toHaveBeenCalledWith({
        name,
        description,
        slug,
        enabled,
      });
      expect(statusCode).toBe(CREATED);
      expect(permission).toEqual(getPermissionMock());
    });

    it('should build an internal server error when create fails', async () => {
      permissionRepository.createPermission.mockRejectedValue(getErrorMock());

      const name = 'mock-name';
      const description = 'mock-description';
      const slug = 'mock-slug';
      const enabled = true;

      expect(createPermission({
        name, description, slug, enabled,
      })).rejects
        .toEqual(getErrorMock());
    });
  });

  describe('updatePermissionById', () => {
    it('should update permission by id when id is valid', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(getPermissionMock());
      permissionRepository.updatePermissionById.mockResolvedValue(getPermissionMock());

      const id = getIdMock();
      const options = {};

      const { statusCode, permission } = await updatePermissionById(id, options);

      expect(statusCode).toBe(OK);
      expect(permission).toEqual(getPermissionMock());
    });

    it('should return not found response when not found id', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(null);
      permissionRepository.updatePermissionById.mockResolvedValue(getPermissionMock());

      const id = getIdMock();
      const options = {};

      const { statusCode } = await updatePermissionById(id, options);

      expect(statusCode).toBe(NOT_FOUND);
    });

    it('should build an internal server error when update fails', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(getPermissionMock());
      permissionRepository.updatePermissionById.mockRejectedValue(getErrorMock());

      const id = getIdMock();
      const options = {};

      expect(updatePermissionById(id, options)).rejects
        .toEqual(getErrorMock());
    });
  });

  describe('deletePermissionById', () => {
    it('should delete permission by id when id is valid', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(getPermissionMock());
      permissionRepository.deletePermissionById.mockResolvedValue(getPermissionMock());

      const id = getIdMock();

      const { statusCode } = await deletePermissionById(id);

      expect(statusCode).toBe(NO_CONTENT);
    });

    it('should return not found response when not found id', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(null);
      permissionRepository.deletePermissionById.mockResolvedValue(getPermissionMock());

      const id = getIdMock();

      const { statusCode } = await deletePermissionById(id);

      expect(statusCode).toBe(NOT_FOUND);
    });

    it('should build an internal server error when delete fails', async () => {
      permissionRepository.getPermissionById.mockResolvedValue(getPermissionMock());
      permissionRepository.deletePermissionById.mockRejectedValue(getErrorMock());

      const id = getIdMock();

      expect(deletePermissionById(id)).rejects
        .toEqual(getErrorMock());
    });
  });
});
