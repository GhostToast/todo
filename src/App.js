import React, {Component} from 'react';
import ReactDOM from 'react-dom'; // Need this to find DOM elements.
import './App.css';

/**
 * Generic handler for to-do (list) items. Handles mapping "done" property of items.
 */
class ToDoItem extends Component {
	done() {
		this.props.done(this.props.todo);
	}
	render() {
		return <li onClick={this.done.bind(this)}>{this.props.todo}</li>
	}
}

/**
 * List management.
 */
class ToDoList extends Component {
	/**
	 * Create initial state from passed properties.
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);

		this.state = {
			todos: props.todos,
			finished: props.finished,
		};
	}

	/**
	 * Add a list item to the "to do" list.
	 */
	add() {
		let newTodo = ReactDOM.findDOMNode( this.refs.newItemValue ).value;
		if ( this.props.todos.indexOf( newTodo ) !== -1 ) {
			this.dupeWarn();
			return;
		}
		this.props.todos.push( newTodo );
		ReactDOM.findDOMNode( this.refs.newItemValue ).value = '';
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		this.setState( { todos: this.props.todos } );
	}

	dupeWarn() {
		alert( 'You done messed up A-A-Ron!');
	}

	/**
	 * Clear all items from the "completed" list.
	 */
	clear() {
		localStorage.removeItem( 'finished' );
		this.setState( { finished: [] } );
	}

	/**
	 * Handler for completing a "to-do" from the main list.
	 * Moves the item to the "completed" list and updates storage models.
	 *
	 * @param item
	 */
	complete(item) {
		let finishedKey = this.props.todos.indexOf( item );
		let finishedVal = this.props.todos[ finishedKey ];

		if ( this.props.finished.indexOf( finishedVal ) !== -1 ) {
			this.dupeWarn();
			return;
		}

		this.props.todos.splice( finishedKey, 1 );
		this.props.finished.push( finishedVal );
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		localStorage.setItem( 'finished', JSON.stringify( this.props.finished ) );
		this.setState( {
			todos: this.props.todos,
			finished: this.props.finished,
		} );
	}

	/**
	 * Handler for uncompleting an item from the "completed" list.
	 * Moves the item to the "to-do" list and updates storage models.
	 *
	 * @param item
	 */
	incomplete(item) {
		let unfinishedKey = this.props.finished.indexOf( item );
		let unfinishedVal = this.props.finished[ unfinishedKey ];

		if ( this.props.todos.indexOf( unfinishedVal ) !== -1 ) {
			this.dupeWarn();
			return;
		}

		this.props.finished.splice( unfinishedKey, 1 );
		this.props.todos.push( unfinishedVal );
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		localStorage.setItem( 'finished', JSON.stringify( this.props.finished ) );
		this.setState( {
			todos: this.props.todos,
			finished: this.props.finished,
		} );
	}

	/**
	 * Main view.
	 *
	 * @return {XML}
	 */
	render() {
		return (
			<div>
				<h2>Things To Do: {this.state.todos.length}</h2>
				<ul>
					{
						this.state.todos.map( function( todo ) {
							return <ToDoItem key={this.state.todos.indexOf( todo )} todo={todo} done={this.complete.bind(this)} />
						}.bind( this ) )
					}
				</ul>

				<h2> Things Done: {this.state.finished.length}</h2>
				<ul style={{textDecoration: 'line-through'}}>
					{
						this.state.finished.map( function( todo ) {
							return <ToDoItem key={this.state.finished.indexOf( todo )} todo={todo} done={this.incomplete.bind(this)} />
						}.bind( this ) )
					}
				</ul>

				<input ref="newItemValue" name="newItemValue" type="text" />
				<input ref="newItemButton" name="newItemButton" type="button" value="Add New Item" onClick={this.add.bind(this)} />
				<br />
				<input ref="clearCompleted" name="clearCompleted" type="button" value="Clear Completed Items" onClick={this.clear.bind(this)} />
			</div>
		);
	}
}

/**
 * Wrapper for the stuff.
 */
class App extends Component {

	/**
	 * Instantiate our data models from local if present, else empty arrays.
	 *
	 * @return {XML}
	 */
	render() {
		let todos = JSON.parse(localStorage.getItem('todos')) || [];
		let finished = JSON.parse(localStorage.getItem('finished')) || [];
		return (
			<ToDoList todos={todos} finished={finished} />
		);
	}
}
export default App;
