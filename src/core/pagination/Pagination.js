class Pagination {
  constructor(req) {
    this._pageSize = parseInt(req.query.pageSize || process.env.DEFAULT_PAGE_SIZE, 10);
    this._pageNumber = parseInt(req.query.pageNumber || process.env.DEFAULT_FIRST_PAGE_NUMBER, 10);
    this._sortBy = req.query.sortBy || null;
    this._text = req.query.text || null;
    this._count = null;
    this._totalPages = null;
  }

  get pageSize() {
    return this._pageSize;
  }

  get pageNumber() {
    return this._pageNumber;
  }

  get sortBy() {
    return this._sortBy;
  }

  get text() {
    return this._text;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
    this._totalPages = Math.ceil(value / this._pageSize);
  }

  get totalPages() {
    return this._totalPages;
  }

  toJSON() {
    return {
      pageSize: this._pageSize,
      pageNumber: this._pageNumber,
      sortBy: this._sortBy,
      text: this._text,
      count: this._count,
      totalPages: this._totalPages,
    };
  }
}

module.exports = Pagination;
