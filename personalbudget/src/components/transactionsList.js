import React, { Component } from "react";
import TransactionDataService from "../services/transactionService";
import { Link } from "react-router-dom";

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveTransaction = this.retrieveTransaction.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTransaction = this.setActiveTransaction.bind(this);
    this.removeAllTransactions = this.removeAllTransactions.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      transactions: [],
      currentTransaction: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveTransaction();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }
  retrieveTransaction() {
    TransactionDataService.getAll()
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveTransaction();
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });
  }
  setActiveTransaction(category, index) {
    this.setState({
      currentTransaction: category,
      currentIndex: index
    });
  }
  removeAllTransactions() {
    TransactionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    TransactionDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchName, transactions, currentTransaction, currentIndex } = this.state;
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
                <h4>Transactions List</h4>
                <table class="table">                
                {/* <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Is Income</th>
                  </tr>
                </thead>      */}
                <tbody className="list-group">
                    {transactions && transactions.map((category, index) => (
                      <tr className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveTransaction(category, index)} key={index}> 
                        <td class="mx-auto">{category.date}</td>
                        <td class="mx-auto">{category.detail}</td>
                        <td class="mx-auto">{category.amount}</td>
                      </tr>
                    ))}
                    </tbody>
                </table>
                <Link
                    to={"/transactionsadd"}
                    className="m-3 btn btn-sm btn-success"
                >
                    Add
                </Link>
            </div>
            <div className="col-md-6">
            {currentTransaction ? (
                <div>
                <h4>Transaction</h4>
                <div>
                    <label>
                    <strong>Date:</strong>
                    </label>{" "}
                    {currentTransaction.date}
                </div>
                <div>
                    <label>
                    <strong>Detail:</strong>
                    </label>{" "}
                    {currentTransaction.detail}
                </div>
                <div>
                    <label>
                    <strong>Amount:</strong>
                    </label>{" "}
                    {currentTransaction.amount}
                </div>
                <div className="form-check form-switch">
                    <input
                type="checkbox"
                className="form-check-input"
                id="isIncome"
                required
                checked={currentTransaction.isIncome === false ? false : true}
                name="isIncome"
              />                    

                    <label className="form-check-label">
                    <strong>Is Income:</strong>
                    </label>{" "}
                </div>
                <Link
                    to={"/transactions/" + currentTransaction.id}
                    className="badge badge-warning"
                >
                    Edit
                </Link>
                </div>
            ) : (
                <div>
                <br />
                <p>Please click on a transaction...</p>
                </div>
            )}
            </div>
        </div>
    );
  }
}
