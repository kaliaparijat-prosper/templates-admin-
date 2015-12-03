var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({

    // handle todo item here

		render: function () {
			return (
				<li>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
						/>
						<label>
							ToDo
						</label>
						<button className="destroy" />
					</div>
					<input
						ref="editField"
						className="edit"
					/>
				</li>
			);
		}
	});
})();
