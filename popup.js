document.addEventListener("DOMContentLoaded", function(event) {
	var hour = localStorage.getItem("hour");
	if(hour) {
		hour = JSON.parse(hour);
		for(i = 0; i < hour.length; i++) {
			addReminder(hour[i]);
		}
	}
	document.getElementById("create-reminder").addEventListener('click', function() {
		if(!hour) 
			hour = [];
		var txt = document.getElementById("hour").value;
		hour.push(txt);
		localStorage.setItem("hour", JSON.stringify(hour));
		chrome.extension.getBackgroundPage().console.log(hour);
		addReminder(txt);
	});
	document.getElementById("clear").addEventListener('click', function() {
		if(hour) {
			window.localStorage.clear();
			document.getElementById("saved").innerHTML = "";
		}
	});
});

function addReminder(val) {
	var child = document.createElement("div");
	child.innerHTML = val;
	document.getElementById("saved").appendChild(child);
}