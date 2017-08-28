import React from 'react';
import $ from 'jquery';
import styles from './app.scss';
import Map from './mapContainer.jsx';
import { DatePicker, TimePicker, RaisedButton, AppBar, Drawer } from 'material-ui';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default class MainPage extends React.Component {
	state ={
		date: new Date(2017, 2, 31),
		time: new Date(0, 0, 0, 23, 3, 38),
		activeUsersData: [],
		inactiveUsersData: [],
		open: false,
	}

	handleToggle = () => this.setState({open: !this.state.open});

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

		var _date1 = moment(new Date(year, month, day, hours1, minutes, seconds)).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
		var _date2 = moment(new Date(year, month, day, hours2, minutes, seconds)).format('YYYY-MM-DD[T]HH:mm:ss[Z]')

		$.ajax({
			url: '/get-geo-data',
			data: {from: _date1, to: _date2},
			success: ([tag, geo]) => { 
				const activeUsers = [];
				const inactiveUsers = [];
				const activeIds = tag.map(v => v.client_id);
				geo.forEach(g => {
					if(activeIds.includes(g.client_id)){
						activeUsers.push(g);
					}
					else{
						inactiveUsers.push(g);
					}
				})
				this.setState({
					inactiveUsersData: inactiveUsers,
					activeUsersData: activeUsers
				})
			},
			dataType: 'json',
		})
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.control}>
					<RaisedButton
						className={styles.raisedButton}
						label="Time and Date"
						onClick={this.handleToggle}
					/>
					<Drawer width={200} openSecondary={true} open={this.state.open} >
						<AppBar onClick={this.handleToggle} title="AppBar" />
						<div className={styles.dateControl}>
							<DatePicker onChange={this.updateDate} value={this.state.date} />
							<div className={styles.time}>
								<TimePicker
									hintText="Select Time"
									autoOk={true}
									format='ampm'
									onChange={this.updateTime}
									value={this.state.time}
								/>		
							</div>
							<Button className={styles.sendButton} bsStyle="primary" block onClick={this.handleClick}>Send</Button>
						</div>
					</Drawer>
				</div>
				<div className={styles.map_control}>
					<div className={styles.map}>
						<Map active={this.state.activeUsersData} inactive={this.state.inactiveUsersData} />
					</div>
				</div>
			</div>
		)
	}
}
