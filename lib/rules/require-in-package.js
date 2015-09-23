var findup = require('findup-sync');
var fs = require('fs');
var path = require('path');

module.exports = function(context) {
	return {
		"ImportDeclaration": function(node) {
			var dependencyName = node.source.value;
			// Don't worry about relative paths
			if (dependencyName.indexOf('.') == 0) {
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