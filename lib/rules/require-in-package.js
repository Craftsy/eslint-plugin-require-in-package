var findup = require('findup-sync');
var fs = require('fs');
var path = require('path');
var isBuiltInModule = require('is-builtin-module');

module.exports = function(context) {
	return {
		"ImportDeclaration": function(node) {
			var requirePath = node.source.value;
			// Don't worry about relative paths or built ins
			if (isRelativePath(requirePath) || isBuiltInModule(requirePath)) {
				return;
			}
			var pkg = getLocalPackageJson(context.getFilename());
			if (pkg) {
				var dependencies = getDependencyList(pkg);
				var dependencyToValidate = getDepNameFromRequirePath(requirePath);
				if (dependencies.indexOf(dependencyToValidate) === -1) {
					context.report(node, 'dependency not in the local package.json', {
						dependency: node.source.value
					});
				}
			}
		}
	};
};

function isRelativePath(requirePath) {
	return requirePath.indexOf('.') == 0;
}

function getLocalPackageJson(filename) {
	//TODO: cache this?
	var basedir = path.dirname(filename);
	var packagePath = findup('package.json', {cwd: basedir});
	return packagePath 
		? JSON.parse(fs.readFileSync(packagePath))
		: null;
}

function getDependencyList(pkg) {
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
	return dependencies;
}

function getDepNameFromRequirePath(requirePath) {
	if (requirePath.indexOf('/') === -1) {
		return requirePath;
	} else {
		if (isScopedModule(requirePath)) {
			var secondSlashIndex = requirePath.indexOf('/', requirePath.indexOf('/')+1);
			if (secondSlashIndex == -1) {
				return requirePath;
			} else {
				return requirePath.substr(0, secondSlashIndex);
			}
		} else {
			return requirePath.substr(0, requirePath.indexOf('/'));
		}
	}
}

function isScopedModule(requirePath) {
	return requirePath.indexOf('@') === 0;
}
