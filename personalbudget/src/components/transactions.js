import React, { Component } from "react";
import TransactionDataService from "../services/transactionService";
export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDetail = this.onChangeDetail.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeIsIncome = this.onChangeIsIncome.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.state = {
      currentTransaction: {
        id: null,
        date: null,
        datail: "",
        amount: 0,
        isIncome: false,
        userId: null,
        categoryId: null      },
      message: ""
    };
  }
  componentDidMount() {
    this.getTransaction(this.props.match.params.id);
  }
  onChangeDate(e) {
    const date = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          date: date
        }
      };
    });
  }
  onChangeDetail(e) {
    const detail = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          detail: detail
        }
      };
    });
  }
  onChangeAmount(e) {
    const amount = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          amount: amount
        }
      };
    });
  }
  onChangeIsIncome(e) {
    const isIncome = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        isIncome: isIncome
      }
    }));
  }
  onChangeUserId(e) {
    const userId = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          userId: userId
        }
      };
    });
  }
  onChangeCategoryId(e) {
    const categoryId = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          categoryId: categoryId
        }
      };
    });
  }




  getTransaction(id) {
    TransactionDataService.get(id)
      .then(response => {
        this.setState({
          currentTransaction: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateTransaction() {
    TransactionDataService.update(
      this.state.currentTransaction.id,
      this.state.currentTransaction
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Transaction was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteTransaction() {    
    TransactionDataService.delete(this.state.currentTransaction.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/transactions')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentTransaction } = this.state;
    return (
      <div>
        {currentTransaction ? (
          <div className="edit-form">
            <h4>Transaction</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={currentTransaction.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="detail">Detail</label>
                <input
                  type="text"
                  className="form-control"
                  id="detail"
                  value={currentTransaction.detail}
                  onChange={this.onChangeDetail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={currentTransaction.amount}
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isIncome"
                  checked={currentTransaction.isIncome === false ? false : true}
                  onChange={this.onChangeIsIncome}
                />
                <label className="form-check-label" htmlFor="isIncome">Is Income</label>
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTransaction}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTransaction}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transaction...</p>
          </div>
        )}
      </div>
    );
  }
}
