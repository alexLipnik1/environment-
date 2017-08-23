import React from 'react';
import $ from 'jquery';

export default class App extends React.Component {
  sendRequest = () => {
    $.ajax({
		url: '/get-data',
		success(data){ console.log(data) },
		dataType: 'json',
	})
  }

  render () {
    return (<a onClick={this.sendRequest}>get</a>)
  }
}
