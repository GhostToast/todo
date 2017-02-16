import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class ToDoItem extends Component {
	done() {
		this.props.done(this.props.todo);
	}
	render() {
		return <li onClick={this.done}>{this.props.todo}</li>
	}
}

class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = { todos: this.props.todos };
	}

	add() {
		let todos = this.props.todos;
		todos.push( ReactDOM.findDOMNode( this.refs.newItemValue ).value );
		ReactDOM.findDOMNode( this.refs.newItemValue ).value = '';
		localStorage.setItem( 'todos', JSON.stringify( todos ) );
		this.setState( { todos: todos } );
	}

	done() {
		let todos = this.props.todos;
		todos.splice( todos.indexOf( todos ), 1 );
		localStorage.setItem( 'todos', JSON.stringify( todos ) );
		this.setState( { todos: todos } );
	}

	render() {
		return (
			<div>
				<h1>Todos: {this.props.todos.length}</h1>
				<ul>
				{
					this.state.todos.map( function( todo ) {
						return <ToDoItem todo={todo} done={this.done} />
					}.bind( this ) )
				}
				</ul>
				<input name="newItemValue" type="text" />
				<input name="newItemButton" type="button" color='blue' value="Add New Item" onClick={this.add} />
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
