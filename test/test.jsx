import React from 'react/addons';
import TagsInput from '../src';
import _ from 'lodash';

var TestApp = React.createClass({

  getInitialState() {
    return {
      tags: ["a", "b", "c"]
    }
  },

  removeTag(tag) {
    this.setState(_.pull(this.state.tags, tag));
  },

  addTag(tag) {
    if (-1 === this.state.tags.indexOf(tag)) {
      var newTags = React.addons.update(this.state.tags, {$push:[tag]});
      this.setState({tags: newTags});
    }
  },

  render() {
    return (
      <div>
      <TagsInput 
        tags={this.state.tags} 
        removeTag={this.removeTag} 
        addTag={this.addTag} /> 
      {JSON.stringify(this.state.tags)}
      </div>
    );
  }
});

React.render(
  <TestApp />,
  document.getElementById('test')
);