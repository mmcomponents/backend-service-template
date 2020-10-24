const permissionRepository = require('./permissionRepository');
const Permission = require('../permission-model');

jest.mock('../permission-model');

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
  };
}

function getPermissionMock() {
  return {
    toObject: () => ({
      _id: 'mock-id',
      slug: 'mock-slug',
      name: 'mock-name',
      description: 'mock-description',
      enabled: true,
      deleted: false,
      createdAt: '2020-10-13T00:16:59.304Z',
      updatedAt: '2020-10-13T00:16:59.304Z',
    }),
  };
}

function getNormalizedPermissionMock() {
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

describe('permissionRepository', () => {
  it('should get permission repository', () => {
    expect(typeof permissionRepository.countPermissions).toBe('function');
    expect(typeof permissionRepository.getPermissions).toBe('function');
    expect(typeof permissionRepository.getPermissionById).toBe('function');
    expect(typeof permissionRepository.createPermission).toBe('function');
    expect(typeof permissionRepository.updatePermissionById).toBe('function');
    expect(typeof permissionRepository.deletePermissionById).toBe('function');
  });

  describe('count permissions', () => {
    beforeEach(() => {
      Permission.count.mockReset();
    });

    it('should count permissions', async () => {
      Permission.count.mockResolvedValue(getCountMock());

      const count = await permissionRepository.countPermissions({});

      expect(count).toBe(getCountMock());
      expect(Permission.count).toHaveBeenCalledTimes(1);
      expect(Permission.count).toHaveBeenCalledWith({ filters: {} });
    });

    it('should count permissions with filters', async () => {
      Permission.count.mockResolvedValue(getCountMock());

      const count = await permissionRepository.countPermissions({
        filters: getFiltersMock(),
      });

      expect(count).toBe(getCountMock());
      expect(Permission.count).toHaveBeenCalledTimes(1);
      expect(Permission.count).toHaveBeenCalledWith({ filters: getFiltersMock() });
    });
  });

  describe('get permissions', () => {
    beforeEach(() => {
      Permission.find.mockReset();
    });

    it('should get permissions with success', async () => {
      Permission.find.mockResolvedValue(getPermissionsMock());
      const filters = getFiltersMock();
      const pagination = getPaginationMock();

      const permissions = await permissionRepository.getPermissions({ filters, pagination });

      expect(permissions).toEqual([getNormalizedPermissionMock()]);
      expect(Permission.find).toHaveBeenCalledTimes(1);
      expect(Permission.find).toHaveBeenCalledWith({ filters, pagination });
    });
  });

  describe('get permission by id', () => {
    beforeEach(() => {
      Permission.getById.mockReset();
    });

    it('should get permission by id with success', async () => {
      Permission.getById.mockResolvedValue(getPermissionMock());
      const id = 'mock-id';

      const permission = await permissionRepository.getPermissionById(id);

      expect(permission).toEqual(getNormalizedPermissionMock());
      expect(Permission.getById).toHaveBeenCalledTimes(1);
      expect(Permission.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('create permission', () => {
    beforeEach(() => {
      Permission.create.mockReset();
    });

    it('should create permissions with success', async () => {
      Permission.create.mockResolvedValue(getPermissionMock());
      const name = 'mock-name';
      const slug = 'mock-slug';
      const description = 'mock-description';
      const enabled = true;

      const permission = await permissionRepository.createPermission({
        name,
        slug,
        description,
        enabled,
      });

      expect(permission).toEqual(getNormalizedPermissionMock());
      expect(Permission.create).toHaveBeenCalledTimes(1);
      expect(Permission.create).toHaveBeenCalledWith({
        name,
        slug,
        description,
        enabled,
      });
    });
  });

  describe('update permission', () => {
    beforeEach(() => {
      Permission.updateDocumentById.mockReset();
    });

    it('should update permission with success', async () => {
      Permission.updateDocumentById.mockResolvedValue(getPermissionMock());
      const id = 'mock-id';
      const options = {
        name: 'mock another name',
      };

      const updatedPermission = await permissionRepository.updatePermissionById(id, options);

      expect(updatedPermission).toEqual(getNormalizedPermissionMock());
      expect(Permission.updateDocumentById).toHaveBeenCalledTimes(1);
      expect(Permission.updateDocumentById).toHaveBeenCalledWith(id,options);
    });
  });

  describe('delete permission by id', () => {
    beforeEach(() => {
      Permission.deleteDocumentById.mockReset();
    });

    it('should delete permission with success', async () => {
      Permission.deleteDocumentById.mockResolvedValue(true);
      const id = 'mock-id';

      await permissionRepository.deletePermissionById(id);

      expect(Permission.deleteDocumentById).toHaveBeenCalledTimes(1);
      expect(Permission.deleteDocumentById).toHaveBeenCalledWith(id);
    });
  });
});
