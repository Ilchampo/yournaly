import React from 'react';

import { config } from '@lib/config';
import { ErrorService } from '@services/error.service';
import { createRoot } from 'react-dom/client';

import '@lib/i18n';

import './index.css';

import App from './App';

ErrorService.configure({
	enableConsoleLogging: true,
	enableRemoteLogging: config.app.environment === 'production',
	maxRetries: 3,
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
