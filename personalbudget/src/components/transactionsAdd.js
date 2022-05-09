import React, { Component } from "react";
import TransactionDataService from "../services/transactionService";

export default class TransactionAdd extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDetail = this.onChangeDetail.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeIsIncome = this.onChangeIsIncome.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.state = {
      id: null,
      date: null,
      datail: "",
      amount: 0,
      isIncome: false,
      userId: null,
      categoryId: null
    };
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeDetail(e) {
    this.setState({
      detail: e.target.value
    });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }
  onChangeIsIncome(e) {
    this.setState({
      isIncome: e.target.value
    });
  }
  onChangeUserId(e) {
    this.setState({
      userId: e.target.value
    });
  }
  onChangeCategoryId(e) {
    this.setState({
      categoryId: e.target.value
    });
  }

  saveTransaction() {
    var data = {
      date: this.state.date,
      detail: this.state.detail,
      amount: this.state.amount,
      isIncome: this.state.isIncome,
      userId: this.state.userId,
      categoryId: this.state.categoryId
    };
    TransactionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          date: response.data.date,
          detail: response.data.detail,
          amount: response.data.amount,
          isIncome: response.data.isIncome,
          userId: response.data.userId,
          categoryId: response.data.categoryId
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newTransaction() {
    this.setState({
      id: null,
      date: null,
      datail: "",
      amount: 0,
      isIncome: false,
      userId: null,
      categoryId: null
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTransaction}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="detail">Detail</label>
              <input
                type="text"
                className="form-control"
                id="detail"
                required
                value={this.state.detail}
                onChange={this.onChangeDetail}
                name="detail"
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                required
                value={this.state.amount}
                onChange={this.onChangeAmount}
                name="amount"
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
            <button onClick={this.saveTransaction} className="btn btn-success">
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}
