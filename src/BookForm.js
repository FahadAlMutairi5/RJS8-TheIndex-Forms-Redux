import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";
class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors:[],
};
  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
}

submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state,this.state.authors, this.props.closeModal);
  };
textChangeHandler =async  event => {
    await this.setState({[event.target.name]:event.target.value})
    
};
addAuthor = event => {
	this.setState({authors: [...event.target.selectedOptions].map(o => o.value)})
	
}
  render() {
  	const errors = this.props.errors;
    return (<div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">title</span>
            </div>
            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.textChangeHandler} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">color</span>
            </div>
            <input type="text" className="form-control" name="color" value={this.state.color} onChange={this.textChangeHandler}/>
          </div>
          <div className="form-group">
		      <label htmlFor="exampleFormControlSelect2">select authors</label>
		      <select multiple className="form-control" id="exampleFormControlSelect2" onChange={this.addAuthor}>
		        {this.props.Alluthor.map(author => <option key={author.id} value={author.id}> {author.first_name} {author.last_name}</option>)}
		        
		      </select>
	      </div>
          <input type="submit" />
        </form>
      </div>);
  }
}
const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors,
    author:state.rootAuthor.author,
    Alluthor:state.rootAuthors.authors,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook,author, closeModal) =>
      dispatch(actionCreators.postBook(newBook,author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
