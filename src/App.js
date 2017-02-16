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
		this.state = { todos: props.todos };
	}

	add() {
		this.props.todos.push( ReactDOM.findDOMNode( this.refs.newItemValue ).value );
		ReactDOM.findDOMNode( this.refs.newItemValue ).value = '';
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		this.setState( { todos: this.props.todos } );
	}

	done() {
		this.props.todos.splice( this.props.todos.indexOf( this.props.todo ), 1 );
		localStorage.setItem( 'todos', JSON.stringify( this.props.todos ) );
		this.setState( { todos: this.props.todos } );
	}

	render() {
		return (
			<div>
				<h1>Todos: {this.props.todos.length}</h1>
				<ul>
				{
					this.state.todos.map( function( todo ) {
						return <ToDoItem key={this.state.todos.indexOf( todo )} todo={todo} done={this.done.bind(this)} />
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
		return (
			<ToDoList todos={todos} />
		);
	}
}
export default App;
