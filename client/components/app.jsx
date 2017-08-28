import React from 'react';
import MainPage from './mainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default () => (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
);
