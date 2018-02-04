var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
function uniqueKey() {
	var guid = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();

	return guid;
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var dataArray = [{
	message: "User Error",
	link: "Try again",
	key: uniqueKey()
}, {
	message: "404",
	link: "Refresh",
	key: uniqueKey()
}, {
	message: "Oops",
	link: "Keep fishing",
	key: uniqueKey()
}];

var Notification = function (_React$Component) {
	_inherits(Notification, _React$Component);

	function Notification(props) {
		_classCallCheck(this, Notification);

		var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

		_this.state = {
			message: _this.props.data.message,
			link: _this.props.data.link
		};
		return _this;
	}

	_createClass(Notification, [{
		key: "deleteMessage",
		value: function deleteMessage() {
			var newObject = {
				message: this.state.message,
				link: this.state.link
			};
			this.props.deleteMessage(newObject);
			this.setState({
				btn: false
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"ul",
					null,
					React.createElement(
						"li",
						{ className: "card__list text--primary" },
						this.props.data.message
					),
					React.createElement(
						"li",
						{ className: "card__list text--small text--link" },
						this.props.data.link
					)
				),
				React.createElement(
					"button",
					{
						type: "button",
						className: "close",
						onClick: this.deleteMessage.bind(this)
					},
					"\xD7"
				)
			);
		}
	}]);

	return Notification;
}(React.Component);

var Header = function (_React$Component2) {
	_inherits(Header, _React$Component2);

	function Header(props) {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	}

	_createClass(Header, [{
		key: "addMessage",
		value: function addMessage() {
			this.props.addMessage();
		}
	}, {
		key: "resetForm",
		value: function resetForm() {
			this.props.resetForm();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "header" },
				React.createElement(
					"h1",
					null,
					"React Transition Demo"
				),
				React.createElement(
					"div",
					{ className: "btn-container" },
					React.createElement(
						"button",
						{
							disabled: this.props.btn,
							className: "btn btn--secondary",
							onClick: this.resetForm.bind(this)
						},
						"Reset"
					),
					React.createElement(
						"button",
						{ className: "btn btn--primary", onClick: this.addMessage.bind(this) },
						"Add Message"
					)
				)
			);
		}
	}]);

	return Header;
}(React.Component);

var Parent = function (_React$Component3) {
	_inherits(Parent, _React$Component3);

	function Parent(props) {
		_classCallCheck(this, Parent);

		var _this3 = _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).call(this, props));

		_this3.state = {
			data: _this3.props.data,
			btn: true
		};
		return _this3;
	}

	_createClass(Parent, [{
		key: "addMessage",
		value: function addMessage(newObject) {
			var messageArray = ["Bleep", "Bloop", "Blop"];

			var linkArray = ["Aren't you a little short for a stormtrooper?", "These aren't the droids you're looking for.", "I find your lack of faith disturbing.", "Help me, Obi-Wan Kenobi.", "I will not be the last Jedi.", "May the force be with you."];

			var randomMessage = Math.floor(Math.random() * messageArray.length);
			var randomLink = Math.floor(Math.random() * linkArray.length);

			var newObject = {
				message: messageArray[randomMessage],
				link: linkArray[randomLink],
				key: uniqueKey()
			};

			var list = this.state.data; //get current array
			var newList = list.slice(); //copy the array
			newList.unshift(newObject); //add the newobject to the beginning
			if (this.state.data.length >= 3) {
				newList.pop();
			}
			this.setState({
				data: newList,
				btn: false
			});
		}
	}, {
		key: "deleteMessage",
		value: function deleteMessage(i, newObject) {
			var list = this.state.data;
			var newList = list.slice();
			newList.splice(i, 1);

			this.setState({
				data: newList,
				btn: false
			});
		}
	}, {
		key: "resetForm",
		value: function resetForm() {
			this.setState({
				data: this.props.data,
				btn: true
			});
		}
	}, {
		key: "render",
		value: function render() {
			var items = this.state.data.map(function (data, i) {
				return React.createElement(
					"div",
					{
						style: { transitionDelay: i * 0.1 + "s" },
						className: "card__container",
						key: data.key
					},
					React.createElement(
						"div",
						{ className: "card__content" },
						React.createElement(Notification, {
							data: data,
							key: data.key,
							deleteMessage: this.deleteMessage.bind(this, i)
						})
					)
				);
			}.bind(this));
			return React.createElement(
				"div",
				{ className: "wrapper" },
				React.createElement(Header, {
					resetForm: this.resetForm.bind(this),
					addMessage: this.addMessage.bind(this),
					btn: this.state.btn
				}),
				React.createElement(
					ReactCSSTransitionGroup,
					{
						component: "div",
						transitionName: "example",
						transitionAppear: true,
						transitionEnter: true,
						transitionLeave: true,
						className: "card__wrapper"
					},
					items
				)
			);
		}
	}]);

	return Parent;
}(React.Component);

ReactDOM.render(React.createElement(Parent, { data: dataArray }), document.getElementById("app"));