	// page loaded
	$(document).ready(function($) {

		// form data saving
		$("#mainform").submit(lib.Save);

		// online/offline event handler
		if (window.sessionStorage) {
			checkMyNet.ChangeStatus();
			$(window).bind('online offline', checkMyNet.ChangeStatus);
	
		}
		
		// load data
		lib.Load();

	});

	// online/offline library ///////////////////////////////////////////////////////
	var lib = lib || {};

	checkMyNet = function() {

		var online = true;

		// is browser online?
		function Online() { return navigator.onLine; }
		
		// online/offline event
		function ChangeStatus() {
			if (online != Online()) {
				online = Online();
				
				var myStatus = $("#status");
				
				myStatus.text(online ? "Online" : "Offline");
				
				if (online) myStatus.removeClass("offline");
				
				else myStatus.addClass("offline");

				
			}
		}
		
		return {
			Online: Online,
			ChangeStatus: ChangeStatus
		};

	}();

	
	
	// save data online or offline //////////////////////////////////////////////////////////////////////
	lib.Save = function(e) {

		e.preventDefault();
		
		if (checkMyNet.Online() || !window.sessionStorage) {
		
			
	// CUSTOM AJAX POST//////////////

		var hr = new XMLHttpRequest();
		// Create some variables we need to send to our PHP file
		//var url = "my_parse_file.php";
		var url = "connect_insert.php";
		var fn = document.getElementById("first_name").value;
		var ln = document.getElementById("last_name").value;
		var mn = document.getElementById("mobile").value;
		var vars = "first="+fn+"&last="+ln+"&mobile="+mn;
		
		hr.open("POST", url, true);
		// Set content type header information for sending url encoded variables in the request
		hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// Access the onreadystatechange event for the XMLHttpRequest object
		hr.onreadystatechange = function() {
			if(hr.readyState == 4 && hr.status == 200) {
				var return_data = hr.responseText;
				document.getElementById("status2").innerHTML = return_data;
			}
		}
		// Send the data to PHP now... and wait for response to update the status div
		hr.send(vars); // Actually execute the request
		document.getElementById("status2").innerHTML = "processing...";
		
		
	// END CUSTOM AJAX POST ////////////////////////////////////////////////////////////		
			
	// save data online
		alert("Data has been saved online.\n(But not in localStorage!)");
			
		}
		else {
		
			// save data offline
			$("#mainform input").each(function(i) {
				window.sessionStorage.setItem(this.id, this.value);
			});
			alert("Data has been saved offline.");

		}

	};

	// load data online or offline  //////////////////////////////////////////////////////////////////////
	
	lib.Load = function() {

		if (checkMyNet.Online() || !window.sessionStorage) {
		
			// load data online
			alert("Currently online:\ndata could be loaded from server.");
		
		}
		else {
		
			// load data offline
			$("#mainform input").each(function(i) {
				this.value = window.sessionStorage.getItem(this.id);
			});
			alert("Data has been loaded from offline store.");

		}

	};