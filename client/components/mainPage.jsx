import React from 'react';
import $ from 'jquery';
import styles from './app.scss';
import Map from './mapContainer.jsx';
import { DatePicker, TimePicker } from 'material-ui';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export const blabla = 5;
export default class MainPage extends React.Component {
	state ={
		date: new Date(2017, 2, 31),
		time: new Date(0, 0, 0, 23, 3, 38),
	}

	updateDate = (event, value) => {
		this.setState({
			date: value
		});
	}

	updateTime = (event, value) => {
		this.setState({
			time: value
		});
	}

	handleClick = () => {
		var year = this.state.date.getFullYear().toString();
		var month = this.state.date.getMonth().toString();
		var day = this.state.date.getDate().toString(); 
		var hours1 = this.state.time.getHours();
		var hours2 = hours1 + 2;
		var minutes = this.state.time.getMinutes().toString();
		var seconds = this.state.time.getSeconds().toString(); 

		console.log(
			hours1
		)
		var _date1 = moment(new Date(year, month, day, hours1, minutes, seconds)).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
		var _date2 = moment(new Date(year, month, day, hours2, minutes, seconds)).format('YYYY-MM-DD[T]HH:mm:ss[Z]')

		console.log('date1', _date1);
		console.log(_date2);
		console.log(this.state)

		$.ajax({
			url: '/get-data',
			data: {from: _date1, to: _date2},
			success(_data) { console.log(_data) },
			dataType: 'json',
		})
	}

	sendRequest = () => {

	}

	// <a onClick={this.sendRequest}>get</a>

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.control}>
					<div className={styles.dateControl}>
						<DatePicker onChange={this.updateDate} floatingLabelText="Select Date" value={this.state.date} />
						<div className={styles.time}>
							<TimePicker
								hintText="Select Time"
								autoOk={true}
								format='ampm'
								onChange={this.updateTime}
								value={this.state.time}
							/>		
						</div>
						<Button className={styles.sendButton} onClick={this.handleClick}>Send</Button>
					</div>
					<div className={styles.userControl} />
				</div>
				<div className={styles.map_control}>
					<div className={styles.map}>
						<Map />
					</div>
				</div>
			</div>
		)
	}
}
