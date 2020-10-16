const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
}, {
  id: true,
  timestamps: true,
});

const model = mongoose.model('permissions', permissionSchema);

module.exports = model;
