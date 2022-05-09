import React, { Component } from "react";
import CategoryDataService from "../services/categoryService";

export default class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeIsIncome = this.onChangeIsIncome.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.newCategory = this.newCategory.bind(this);
    this.state = {
      id: null,
      name: "",
      isIncome: false
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeIsIncome(e) {
    this.setState({
      isIncome: e.target.value
    });
  }
  saveCategory() {
    var data = {
      name: this.state.name,
      isIncome: this.state.isIncome
    };
    CategoryDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          isIncome: response.data.isIncome
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newCategory() {
    this.setState({
      id: null,
      name: "",
      isIncome: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCategory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="isIncome"
                required
                checked={this.state.isIncome === false ? false : true}
                onChange={this.onChangeIsIncome}
                name="isIncome"
              />
              <label className="form-check-label" htmlFor="isIncome">Is Income</label>
            </div>
            <button onClick={this.saveCategory} className="btn btn-success">
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}
