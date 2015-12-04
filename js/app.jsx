var app = app || {};

(function () {
	'use strict';

	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({
		getInitialState: function () {
			return {
				editing: null
			};
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = React.findDOMNode(this.refs.newField).value.trim();

			if (val) {
				this.props.store.addTodo(val);
				React.findDOMNode(this.refs.newField).value = '';
			}
		},

		toggle: function(todo) {
			this.props.store.toggle(todo);
			return this;
		},

		delete: function(todo) {
			this.props.store.destroy(todo);
			return this;
		},

		edit: function(todo) {
			this.setState({editing: todo.id});
			return this;
		},

		render: function () {
			var footer,
			main,
			todos = this.props.store.todos,
			itemsLeft =  todos.length
			todoItems = [];

			todos.forEach(function(todo) {
				todoItems.push(
				<TodoItem
					todo = {todo}
					edit = {this.edit.bind(this, todo)}
					toggle = {this.toggle.bind(this, todo)}
					delete = {this.delete.bind(this, todo)}
					save = {}/>
				)
			}, this);

			footer = <TodoFooter
	        count= {itemsLeft}
      />;

			main = (
				<section className="main">
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);

			return (
				<div>
					<header className="header">
						<h1>Gild Todos</h1>
						<input
							ref="newField"
							className="new-todo"
							placeholder="What needs to be done?"
							onKeyDown={this.handleNewTodoKeyDown}
							autoFocus={true}
						/>
					</header>
					{main}
					{footer}
				</div>
			);
		}
	});

	var store = app.store = new app.TodoModel('react-todos');

	function render() {
		React.render(
			<TodoApp store={store}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}

  store.subscribe(render);
	render();
})();
