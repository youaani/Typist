if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.Base) == 'undefined') { Clipperz.Base = {}; }

Clipperz.Base.VERSION = "0.2";
Clipperz.Base.NAME = "Clipperz.Base";

MochiKit.Base.update(Clipperz.Base, {

	//-------------------------------------------------------------------------

	'__repr__': function () {
		return "[" + this.NAME + " " + this.VERSION + "]";
	},

	//-------------------------------------------------------------------------

	'toString': function () {
		return this.__repr__();
	},

	//-------------------------------------------------------------------------

	'itemgetter': function (aKeyPath) {
//		return MochiKit.Base.compose.apply(null, [MochiKit.Base.itemgetter('key3')]);
		return MochiKit.Base.compose.apply(null,
					MochiKit.Base.map(
						MochiKit.Base.itemgetter,
						MochiKit.Iter.reversed(
							aKeyPath.split('.')
						)
					)
				);
	},

	//-------------------------------------------------------------------------

	'caseInsensitiveCompare': function (a, b) {
		return MochiKit.Base.compare(a.toLowerCase(), b.toLowerCase());
	},

	'reverseComparator': function (aComparator) {
		return MochiKit.Base.compose(function(aResult) { return -aResult; }, aComparator);
	},

	//-------------------------------------------------------------------------
/*
	'dependsOn': function(module, deps) {
		if (!(module in Clipperz)) {
			MochiKit[module] = {};
		}

		if (typeof(dojo) != 'undefined') {
			dojo.provide('Clipperz.' + module);
		}
		for (var i = 0; i < deps.length; i++) {
			if (typeof(dojo) != 'undefined') {
				dojo.require('Clipperz.' + deps[i]);
			}
			if (typeof(JSAN) != 'undefined') {
				JSAN.use('Clipperz.' + deps[i], []);
			}
			if (!(deps[i] in Clipperz)) {
				throw 'Clipperz.' + module + ' depends on Clipperz.' + deps[i] + '!'
			}
		}
	},
*/
	//-------------------------------------------------------------------------

	'trim': function (aValue) {
		return aValue.replace(/^\s+|\s+$/g, "");
	},

	//-------------------------------------------------------------------------

	'stringToByteArray': function (aValue) {
		var	result;
		var i, c;

		result = [];
		
		c = aValue.length;
		for (i=0; i<c; i++) {
			result[i] = aValue.charCodeAt(i);
		}
		
		return result;
	},
	
	//.........................................................................
	
	'byteArrayToString': function (anArrayOfBytes) {
		var	result;
		var i, c;

		result = "";

		c = anArrayOfBytes.length;
		for (i=0; i<c; i++) {
			result += String.fromCharCode(anArrayOfBytes[i]);
		}
		
		return result;
	},

	//-------------------------------------------------------------------------

	'getValueForKeyInFormContent': function (aFormContent, aKey) {
		return aFormContent[1][MochiKit.Base.find(aFormContent[0], aKey)];
	},

	//-------------------------------------------------------------------------

	'indexOfObjectInArray': function(anObject, anArray) {
		var	result;
		var	i, c;
		
		result = -1;

		c = anArray.length;
		for (i=0; ((i<c) && (result < 0)); i++) {
			if (anArray[i] === anObject) {
				result = i;
			}
		}

		return result;
	},

	//-------------------------------------------------------------------------

	'removeObjectAtIndexFromArray': function(anIndex, anArray) {
		anArray.splice(anIndex, 1);
	},
	
	//-------------------------------------------------------------------------

	'removeObjectFromArray': function(anObject, anArray) {
		var	objectIndex;
		
		objectIndex = Clipperz.Base.indexOfObjectInArray(anObject, anArray);
		if (objectIndex > -1) {
			Clipperz.Base.removeObjectAtIndexFromArray(objectIndex, anArray);
		} else {
//			jslog.error("Trying to remove an object not present in the array");
			//	TODO: raise an exception
		}
	},
	
	'removeFromArray': function(anArray, anObject) {
		return Clipperz.Base.removeObjectFromArray(anObject, anArray);
	},

	//-------------------------------------------------------------------------

	'splitStringAtFixedTokenSize': function(aString, aTokenSize) {
		var result;
		var	stringToProcess;
		
		stringToProcess = aString;
		result = [];
		if (stringToProcess != null) {
			while (stringToProcess.length > aTokenSize) {
				result.push(stringToProcess.substring(0, aTokenSize));
				stringToProcess = stringToProcess.substring(aTokenSize);
			}
			
			result.push(stringToProcess);
		}
		
		return result;
	},
	
	//-------------------------------------------------------------------------

	'objectType': function(anObject) {
		var result;

		if (anObject == null) {
			result = null;
		} else {
			result = typeof(anObject);
			
			if (result == "object") {
				if (anObject instanceof Array) {
					result = 'array'
				} else if (anObject.constructor == Boolean) {
					result = 'boolean'
				} else if (anObject instanceof Date) {
					result = 'date'
				} else if (anObject instanceof Error) {
					result = 'error'
				} else if (anObject instanceof Function) {
					result = 'function'
				} else if (anObject.constructor == Number) {
					result = 'number'
				} else if (anObject.constructor == String) {
					result = 'string'
				} else if (anObject instanceof Object) {
					result = 'object'
				} else {
					throw Clipperz.Base.exception.UnknownType;
				}
			}
		}
		
		return result;
	},

	//-------------------------------------------------------------------------

	'escapeHTML': function(aValue) {
		var result;

		result = aValue;
		result = result.replace(/</g, "&lt;");
		result = result.replace(/>/g, "&gt;");
		
		return result;
	},

	//-------------------------------------------------------------------------

	'deepClone': function(anObject) {
		var result;
		
		result = Clipperz.Base.evalJSON(Clipperz.Base.serializeJSON(anObject));
		
		return result;
	},

	//-------------------------------------------------------------------------

	'evalJSON': function(aString) {
		return JSON.parse(aString);
	},
	
	'serializeJSON': function(anObject) {
		return JSON.stringify(anObject);
	},

	//-------------------------------------------------------------------------

	'sanitizeString': function(aValue) {
		var result;
		
		if (Clipperz.Base.objectType(aValue) == 'string') {
			result = aValue;
			result = result.replace(/</img,"&lt;");
			result = result.replace(/>/img,"&gt;");
		} else {
			result = aValue;
		}
		
		return result;
	},

	//-------------------------------------------------------------------------

	'module': function(aValue) {
//		aValue = 'Clipperz.PM.Compact'
//
//		if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
//		if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
//		if (typeof(Clipperz.PM.UI.Common.Components) == 'undefined') { Clipperz.PM.UI.Common.Components = {}; }

//console.log(">>> module: " + aValue);
		var currentScope;
		var pathElements;
		var i,c;
		
		currentScope = window;
		pathElements = aValue.split('.');
		c = pathElements.length;
		for (i=0; i<c; i++) {
//console.log("--- current path element: " + pathElements[i]);
//console.log("--- current scope", currentScope);
			if (typeof(currentScope[pathElements[i]]) == 'undefined') {
				currentScope[pathElements[i]] = {};
			}
			
			currentScope = currentScope[pathElements[i]];
		}
	},
	
	//-------------------------------------------------------------------------

	'exception': {
		'AbstractMethod': 		new MochiKit.Base.NamedError("Clipperz.Base.exception.AbstractMethod"),
		'UnknownType':    		new MochiKit.Base.NamedError("Clipperz.Base.exception.UnknownType"),
		'VulnerabilityIssue':	new MochiKit.Base.NamedError("Clipperz.Base.exception.VulnerabilityIssue"),
		'MandatoryParameter':	new MochiKit.Base.NamedError("Clipperz.Base.exception.MandatoryParameter"),
		'raise': function (aName) {
			throw Clipperz.Base.exception[aName];
		}
	},

	//-------------------------------------------------------------------------

	'extend': YAHOO.extendX,

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"

});



