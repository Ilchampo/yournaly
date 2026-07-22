export default defineBackground({
	main() {
		chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

		chrome.runtime.onInstalled.addListener(() => {
			console.log('Yournaly extension installed/updated');

			chrome.sidePanel
				.setPanelBehavior({ openPanelOnActionClick: true })
				.then(() => {
					console.log('Side panel behavior set successfully');
				})
				.catch(error => {
					console.error('Error setting side panel behavior:', error);
				});
		});

		chrome.action.onClicked.addListener(tab => {
			console.log('Extension action clicked');

			chrome.sidePanel
				.open({ windowId: tab.windowId })
				.then(() => {
					console.log('Side panel opened manually');
				})
				.catch(error => {
					console.error('Error opening side panel:', error);
				});
		});
	},
});
