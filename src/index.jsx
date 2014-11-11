import React from 'react';

var ESC_KEY = 27;
var ENTER_KEY = 13;
var COMMA_KEY = 188;
var TAB_KEY = 9;
var SPACE_KEY = 0;
var SPACE1_KEY = 32;
var BACKSPACE_KEY = 8;

var Tag = React.createClass({
  render() {
    var {tag, handleRemove} = this.props;

    return (
      <span className="tags-input-item">
        <span>{tag}  </span>
        <a title="Remove tag" onClick={handleRemove}>x</a>
      </span>
    );
  }
});

export default React.createClass({

  getInitialState() {
    return {userInput: ''};
  },

  handleRemove(tag) {
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

    // Store tag when delimeter is detected
    if ( -1 !== keys.indexOf(charCode) ) {
      e.preventDefault();
      if (this.state.userInput.length !== 0)
        this.addTag(this.state.userInput);
      this.clearAndFocusInput();
    }

    // Delete the last tag if backspace is pressed
    if ( charCode === BACKSPACE_KEY
      && this.state.userInput.length === 0 ) {
      this.handleRemove(this.props.tags[this.props.tags.length-1]);
    }
  },

  handleChange(e) {
    this.setState({userInput: e.target.value});      
  },

  handleClick(e) {
    this.refs.userInput.getDOMNode().focus();
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
      <div className="tags-input-container" onClick={this.handleClick}>
        <div className="tags-input-list">
          {tags.map( tag => 
            <Tag tag={tag} 
              key={tag}
              handleRemove={this.handleRemove.bind(this, tag)} />
          )}
        </div>
        <div>
          <input type="text" ref="userInput"  
            className="tags-input-input"
            value={this.state.userInput}
            onKeyDown={this.handleKeydown} 
            onChange={this.handleChange} /> 
        </div>
        <div className="tags_clear"></div>
      </div>
    );
  }

});
