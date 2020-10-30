const {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermissionById,
  deletePermissionById,
} = require('./permissionController');
const permissionService = require('./permissionService');
const HttpError = require('../../core/http-error');
const Pagination = require('../../core/pagination');

jest.mock('./permissionService');

function getResMock() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { status, json };
}

function getReqMock({ query, body, params } = {}) {
  return {
    params: {
      ...params,
    },
    query: {
      pageSize: 10,
      pageNumber: 1,
      ...query,
    },
    body: {
      ...body,
    },
  };
}

function getIdMock() {
  return 'mock-id';
}

function getErrorMock() {
  return new HttpError(500, 'Internal server error');
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

describe('permissionController', () => {
  beforeEach(() => {
    permissionService.getPermissions.mockReset();
    permissionService.getPermissionById.mockReset();
    permissionService.createPermission.mockReset();
    permissionService.updatePermissionById.mockReset();
    permissionService.deletePermissionById.mockReset();
  });

  it('should get permission controller', () => {
    expect(typeof getPermissions).toBe('function');
    expect(typeof getPermissionById).toBe('function');
    expect(typeof createPermission).toBe('function');
    expect(typeof updatePermissionById).toBe('function');
    expect(typeof deletePermissionById).toBe('function');
  });

  describe('getPermissions', () => {
    it('should get permissions with success when provide filters', async () => {
      permissionService.getPermissions.mockResolvedValue({
        statusCode: 200,
        permissions: getPermissionsMock(),
      });
      const req = getReqMock({
        query: {
          name: 'mock-name',
          slug: 'mock-slug',
          enabled: 'true',
        },
      });
      const res = getResMock();
      const pagination = new Pagination(req);

      await getPermissions(req, res);

      expect(permissionService.getPermissions).toHaveBeenCalledTimes(1);
      expect(permissionService.getPermissions).toHaveBeenCalledWith({
        filters: { name: 'mock-name', slug: 'mock-slug', enabled: true },
        pagination,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        permissions: getPermissionsMock(),
        pagination: pagination.toJSON(),
      });
    });

    it('should get response error when fail on get permissions', async () => {
      permissionService.getPermissions.mockRejectedValue(getErrorMock());
      const req = getReqMock();
      const res = getResMock();

      await getPermissions(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: getErrorMock().message,
      });
    });

    it('should get permissions with success without filters', async () => {
      permissionService.getPermissions.mockResolvedValue({
        statusCode: 200,
        permissions: getPermissionsMock(),
      });
      const req = getReqMock({});
      const res = getResMock();
      const pagination = new Pagination(req);

      await getPermissions(req, res);

      expect(permissionService.getPermissions).toHaveBeenCalledTimes(1);
      expect(permissionService.getPermissions).toHaveBeenCalledWith({
        filters: {},
        pagination,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        permissions: getPermissionsMock(),
        pagination: pagination.toJSON(),
      });
    });
  });

  describe('getPermissionsById', () => {
    it('should get permission by id with success', async () => {
      permissionService.getPermissionById.mockResolvedValue({
        statusCode: 200,
        permission: getPermissionMock(),
      });
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
      });
      const res = getResMock();

      await getPermissionById(req, res);

      expect(permissionService.getPermissionById).toHaveBeenCalledTimes(1);
      expect(permissionService.getPermissionById).toHaveBeenCalledWith(getIdMock());
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        ...getPermissionMock(),
      });
    });

    it('should get response error when fail on get permission by id', async () => {
      permissionService.getPermissionById.mockRejectedValue(getErrorMock());
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
      });
      const res = getResMock();

      await getPermissionById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: getErrorMock().message,
      });
    });
  });

  describe('createPermissions', () => {
    it('should create permissions with success', async () => {
      permissionService.createPermission.mockResolvedValue({
        statusCode: 201,
        permission: getPermissionMock(),
      });
      const req = getReqMock({
        body: {
          name: 'name-mock',
          slug: 'slug-mock',
          description: 'description-mock',
          enabled: true,
        },
      });
      const res = getResMock();

      await createPermission(req, res);

      expect(permissionService.createPermission).toHaveBeenCalledTimes(1);
      expect(permissionService.createPermission).toHaveBeenCalledWith({
        name: 'name-mock',
        slug: 'slug-mock',
        description: 'description-mock',
        enabled: true,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        ...getPermissionMock(),
      });
    });

    it('should get response error when fail on create permission', async () => {
      permissionService.createPermission.mockRejectedValue(getErrorMock());
      const req = getReqMock({
        body: {
          name: 'name-mock',
          slug: 'slug-mock',
          description: 'description-mock',
          enabled: true,
        },
      });
      const res = getResMock();

      await createPermission(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: getErrorMock().message,
      });
    });
  });

  describe('updatePermissionById', () => {
    it('should update permission by id with success', async () => {
      permissionService.updatePermissionById.mockResolvedValue({
        statusCode: 200,
        permission: getPermissionMock(),
      });
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
        body: {
          name: 'name-mock',
        },
      });
      const res = getResMock();

      await updatePermissionById(req, res);

      expect(permissionService.updatePermissionById).toHaveBeenCalledTimes(1);
      expect(permissionService.updatePermissionById).toHaveBeenCalledWith(
        getIdMock(), {
          name: 'name-mock',
        },
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        ...getPermissionMock(),
      });
    });

    it('should get response error when fail on update permission by id', async () => {
      permissionService.updatePermissionById.mockRejectedValue(getErrorMock());
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
        body: {
          name: 'name-mock',
        },
      });
      const res = getResMock();

      await updatePermissionById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: getErrorMock().message,
      });
    });
  });

  describe('deletePermissionById', () => {
    it('should delete permission by id with success', async () => {
      permissionService.deletePermissionById.mockResolvedValue({
        statusCode: 204,
      });
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
      });
      const res = getResMock();

      await deletePermissionById(req, res);

      expect(permissionService.deletePermissionById).toHaveBeenCalledTimes(1);
      expect(permissionService.deletePermissionById).toHaveBeenCalledWith(
        getIdMock(),
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith();
    });

    it('should get response error when fail on update permission by id', async () => {
      permissionService.deletePermissionById.mockRejectedValue(getErrorMock());
      const req = getReqMock({
        params: {
          id: getIdMock(),
        },
      });
      const res = getResMock();

      await deletePermissionById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: getErrorMock().message,
      });
    });
  });
});
