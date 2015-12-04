var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({


		render: function () {
			var listClass = (this.props.todo.completed) ? 'completed' : '';
			return (
				<li className = {listClass} doubleClick = {this.props.edit}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onClick = {this.props.toggle}
						/>
						<label>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick = {this.props.delete}/>
					</div>
					<input
						ref="editField"
						className="edit"
						onClick = {this.props.save}
					/>
				</li>
			);
		}
	});
})();
