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


var current_floorplan;
var current_deployment;

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
function onFloorplanChange(floorplan_id){
	 var parameters = {"floorplan_id" : floorplan_id};
	 current_floorplan = floorplan_id;
	 $.ajax({
		 url:'/ibeaconapp/deployment/',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
				 var html = "";
				 for(var i=0; i<data.deploymentlist.length; i++){
				 html += '<option>';
				 html += data.deploymentlist[i];
				 html += '</option>';
	 		}
			 document.getElementById("deployment_sel").innerHTML = html;
		 },
		 failure: function(){alert('Failed to get floorplan list from server...');}
	 });
	 
	 showFloorplan(floorplan_id);
}

//process deployment selection change
function onDeploymentChange(deployment_id){
	 var parameters = {"deployment_id" : deployment_id, "floorplan_id" : current_floorplan};
	 current_deployment = deployment_id;
	 $.ajax({
		 url:'/ibeaconapp/dataset/',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
			 var html = "";
			 for(var i=0; i<data.datasetlist.length; i++){
			 html += '<option>';
			 html += data.datasetlist[i];
			 html += '</option>';
	 		}
	 document.getElementById("dataset_sel").innerHTML = html;
		 },
	 });
	 
	 // you may want to show the deployment when the user select one
	 showDeployment(current_floorplan,deployment_id);
	 
}

//process dataset selection change
function onDatasetChange(dataset_id){
	// you may want to show dataset when user select one
	showDataset(current_floorplan,current_deployment,dataset_id);
}


function showFloorplan(floorplan_id){
	// show the floorplan here, you may need further AJAX calls to get the floorplan details back
	alert("showing the floorplan");
}

function showDeployment(floorplan_id,deployment_id){
	// show the deployment here, you may need further AJAX calls to get the deployment details back
	alert("showing the deployment");
}

function showDataset(floorplan_id,deployment_id,dataset_id){
	// show the dataset here, you may need further AJAX calls to get the dataset details back
	alert("showing the dataset");
}