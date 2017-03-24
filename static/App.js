var BugFilter = React.createClass({
	displayName: "BugFilter",

	render: function () {
		return React.createElement(
			"div",
			null,
			" A way to filter bugs that would come here. "
		);
	}
});

var BugRow = React.createClass({
	displayName: "BugRow",

	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.bug.id
			),
			React.createElement(
				"td",
				null,
				this.props.bug.status
			),
			React.createElement(
				"td",
				null,
				this.props.bug.priority
			),
			React.createElement(
				"td",
				null,
				this.props.bug.owner
			),
			React.createElement(
				"td",
				null,
				this.props.bug.title
			)
		);
	}
});

var BugTable = React.createClass({
	displayName: "BugTable",

	render: function () {
		var bugRows = this.props.bugs.map(function (bug) {
			return React.createElement(BugRow, { key: bug.id, bug: bug });
		});
		// Create an array of <BugRow> classes in the render() function 
		// of BugTable based on the passed-in props.bugs, and replace 
		// the hard-coded <BugRow>s with this.

		return React.createElement(
			"table",
			null,
			React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"th",
						null,
						"Id"
					),
					React.createElement(
						"th",
						null,
						"Status"
					),
					React.createElement(
						"th",
						null,
						"Priority"
					),
					React.createElement(
						"th",
						null,
						"Owner"
					),
					React.createElement(
						"th",
						null,
						"Title"
					)
				)
			),
			React.createElement(
				"tbody",
				null,
				bugRows
			)
		);
	}
});
var BugAdd = React.createClass({
	displayName: "BugAdd",

	render: function () {
		return React.createElement(
			"div",
			null,
			" A form to add a new bug would come here. "
		);
	}
});

var bugData = [{ id: 1,
	priority: "P1",
	status: "Open",
	owner: "Ravan",
	Title: "App crashes on open" }, { id: 2,
	priority: "P2",
	status: "New",
	owner: "Eddie",
	Title: "Misaligned border on panel" }];
var BugList = React.createClass({
	displayName: "BugList",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Bug Tracker "
			),
			React.createElement(BugFilter, null),
			React.createElement("hr", null),
			React.createElement(BugTable, { bugs: bugData }),
			React.createElement("hr", null),
			React.createElement(BugAdd, null),
			React.createElement("hr", null)
		);
	}
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));