const Pagination = require('./Pagination');

function getReqMock({ pageSize, pageNumber } = {}) {
  return {
    query: {
      pageSize: pageSize || 10,
      pageNumber: pageNumber || 2,
      sortBy: 'name',
      text: 'text-search',
    },
  };
}

describe('Pagination', () => {
  it('should create default pagination', () => {
    const pagination = new Pagination({ query: {} });
    expect(pagination.pageSize).toBe(20);
    expect(pagination.pageNumber).toBe(1);
  });

  it('should create pagination with req pageSize and pageNumber', () => {
    const pagination = new Pagination(getReqMock());
    expect(pagination.pageSize).toBe(10);
    expect(pagination.pageNumber).toBe(2);
  });

  it('should set pagination count when count is multiple from pageSize', () => {
    const pagination = new Pagination(getReqMock());

    pagination.count = 40;

    expect(pagination.toJSON()).toEqual({
      count: 40,
      pageNumber: 2,
      pageSize: 10,
      sortBy: 'name',
      text: 'text-search',
      totalPages: 4,
    });
  });

  it('should set pagination count when count is multiple from pageSize', () => {
    const pagination = new Pagination(getReqMock());

    pagination.count = 41;

    expect(pagination.toJSON()).toEqual({
      count: 41,
      pageNumber: 2,
      pageSize: 10,
      sortBy: 'name',
      text: 'text-search',
      totalPages: 5,
    });
  });

  it('should build full pagination', () => {
    const pagination = new Pagination({
      query: {
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'age',
        text: 'text-search',
      },
    });

    pagination.count = 0;

    expect(pagination.count).toBe(0);
    expect(pagination.pageSize).toBe(10);
    expect(pagination.pageNumber).toBe(1);
    expect(pagination.totalPages).toBe(0);
    expect(pagination.sortBy).toBe('age');
    expect(pagination.text).toBe('text-search');
  });
});
