chrome.alarms.onAlarm.addListener(function(alarm) {
	if(alarm.name=="remind") {
		alert("ALARM NOTIFICATION");
		var entries = localStorage.getItem("entries");
		if (entries) {
			entries.push(entries[0]);
		}
	}
});