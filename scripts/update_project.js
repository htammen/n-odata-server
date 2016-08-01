"use strict";
var sh = require('shelljs');
var cp = require('child_process');
var typings_dir = './typings';
sh.rm('-rf', typings_dir);
console.log("directory " + typings_dir + " deleted");
cp.execSync('npm install');
console.log('npm install has been executed');
cp.execSync('npm update');
console.log('npm update has been executed. Packages are updated to highest wanted version');
cp.execSync('typings install');
console.log('typings install has been executed');
console.log('**********************************');
console.log('project updated to newest settings');
console.log('**********************************');
//# sourceMappingURL=update_project.js.map