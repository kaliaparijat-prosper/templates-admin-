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
				this.resetTodoField();
			}
		},

		toggleTodo: function(todo) {
			this.props.store.toggle(todo);
			return this;
		},

		delete: function(todo) {
			this.props.store.destroy(todo);
			return this;
		},

		resetTodoField: function() {
				React.findDOMNode(this.refs.newField).value = '';
				return this;
		},

		render: function () {
			var footer,
			main,
			todoItem,
			todos = this.props.store.todos,
			todoItems = [],
			_this = this;

			todos.forEach(function(todo) {
			if (todo.completed === false) {
						todoItems.push(
						<li>
							<div className="view">
								<input
										className="toggle"
										type="checkbox"
										checked={false}
										onClick={_this.toggleTodo.bind(_this, todo)}
								/>
								<label>
									{todo.title}
								</label>
								<button className="destroy" onClick={_this.delete.bind(_this, todo)}/>
							</div>
						</li>)
				}
				else {
					todoItems.push(
					<li className="completed">
									<div className="view">
										<input
												className="toggle"
												type="checkbox"
												checked={true}
												onClick={_this.toggleTodo.bind(_this, todo)}
										/>
										<label>
											{todo.title}
										</label>
										<button className="destroy" onClick={_this.delete.bind(_this, todo)}/>
									</div>
								</li>
					);
				}
			});

			footer = <TodoFooter
	        count= {todos.length}
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
