var BugFilter = React.createClass({
  displayName: "BugFilter",

  render: function () {
    console.log("Rendering BugFilter");
    return React.createElement(
      "div",
      null,
      "A way to filter the list of bugs would come here."
    );
  }
});

var BugRow = React.createClass({
  displayName: "BugRow",

  render: function () {
    console.log("Rendering BugRow:", this.props.bug);
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
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function (bug) {
      return React.createElement(BugRow, { key: bug.id, bug: bug });
    });
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
    console.log("Rendering BugAdd");
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "bugAdd" },
        React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
        React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
        React.createElement(
          "button",
          { onClick: this.handleSubmit },
          "Add Bug"
        )
      )
    );
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({ owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      priority: 'P1'
    });
    //clear the form for next input
    form.owner.value = "";
    form.title.value = "";
  }
});

var bugData = [{ id: 1, priority: 'P1', status: 'Open', owner: 'Ravan', title: 'App crashes on open' }, { id: 2, priority: 'P2', status: 'New', owner: 'Eddie', title: 'Misaligned border on panel' }];

var BugList = React.createClass({
  displayName: "BugList",

  getInitialState: function () {
    return { bugs: bugData };
  },
  render: function () {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Bug Tracker"
      ),
      React.createElement(BugFilter, null),
      React.createElement("hr", null),
      React.createElement(BugTable, { bugs: this.state.bugs }),
      React.createElement(
        "button",
        { onClick: this.testNewBug },
        "Add Bug"
      ),
      React.createElement("hr", null),
      React.createElement(BugAdd, { addBug: this.addBug })
    );
  },

  testNewBug: function () {
    var nextId = this.state.bugs.length + 1;
    this.addBug({ id: nextId, priority: 'P2', status: 'New', owner: 'Pieta', title: 'Warning on console' });
  },

  addBug: function (bug) {
    console.log("Adding bug:", bug);
    // We're advised not to modify the state, it's immutable. So, make a copy.
    var bugsModified = this.state.bugs.slice();
    bug.id = this.state.bugs.length + 1;
    bugsModified.push(bug);
    this.setState({ bugs: bugsModified });
  }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));