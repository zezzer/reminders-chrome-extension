document.addEventListener("DOMContentLoaded", function(event) {
	var hours = localStorage.getItem("hour");
	if(hours) {
		hours = JSON.parse(hours);
		for(i = 0; i < hours.length; i++) {
			addReminder(hours, hours[i]);
		}
	}
	document.getElementById("create-reminder").addEventListener("click", function() {
		if(!hours) 
			hours = [];
		var hour_elem = document.getElementById("hour");
		hours.push(hour_elem.value);
		localStorage.setItem("hour", JSON.stringify(hours));
		addReminder(hours, hour_elem.value);
		hour_elem.value = "";
	});
	document.getElementById("clear").addEventListener("click", function() {
		window.localStorage.clear();
		var saved = document.getElementById("saved");
		while(saved.firstChild) {
			saved.removeChild(saved.firstChild);
		}
		document.style.height="300px"
	});
});

function addReminder(hours, val) {
	var saved = document.getElementById("saved");
	var child = document.createElement("div");
	child.innerHTML = val;
	saved.appendChild(child);

	var remove = document.createElement("button");
	remove.class = "remove";
	remove.innerHTML = "X"
	remove.addEventListener("click", function() {
		var idx = hours.indexOf(val);
		var node = saved.childNodes[idx];
		saved.removeChild(node);
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
		hours.splice(idx, 1);
		localStorage.setItem("hour", JSON.stringify(hours));
	});
	child.appendChild(remove);
}