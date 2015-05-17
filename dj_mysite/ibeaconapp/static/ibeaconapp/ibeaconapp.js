var music_demo = [ 
	              {
	            	  type:'classical',
	            	  content:["Beethoven","Mozart","Tchaikovsky"]
	              },
				  {
	            	  type:'pop',
	            	  content:["Beatles!!!","Corrs","Fleetwood Mac","Status Quo"]
	              }
	         ]

// initialization of home page
function init(){
	var parameters = {};
	$.ajax({
		url: '/ibeaconapp/floorplan/',
		type: 'GET',
		data: parameters,
		accept: 'application/json',
		success: function(data, responseText, jqXHR) {
			 var html = "";
			 for(var i=0; i<data["floorplanlist"].length; i++){
				 html += '<option>';
				 html += data["floorplanlist"][i];
				 html += '</option>';
			 }
			 
			 document.getElementById("floorplan_sel").innerHTML = html;
			 
			},
		failure: function(){alert('Failed to get floorplan list from server...');}
	});
}

// process floorplan selection change
function onFloorplanChange(index){
	 rec = index;
	 var parameters = {};
	 $.ajax({
		 url:'/ibeaconapp/deployment',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
			 var html = "";
			 for(var i=0; i<deployment_list[index].content.length; i++){
			 html += '<option>';
			 html += deployment[index].content[i];
			 html += '</option>';
	 		}
	 document.getElementById("deployment_sel").innerHTML = html;
		 },
	 });
}

//process deployment selection change
function onDeploymentChange(index){
	 rec = index;
	 var parameters = {};
	 $.ajax({
		 url:'/ibeaconapp/deployment',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
			 var html = "";
			 for(var i=0; i<deployment_list[index].content.length; i++){
			 html += '<option>';
			 html += deployment[index].content[i];
			 html += '</option>';
	 		}
	 document.getElementById("deployment_sel").innerHTML = html;
		 },
	 });
}

//process dataset selection change
function onDatasetChange(index){
	
}