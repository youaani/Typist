if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Target = function (args) {
console.log(">>> new Typist.Target", args);
	this._value					= args.value			|| Clipperz.Base.exception.raise('MandatoryParameter_1');
	this._availableTime			= args.availableTime	|| Clipperz.Base.exception.raise('MandatoryParameter_2');

	this._currentTargetIndex	= 0;
	this._node					= null;
console.log("<<< new Typist.Target");
	
	return this;
};

Typist.Target.prototype = {
	__class__: Typist.Target,

	//-------------------------------------------------------------------------

	'value': function () {
		return this._value;
	},
	
	//-------------------------------------------------------------------------

	'currentTargetIndex': function () {
		return this._currentTargetIndex;
	},

	//-------------------------------------------------------------------------

	'isComplete': function () {
		return (this.currentTargetIndex() == this.value().length);
	},

	//-------------------------------------------------------------------------

	'node': function () {
		if (this._node == null) {
			this._node = MochiKit.DOM.DIV({'class':'target'});
			MochiKit.DOM.replaceChildNodes(MochiKit.DOM.getElement('targets'), this._node);
		}
		
		return this._node;
	},

	//-------------------------------------------------------------------------

	'update': function () {
		MochiKit.DOM.replaceChildNodes(this.node(), [
			MochiKit.DOM.SPAN({'class':'matched'},			this.value().substring(0, this.currentTargetIndex())),
			MochiKit.DOM.SPAN({'class':'currentTarget'},	this.value().charAt(this.currentTargetIndex())),
			MochiKit.DOM.SPAN({'class':'unmatched'},		this.value().substring(this.currentTargetIndex() + 1))
		]);
	},

	//-------------------------------------------------------------------------

	'handleKey': function (aKey) {
		if (this.value().charAt(this.currentTargetIndex()) == aKey) {
			this._currentTargetIndex ++;
			this.update();
			MochiKit.Signal.signal(Clipperz.Signal.NotificationCenter, 'correctKey');
		} else {
			MochiKit.Signal.signal(Clipperz.Signal.NotificationCenter, 'wrongKey');
		}
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
