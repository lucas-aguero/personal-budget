import React, { Component } from "react";
import CategoryDataService from "../services/categoryService";
import { Link } from "react-router-dom";

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.removeAllCategories = this.removeAllCategories.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveCategories();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }
  retrieveCategories() {
    CategoryDataService.getAll()
      .then(response => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });
  }
  setActiveCategory(category, index) {
    this.setState({
      currentCategory: category,
      currentIndex: index
    });
  }
  removeAllCategories() {
    CategoryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    CategoryDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchName, categories, currentCategory, currentIndex } = this.state;
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search by name" value={searchName} onChange={this.onChangeSearchName}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.searchName}> Search </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Categories List</h4>
                <ul className="list-group">
                    {categories && categories.map((category, index) => (
                        <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveCategory(category, index)} key={index}> {category.name}
                        </li>
                    ))}
                </ul>
                <Link
                    to={"/categoriesadd"}
                    className="m-3 btn btn-sm btn-success"
                >
                    Add
                </Link>
            </div>
            <div className="col-md-6">
            {currentCategory ? (
                <div>
                <h4>Category</h4>
                <div>
                    <label>
                    <strong>Name:</strong>
                    </label>{" "}
                    {currentCategory.name}
                </div>
                <div className="form-check form-switch">
                    <input
                type="checkbox"
                className="form-check-input"
                id="isIncome"
                required
                checked={currentCategory.isIncome === false ? false : true}
                name="isIncome"
              />                    

                    <label className="form-check-label">
                    <strong>Is Income:</strong>
                    </label>{" "}
                </div>
                <Link
                    to={"/categories/" + currentCategory.id}
                    className="badge badge-warning"
                >
                    Edit
                </Link>
                </div>
            ) : (
                <div>
                <br />
                <p>Please click on a category...</p>
                </div>
            )}
            </div>
        </div>
    );
  }
}
