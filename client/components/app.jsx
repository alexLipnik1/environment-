import React from 'react';
import MainPage from './mainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blabla } from './mainPage';

export default () => (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
);
