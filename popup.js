document.addEventListener("DOMContentLoaded", function(event) {
	var entries = localStorage.getItem("entries");
	if(entries) {
		entries = JSON.parse(entries);
		for(i = 0; i < entries.length; i++) {
			addReminder(entries, entries[i]);
		}
	}
	document.getElementById("hour").addEventListener("focus", function() {
		this.select();
	});
	document.getElementById("minutes").addEventListener("focus", function() {
		this.select();
	});
	document.getElementById("minutes").addEventListener("blur", function() {
		var minute = parseInt(this.value);
		if(isNaN(minute)) 
			minute = "00";
		else if(minute < 10)
			minute = "0" + minute;
		this.value = minute;
	});
	document.getElementById("create-reminder").addEventListener("click", function() {
		if(!entries) 
			entries = [];
		var hour = document.getElementById("hour").value;
		var minute = document.getElementById("minutes").value;
		var note = document.getElementById("note").value;
		var meridiem;

		if(document.getElementById("am").checked)
			meridiem = "AM"
		else
			meridiem = "PM";

		var flag = 0;
		if(hour.match(/^[0-9]+$/) === null || hour > 12 || hour < 0) {
			document.getElementById("hour").style.border = "solid 1px red";
			flag = 1;
		}
		else {
			hour = parseInt(hour, 10);
			document.getElementById("hour").style.border = "";
		}
		if(minute.match(/^[0-9]+$/) === null || minute > 60 || minute < 0) {
			document.getElementById("minutes").style.border = "solid 1px red";
			flag = 1;
		}
		else {
			minute = parseInt(minute, 10);
			document.getElementById("minutes").style.border = "";
		}
		if(flag)
			return;

		if(minute<10)
			minute = "0" + minute;

		var entry = [hour, minute, meridiem, note];
		entries.push(entry);
		localStorage.setItem("entries", JSON.stringify(entries));
		addReminder(entries, entry);

		document.getElementById("hour").value = "";
		document.getElementById("minutes").value = "";
		document.getElementById("note").value = "";
	});
	document.getElementById("clear").addEventListener("click", function() {
		window.localStorage.clear();
		var saved = document.getElementById("saved");
		while(saved.firstChild) {
			saved.removeChild(saved.firstChild);
		}
	});
});

function addReminder(entries, entry) {
	var saved = document.getElementById("saved");
	var child = document.createElement("div");
	child.innerHTML = entry[0] + ":" + entry[1] + " " + entry[2] + " " + entry[3] + " ";
	saved.appendChild(child);

	var remove = document.createElement("button");
	remove.class = "remove";
	remove.innerHTML = "X"
	remove.addEventListener("click", function() {
		var idx = entries.indexOf(entry);
		var node = saved.childNodes[idx];
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
		saved.removeChild(node);
		entries.splice(idx, 1);
		localStorage.setItem("entries", JSON.stringify(entries));
	});
	child.appendChild(remove);
}