const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source)
  .map(name => join(source, name)).filter(isDirectory);

const BASE_DIR = join(__dirname);

const modulesDirectories = getDirectories(BASE_DIR);

const modules = [];

modulesDirectories.forEach((directory) => {
  const module = require(directory);
  modules.push(module);
});

module.exports = modules;
