import React from 'react';
import $ from 'jquery';
import styles from './app.scss';
import { DatePicker, TimePicker, RaisedButton, AppBar, Drawer } from 'material-ui';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default class MainPage extends React.Component {
	state ={
	}


	render() {
		return (
			<div className={styles.container}>
				<div className={styles.control}>
					<div className={styles.product}>
						<div className={styles.main-picture-container}></div>
						<div className={styles.brif}></div>
						<div className={styles.product-story}></div>
					</div>
					<div className={styles.information}></div> 
				</div>
			</div>
		)
	}
}
