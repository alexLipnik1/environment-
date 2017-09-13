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
						<div className={styles.mainPictureContainer}>
							<h1>product Name</h1>
							<div className={styles.picture}>
								<img clasName={styles.imgProporations} src="https://ih0.redbubble.net/image.202496415.4788/flat,800x800,075,f.u2.jpg"/>
							</div>
						</div>
						<div className={styles.brif}></div>
						<div className={styles.productStory}></div>
					</div>
					<div className={styles.information}></div> 
				</div>
			</div>
		)
	}
}
