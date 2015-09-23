var findup = require('findup-sync');
var fs = require('fs');
var path = require('path');
var isBuiltInModule = require('is-builtin-module');

module.exports = function(context) {
	return {
		"ImportDeclaration": function(node) {
			var dependencyName = node.source.value;
			// Don't worry about relative paths or built ins
			if (dependencyName.indexOf('.') == 0 || isBuiltInModule(dependencyName)) {
				return;
			}
			var basedir = path.dirname(context.getFilename());
			var packagePath = findup('package.json', {cwd: basedir});
			// Don't worry if there is no package.json
			if (packagePath) {
				//TODO: cache this
				var pkg = JSON.parse(fs.readFileSync(packagePath));
				var dependencies = [];
				if (pkg.dependencies) {
					dependencies = dependencies.concat(Object.keys(pkg.dependencies));
				}
				if (pkg.peerDependencies) {
					dependencies = dependencies.concat(Object.keys(pkg.peerDependencies));
				}
				if (pkg.devDependencies) {
					dependencies = dependencies.concat(Object.keys(pkg.devDependencies));
				}
				//TODO: cache package.json dependencies too?
				if (dependencies.indexOf(dependencyName) === -1) {
					context.report(node, 'dependency not in the local package.json', {
						dependency: node.source.value
					});
				}
			}
		}
	};
};