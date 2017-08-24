import React from 'react';
import $ from 'jquery';
import styles from './app.scss';
import Map from './mapContainer.jsx';
import { DatePicker, SelectField, MenuItem } from 'material-ui';

export const blabla = 5;
export default class MainPage extends React.Component {
	sendRequest = () => {
		$.ajax({
			url: '/get-data',
			success(data) { console.log(data) },
			dataType: 'json',
		})
	}

	// <a onClick={this.sendRequest}>get</a>

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.control}>
					<div className={styles.dateControl}>
						<DatePicker floatingLabelText="Date" />
						<div className={styles.time}>
							<SelectField
								floatingLabelText="Hours"
								onChange={this.handleChange}
							>
								<MenuItem value={1} primaryText="Never" />
							</SelectField>
							<SelectField
								floatingLabelText="Minutes"
								onChange={this.handleChange}
							>
								<MenuItem value={1} primaryText="Never" />
							</SelectField>
						</div>
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
