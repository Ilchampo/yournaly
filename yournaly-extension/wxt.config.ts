import type { WxtViteConfig } from 'wxt';

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'wxt';

import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	modules: ['@wxt-dev/module-react'],
	dev: {
		server: {
			port: 8080,
		},
	},
	manifest: {
		name: 'Yournaly',
		description: 'Yournaly is a tool that helps you learn a new language by writing in it. Have fun learning!',
		version: '1.1.1',
		homepage_url: 'https://yournaly.p4blobeltran.com',
		permissions: ['sidePanel', 'storage', 'identity'],
		host_permissions: ['https://api.yournaly.p4blobeltran.com/*'],
		key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtHKeIku5wRpJ8/pOPfOKiBsDCjzmkgiBXCbqlriqzEFAJZX8/cJerfSl3aTNGizLENamr6iXZRr13sJ8QToDAkwNwEgw562QhHuVCkjJrV9sl8cju/azU6Gwh4aRmQtcm5WBd0okmnAwqkyAskjE2lRwYU9wf0aCurRJOwsI1RXhzcCeRpm6kVTAr32sEUUXBaNppvqP+8/uK3RTdGHylZUgnkUrbKffWB8H4LLlI8pw5LMiXnF7f0gZeuzWp5UaJh4XBIGuKXzQjJgcDyUWDpc3UtYFiZp7O2wa4GBaSgAhQwCERrhbWFuLWKd7OoO1P739ktqL0NgePqBnPIqUVwIDAQAB',
		oauth2: {
			client_id: '347050751960-elgl3u5f5np1rmjsnapn6932616bi08p.apps.googleusercontent.com',
			scopes: ['profile', 'email'],
		},
		side_panel: {
			default_path: 'sidepanel/index.html',
		},
		action: {
			default_title: 'Open Yournaly',
		},
	},
	vite: () =>
		({
			plugins: [tailwindcss()],
			resolve: {
				alias: {
					'@': resolve(__dirname, 'entrypoints/sidepanel'),
					'@components': resolve(__dirname, 'entrypoints/sidepanel/components'),
					'@pages': resolve(__dirname, 'entrypoints/sidepanel/pages'),
					'@lib': resolve(__dirname, 'entrypoints/sidepanel/lib'),
					'@stores': resolve(__dirname, 'entrypoints/sidepanel/lib/stores'),
					'@services': resolve(__dirname, 'entrypoints/sidepanel/lib/services'),
					'@constants': resolve(__dirname, 'entrypoints/sidepanel/lib/constants'),
					'@interfaces': resolve(__dirname, 'entrypoints/sidepanel/lib/interfaces'),
					'@utils': resolve(__dirname, 'entrypoints/sidepanel/lib/utils'),
					'@hooks': resolve(__dirname, 'entrypoints/sidepanel/hooks'),
				},
			},
			server: {
				port: 8080,
				strictPort: true,
			},
		}) as WxtViteConfig,
});
