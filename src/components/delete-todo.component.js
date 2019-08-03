import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Datetime from "react-datetime";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    // this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    // this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    // this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    // this.onChangeTodoCreation = this.onChangeTodoCreation.bind(this);
    // this.onChangeTodoCompletion = this.onChangeTodoCompletion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      todo_creation: moment._d,
      todo_completion: ""
    };
  }

  componentDidMount() {
    //console.log(props);
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed,
          todo_creation: response.data.todo_creation,
          todo_completion: response.data.todo_completion
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSubmit(e) {
    //alert("submit");
    e.preventDefault();

    //console.log(obj);
    axios
      .delete(
        "http://localhost:4000/todos/delete/" + this.props.match.params.id
      )
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3 align="center">Delete Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" readOnly={true}>
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
            />
          </div>
          <div className="form-group" readOnly={true}>
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
            />
          </div>
          <div className="form-group" readOnly={true}>
            <label>Creation Time: </label>
            <Datetime value={this.state.todo_creation} />
          </div>

          <div className="form-group" readOnly={true}>
            <label>Completion Time: </label>
            <Datetime value={this.state.todo_completion} />
          </div>

          <div className="form-group" readOnly={true}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline" readOnly={true}>
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline" readOnly={true}>
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check" readOnly={true}>
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input type="submit" value="Delete" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
