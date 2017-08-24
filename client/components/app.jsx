import React from 'react';
import $ from 'jquery';
import styles from './app.scss';
import Map from './mapContainer.jsx'


export default class App extends React.Component {
  sendRequest = () => {
    $.ajax({
		url: '/get-data',
		success(data){ console.log(data) },
		dataType: 'json',
	})
  }

  // <a onClick={this.sendRequest}>get</a>

  render () {
    return (
		<div className={styles.container}>
			<div className={styles.control}>
				<div className={styles.dateControl}></div>
				<div className={styles.userControl}></div>
			</div>
			<div className={styles.map_control}>
				<div className={styles.map}>
					<Map />
				</div>
				<div className={styles.information}></div>
			</div>
		</div>
  )}
}
