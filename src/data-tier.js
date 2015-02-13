//	are those below convenient ones?
//	<div data-tie="users...">
//		<div data-tie="users..[0]">
//			<span data-tie-value="users..name"></span>
//			<span data-tie-color="users..active"></span>
//			<span data-tie-bdate="users[0].birthday"></span>
//		</div>
//	</div>

(function (options) {
	'use strict';

	var domObserver, ties = {}, views;

	if (typeof options !== 'object') { options = {}; }
	if (typeof options.namespace !== 'object') {
		if (typeof window.Utils !== 'object') Object.defineProperty(window, 'Utils', { value: {} });
		options.namespace = window.Utils;
	}

	function pathToNodes(value) {
		if (Array.isArray(value)) return value;

		var c = 0, b = false, n = '', r = [];
		while (c < value.length) {
			if (value[c] === '.') {
				n.length && r.push(n);
				n = '';
			} else if (value[c] === '[') {
				if (b) throw new Error('bad path: "' + value + '", at: ' + c);
				n.length && r.push(n);
				n = '';
				b = true;
			} else if (value[c] === ']') {
				if (!b) throw new Error('bad path: "' + value + '", at: ' + c);
				n.length && r.push(n);
				n = '';
				b = false;
			} else {
				n += value[c];
			}
			c++;
		}
		n.length && r.push(n);
		return r;
	}

	function setPath(ref, path, value) {
		var list = pathToNodes(path), i;
		for (i = 0; i < list.length - 1; i++) {
			if (typeof ref[list[i]] === 'object') ref = ref[list[i]];
			else if (!(list[i] in ref)) ref = (ref[list[i]] = {});
			else throw new Error('the path is unavailable');
		}
		ref[list[i]] = value;
	}

	function getPath(ref, path) {
		var list = pathToNodes(path), i = 0;
		for (; i < list.length; i++) {
			if (list[i] in ref) ref = ref[list[i]];
			else return;
		}
		return ref;
	}

	function cutPath(ref, path) {
		var list = pathToNodes(path), i = 0, value;
		for (; i < list.length - 1; i++) {
			if (list[i] in ref) ref = ref[list[i]];
			else return;
		}
		value = ref[list[i - 1]];
		delete ref[list[i - 1]];
		return value;
	}

	function updateView(view, target, pathInNodes) {
		var t = ties[pathInNodes.shift()], d = getPath(t.data, pathInNodes);
		if (target === 'content') {
			view.textContent = d;
		} else {
			throw new Error('not yet supported target');
		}
	}

	function resolvePath(e, p) {
		//	TODO: add support for composite paths
		return pathToNodes(p);
	}

	function collectViews(rootElement) {
		var l, v, b, p, va;

		if (!rootElement.getElementsByTagName) return;
		if (!views) {
			console.info('DT: Starting initial scan for a views...');
			views = {};
			b = performance.now();
		}
		l = Array.prototype.splice.call(rootElement.getElementsByTagName('*'), 0);
		l.push(rootElement);
		l.forEach(function (v) {
			if (v.dataset) {
				Object.keys(v.dataset).forEach(function (k) {
					if (k.indexOf('tie') === 0) {
						p = resolvePath(v, v.dataset[k]);
						va = getPath(views, p);
						if (!va) setPath(views, p, (va = []));
						if (va.indexOf(v) < 0) {
							va.push(v);
							updateView(v, 'content', p);
						}
					}
				});
			}
		});
		b && console.info('DT: Initial scan finished in ' + (performance.now() - b).toFixed(3) + 'ms');
	}

	function repathView(view, oldPath, newPath) {

		//	delete old path
		var pathViews = getPath(views, oldPath), i = -1, npn = pathToNodes(newPath);
		if (pathViews) i = pathViews.indexOf(view);
		if (i >= 0) pathViews.splice(i, 1);

		//	add new path
		if (!getPath(views, npn)) setPath(views, npn, []);
		getPath(views, npn).push(view);
		updateView(view, 'content', npn)
	}

	function publishDataNode(data, view) {
		//	TODO: expand the visualization to many destinations
		view.textContent = data;
	}

	function publishDataTree(data, path) {
		var vs;
		if (typeof data === 'object') {
			Object.keys(data).forEach(function (key) {
				publishDataTree(data[key], path + '.' + key);
			});
		} else {
			vs = getPath(views, path);
			if (vs) {
				vs.forEach(function (view) { publishDataNode(data, view) });
			}
		}
	}

	function destroyDataObservers(data, namespace, observers) {
		var o;
		Object.keys(observers).forEach(function (key) {
			if (key.indexOf(namespace) === 0) {
				o = getPath(data, key.replace(namespace + '.', ''));
				Object.unobserve(o, observers[key]);
			}
		});
	}

	function setupDataObservers(data, namespace, observers) {
		var o;
		o = function (changes) {
			changes.forEach(function (change) {
				var ov = change.oldValue, nv = change.object[change.name], p = namespace + '.' + change.name;
				if (ov && typeof ov === 'object') {
					destroyDataObservers(ov, p, observers);
					console.log(observers.length)
				}
				if (nv && typeof nv === 'object') {
					setupDataObservers(nv, p, observers);
					console.log(observers.length)
				}
				nv && publishDataTree(nv, p);
			});
		};
		observers[namespace] = o;
		Object.observe(data, o, ['add', 'update', 'delete']);
		Object.keys(data).forEach(function (key) {
			if (data[key] && typeof data[key] === 'object') setupDataObservers(data[key], namespace + '.' + key, observers);
		});
	}

	function Rule(id, path) {
		if (id.indexOf('tie') !== 0) throw new Error('rule id MUST begin with "tie"');
		path = pathToNodes(path);
		Object.defineProperties(this, {
			id: { get: function () { return id; } },
			path: { get: function () { return path; } }
		});
	}

	function RulesSet() {
		Object.defineProperties(this, {
			addRule: {
				value: function (id, targetPath) {
					//	TODO: validate id and targetPath
					this[id] = new Rule(id, targetPath);
				}
			},
			getRule: { value: function (id) { return this.hasOwnProperty(id) ? this[id] : null; } },
			delRule: { value: function (id) { return delete this[id]; } }
		});
	}
	RulesSet.prototype = new RulesSet();
	RulesSet.prototype.addRule('tieText', 'textContent');
	RulesSet.prototype.addRule('tieValue', 'value');

	function Tie(namespace, data) {
		var observers = {}, rulesSet = new RulesSet();
		Object.defineProperties(this, {
			namespace: { get: function () { return namespace; } },
			data: { get: function () { return data; } },
			untie: { value: function () { console.info('to be implemented'); } },
			rules: { value: rulesSet }
		});
		ties[namespace] = this;
		setupDataObservers(data, namespace, observers);
		if (!views) collectViews(document);
	}

	(function initDomObserver() {
		function processDomChanges(changes) {
			if (!views) return;
			changes.forEach(function (change) {
				var an, op, np, i, l;
				if (change.type === 'attributes' && (an = change.attributeName).indexOf('data-tie') == 0) {
					op = change.oldValue;
					np = change.target.getAttribute(an);
					repathView(change.target, op, np);
				} else if (change.type === 'childList') {
					if (change.addedNodes.length) {
						for (i = 0, l = change.addedNodes.length; i < l; i++) {
							collectViews(change.addedNodes[i]);
						}
					}
					if (change.removedNodes.length) {
						//	traverse all deleted nodes and remove any relevant from ties
						for (i = 0, l = change.addedNodes.length; i < l; i++) {
							//	updateElementTree(change.addedNodes[i]);
						}
					}
				}
			});
		};

		domObserver = new MutationObserver(processDomChanges);
		domObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeOldValue: true,
			characterData: false,
			characterDataOldValue: false
		});
	})();

	Object.defineProperty(options.namespace, 'DataTier', { value: {} });
	Object.defineProperties(options.namespace.DataTier, {
		tieData: {
			value: function (namespace, data) {
				if (!namespace || typeof namespace !== 'string') throw new Error('namespace (first param) MUST be a non empty string');
				if (/\W|[A-Z]/.test(namespace)) throw new Error('namespace (first param) MUST consist of alphanumeric non uppercase characters only');
				if (ties[namespace]) throw new Error('namespace "' + options.namespace + '" already exists');
				if (!data || typeof data !== 'object') throw new Error('data (second param) MUST be a non null object');
				return new Tie(namespace, data);
			}
		},
		getTie: {
			value: function (namespace) {
				return ties[namespace];
			}
		}
	});
})((typeof arguments === 'object' ? arguments[0] : undefined));