import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class ToDoItem extends Component {
	done() {
		this.props.done(this.props.todo);
	}
	render() {
		return <li onClick={this.done.bind(this)}>{this.props.todo}</li>
	}
}

class ToDoList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: props.todos,
			finished: props.finished,
		};
	}

	add() {
		this.props.todos.push( ReactDOM.findDOMNode( this.refs.newItemValue ).value );
		ReactDOM.findDOMNode( this.refs.newItemValue ).value = '';
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		this.setState( { todos: this.props.todos } );
	}

	done(todo) {
		let finishedKey = this.props.todos.indexOf( todo );
		let finishedVal = this.props.todos[ finishedKey ];
		this.props.todos.splice( finishedKey, 1 );
		this.props.finished.push( finishedVal );
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		localStorage.setItem( 'finished', JSON.stringify( this.props.finished ) );
		this.setState( {
			todos: this.props.todos,
			finished: this.props.finished,
		} );
	}

	incomplete(todo) {
		let unfinishedKey = this.props.finished.indexOf( todo );
		let unfinishedVal = this.props.finished[ unfinishedKey ];
		this.props.finished.splice( unfinishedKey, 1 );
		this.props.todos.push( unfinishedVal );
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		localStorage.setItem( 'finished', JSON.stringify( this.props.finished ) );
		this.setState( {
			todos: this.props.todos,
			finished: this.props.finished,
		} );
	}

	render() {
		return (
			<div>
				<h2>Things To Do: {this.state.todos.length}</h2>
				<ul>
					{
						this.state.todos.map( function( todo ) {
							return <ToDoItem key={this.state.todos.indexOf( todo )} todo={todo} done={this.done.bind(this)} />
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
				<input ref="newItemButton" name="newItemButton" type="button" color='blue' value="Add New Item" onClick={this.add.bind(this)} />
			</div>
		);
	}
}

class App extends Component {

	render() {
		let todos = JSON.parse(localStorage.getItem('todos')) || [];
		let finished = JSON.parse(localStorage.getItem('finished')) || [];
		return (
			<ToDoList todos={todos} finished={finished} />
		);
	}
}
export default App;
