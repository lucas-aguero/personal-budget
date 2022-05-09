import React, { Component } from "react";
import { Route , Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CategoriesList from "./components/categoriesList";
import CategoriesAdd from "./components/categoriesAdd";
import Categories from "./components/categories";
import TransactionsList from "./components/transactionsList";
import TransactionsAdd from "./components/transactionsAdd";
import Transactions from "./components/transactions";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Personal Budget
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/categories" component={CategoriesList} />
            <Route exact path="/categoriesadd" component={CategoriesAdd} />
            <Route path="/categories/:id" component={Categories} />
            <Route exact path="/transactions" component={TransactionsList} />
            <Route exact path="/transactionsadd" component={TransactionsAdd} />
            <Route path="/transactions/:id" component={Transactions} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