MochiKit.Base.registerComparator('Object dummy comparator',
	function(a, b) {
		return ((a.constructor == Object) && (b.constructor == Object));
	},
	function(a, b) {
		var result;
		var aKeys;
		var bKeys;
		
//MochiKit.Logging.logDebug(">>> comparator");
//MochiKit.Logging.logDebug("- a: " + Clipperz.Base.serializeJSON(a));
//MochiKit.Logging.logDebug("- b: " + Clipperz.Base.serializeJSON(a));
		aKeys = MochiKit.Base.keys(a).sort();
		bKeys = MochiKit.Base.keys(b).sort();
		
		result = MochiKit.Base.compare(aKeys, bKeys);
//if (result != 0) {
//	MochiKit.Logging.logDebug("- comparator 'keys':");
//	MochiKit.Logging.logDebug("- comparator aKeys: " + Clipperz.Base.serializeJSON(aKeys));
//	MochiKit.Logging.logDebug("- comparator bKeys: " + Clipperz.Base.serializeJSON(bKeys));
//}
		if (result == 0) {
			var	i, c;
			
			c = aKeys.length;
			for (i=0; (i<c) && (result == 0); i++) {
				result = MochiKit.Base.compare(a[aKeys[i]], b[bKeys[i]]);
//if (result != 0) {
//	MochiKit.Logging.logDebug("- comparator 'values':");
//	MochiKit.Logging.logDebug("- comparator a[aKeys[i]]: " + Clipperz.Base.serializeJSON(a[aKeys[i]]));
//	MochiKit.Logging.logDebug("- comparator b[bKeys[i]]: " + Clipperz.Base.serializeJSON(b[bKeys[i]]));
//}
			}
		}		
		
//MochiKit.Logging.logDebug("<<< comparator - result: " + result);
		return result;
	},
	true
);
