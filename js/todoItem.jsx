var app = app || {};

(function () {
	'use strict';

	var ENTER_KEY = 13,
	ESCAPE_KEY = 27;

	app.TodoItem = React.createClass({

	toggle: function(todo) {
		this.props.store.toggle(todo);
		return this;
	},

	delete: function(todo) {
		this.props.store.destroy(todo);
		return this;
	},

	edit: function(todo, event) {
		var editNode = React.findDOMNode(this.refs.editField);
		editNode.value = this.props.todo.title;	// load the text field with the current value to edit
		editNode.focus(); // this was a real pain
		editNode.setSelectionRange(editNode.value.length , editNode.value.length);
		// add editing class to list field node
		React.findDOMNode(this.refs.todoListField).className += " editing";
		return this;
	},

	save: function(todo) {
		var editNode = React.findDOMNode(this.refs.editField);
		var value = editNode.value.trim();

		if (value === "") {
			this.delete(todo);
			this.removeEditingClassFromListNode();
			return this;
		}
		this.props.store.save(todo, value);
		// remove editing class from list field node
		this.removeEditingClassFromListNode();
		return this;
	},

	removeEditingClassFromListNode: function() {
		React.findDOMNode(this.refs.todoListField).className = (this.props.todo.completed) ? 'completed' : '';
		return this;
	},

	handleKeyDown: function(event) {
		// save op for ENTER
		if (event.keyCode === ENTER_KEY) {
			this.save(this.props.todo);
			return ;
		}

		// for all other keys this is a NO-OP
		return;
	},

	render: function () {
		var listClass = (this.props.todo.completed) ? 'completed' : '',
		todo = this.props.todo;

		return (
			<li className = {listClass} ref="todoListField">
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onClick = {this.toggle.bind(this, todo)}
					/>
					<label onDoubleClick = {this.edit.bind(this, todo)}>
						{this.props.todo.title}
					</label>
					<button className="destroy" onClick = {this.delete.bind(this, todo)}/>
				</div>
				<input
					ref="editField"
					className="edit"
					onBlur = {this.save.bind(this, todo)}
					onKeyDown = {this.handleKeyDown}
				/>
			</li>
		);
	}
	});
})();
