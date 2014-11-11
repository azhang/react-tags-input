import React from 'react';

var ESC_KEY = 27;
var ENTER_KEY = 13;
var COMMA_KEY = 188;
var TAB_KEY = 9;
var SPACE_KEY = 0;
var SPACE1_KEY = 32;

var Tag = React.createClass({
  render() {
    var {tag, onRemove} = this.props;

    return (
      <div onClick={onRemove}>{tag}</div>
    );
  }
});

export default React.createClass({

  getInitialState() {
    return {userInput: ''};
  },

  onRemove(tag) {
    this.props.removeTag(tag);
  },

  addTag(tag) {
    if ( -1 !== tag.indexOf(',') 
      || -1 !== tag.indexOf(' '))
      return new Error("Don't do that!");
    this.props.addTag(tag);
  },

  handleKeydown(e) {
    var charCode = e.which || e.keyCode;

    var keys = [ESC_KEY, ENTER_KEY, COMMA_KEY, TAB_KEY, SPACE_KEY, SPACE1_KEY];

    if (-1 !== keys.indexOf(charCode)) {
      e.preventDefault();
      this.addTag(this.state.userInput);
      this.clearAndFocusInput();
    }
  },

  handleChange(e) {
    this.setState({userInput: e.target.value});      
  },

  clearAndFocusInput() {
    // Clear the input
    this.setState({userInput: ''}, function() {
      // This code executes after the component is re-rendered
      this.refs.userInput.getDOMNode().focus();   // Boom! Focused!
    });
  },

  render() {
    var {tags} = this.props;

    return (
      <div>
        <div>
          {tags.map( tag => 
            <Tag tag={tag} onRemove={this.onRemove.bind(this, tag)} key={tag} />
          )}
        </div>
        <div>
          <input type="text" ref="userInput"
            value={this.state.userInput}
            onKeyDown={this.handleKeydown} 
            onChange={this.handleChange} /> 
        </div>
      </div>
    );
  }

});
