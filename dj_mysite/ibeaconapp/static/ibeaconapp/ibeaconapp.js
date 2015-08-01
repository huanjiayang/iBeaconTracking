/*var music_demo = [ 
	              {
	            	  type:'classical',
	            	  content:["Beethoven","Mozart","Tchaikovsky"]
	              },
				  {
	            	  type:'pop',
	            	  content:["Beatles!!!","Corrs","Fleetwood Mac","Status Quo"]
	              }
	         ]*/


var current_floorplan;
var current_deployment;
var loc_history;
var sliderleftvalue;
var sliderrightvalue;
var currentfloorplan;
var currentdeployment;
//var start_date;
//var end_date;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

//draw the rssi displaying in canvas
function initDatasetImport(){
	$('#upload-file-btn').click(function() {
	    var form_data = new FormData($('#upload-file')[0]);
	    form_data.append("floorplan_id" , current_floorplan);
	    form_data.append("deployment_id" , current_deployment);
	    $.ajax({
	        type: 'POST',
	        url: '/ibeaconapp/dataset/',
	        data: form_data,
	        contentType: false,
	        cache: false,
	        processData: false,
	        async: false,
	        success: function(data) {
	            alert('Success!');
	            var canvas_fp = document.getElementById("canvas_fp");
				var ctx = canvas_fp.getContext("2d");
				loc_history = data["location_history_list"];
				for(var i=0; i<data["location_history_list"].length; i++){
					ctx.beginPath();
					ctx.arc(data.location_history_list[i].x,data.location_history_list[i].y,2,0,2*Math.PI);
					ctx.stroke();
				}
				enableExportFile();
	        },
	        failure: function(){alert('Failed to get location history list calculated from server...');}
	    });
	});
	/*
	$('#clearcanvas').click(function() {
		$.ajax({
			type: 'POST',
	        success: function(data) {
	        	ctx.clearRect ( 0 , 0 , canvas_fp.width, canvas_fp.height );
	            alert('Success!');
	        }
		})
	})
	*/
}


function enableExportFile(){
	document.getElementById("export-file-btn").disabled = false;
	$('#export-file-btn').click(function() {
		
		var data = loc_history;
		var csvContent = "data:text/csv;charset=utf-8,";
		data.forEach(function(infoArray, index){

		   dataString = infoArray["time"]+","+infoArray["x"]+","+infoArray["y"]
		   csvContent += dataString + "\n";

		});
		
		var encodedUri = encodeURI(csvContent);
		//window.open(encodedUri);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_data.csv");

		link.click();
		
	});
}


function clean(){
	//var canvas_fp = document.getElementById("canvas_fp");
	//var ctx = canvas_fp.getContext("2d");
    //ctx.clearRect(0,0,canvas_fp.width,canvas_fp.height);
    onFloorplanChange(currentfloorplan);
    onDeploymentChange(currentdeployment);
}


function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function initFpCanvas(){
	var canvas_fp = document.getElementById("canvas_fp");
	//Add event listener for `click` events to the floorplan canvas.
	canvas_fp.addEventListener('click', function(event) {
		var coords = canvas_fp.relMouseCoords(event);
		canvasX = coords.x;
		canvasY = coords.y;
	
		alert("x is: " + canvasX + "  y is: " + canvasY);
	}, false);
}


function initSlider(){
    $('.nstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find('.leftLabel').text(leftValue);
            $(this).parent().find('.rightLabel').text(rightValue);
            sliderleftvalue=leftValue;
            sliderrightvalue=rightValue;
        }
    });
    
	$('#update-time-btn').click(function() {
	    //var form_data = new FormData($('#upload-file')[0]);
	    //form_data.append("floorplan_id" , current_floorplan);
	    //form_data.append("deployment_id" , current_deployment);
        
        var canvas_fp = document.getElementById("canvas_fp");
		var ctx = canvas_fp.getContext("2d");
		var data = loc_history;
		var start_time = Math.round(data.length*sliderleftvalue/100);
		var end_time = Math.round(data.length*sliderrightvalue/100);
		//start_date=data.[start_time];
		//end_date=data.[end_time];
		for(var i=start_time; i<end_time; i++){
			ctx.beginPath();
			ctx.arc(data[i].x,data[i].y,2,0,2*Math.PI);
			ctx.stroke();
				}   
		//document.getElementById("starttime").value= data.[start_time];
		//document.getElementById("endtime").value= data.[end_time];
		//html += '	<span id="starttime" />	<span id="endtime" />'
		document.getElementById('starttime').innerHTML=data[start_time].time;
		document.getElementById('endtime').innerHTML=data[end_time].time;
		alert('Successfully updated!');    
	})
}

function getInput(){
	$('#update-area-btn').click(function() {
		var fx = document.getElementById('fx');
		var fy = document.getElementById('fy');
		var sx = document.getElementById('sx');
		var sy = document.getElementById('sy');
		var data = loc_history;
		var i = 0;
		for(i ; i < data.length; i++){
			if (data[i].x > fx && data[i].y > fy && data[i].x < sx && data[i].y < sy) {
				//html += '<div id="starttime' + i + '></div>'
				//html += '<div id="endtime"></div><br>'
				//document.getElementById('starttime').innerHTML=data[start_time].time;
				//document.getElementById('endtime').innerHTML=data[end_time].time;
				document.getElementById('starttime1').innerHTML=data[i].time;
				//document.getElementById('endtime1').innerHTML=data[i].time;	
				var m = i;
				i = data.length;
			}
		}
		for(m ; m < data.length; m++){
			if (data[m].x < fx || data[m].y < fy || data[m].x < sx || data[m].y < sy) {
				document.getElementById('endtime1').innerHTML=data[m].time;
				m = data.length;
			}
		}
		alert('Successfully updated!');  
	})
}

// initialization of home page
function init(){
	initFpCanvas();
	initDatasetImport();
	initSlider();
	getInput();
	var parameters = {};
	$.ajax({
		url: '/ibeaconapp/floorplan/',
		type: 'GET',
		data: parameters,
		accept: 'application/json',
		success: function(data, responseText, jqXHR) {
			 var html = "";
			 html += "<option disabled selected> -- select a floorplan -- </option>"
			 for(var i=0; i<data["floorplanlist"].length; i++){
				 html += '<option value=' +data["floorplanlist"][i]["id"] + '>';
				 html += data["floorplanlist"][i]["name"];
				 html += '</option>';
			 }
			 
			 document.getElementById("floorplan_sel").innerHTML = html;
			 
			},
		failure: function(){alert('Failed to get floorplan list from server...');}
	});
}

// process floorplan selection change
function onFloorplanChange(fp_sel){
	
	currentfloorplan=fp_sel;
	
	
	clearDatasetSelect();
	
	 var parameters = {"floorplan_id" : fp_sel[fp_sel.selectedIndex].value};
	 current_floorplan = fp_sel[fp_sel.selectedIndex].value;
	 $.ajax({
		 url:'/ibeaconapp/deployment/',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
			 var html = "";
			 html += "<option disabled selected> -- select a deployment -- </option>"
			 for(var i=0; i<data["deploymentlist"].length; i++){
				 html += '<option value=' +data["deploymentlist"][i]["id"] + '>';
				 html += data["deploymentlist"][i]["name"];
				 html += '</option>';
	 		}
			 document.getElementById("deployment_sel").innerHTML = html;
		 },
		 failure: function(){alert('Failed to get deployment list from server...');}
	 });
	 
	 // You can display the floorplan already
	 showFloorplan(fp_sel[fp_sel.selectedIndex].value,false);
}

//process deployment selection change
function onDeploymentChange(dp_sel){
	currentdeployment=dp_sel;
	
	clearDatasetSelect()
	
	deployment_id = dp_sel[dp_sel.selectedIndex].value;
	
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
	 showFloorplan(current_floorplan,true)
	 
	 
	 
}

//process dataset selection change
function onDatasetChange(dataset_id){
	// you may want to show dataset when user select one
	showDataset(current_floorplan,current_deployment,dataset_id);
}


function clearDatasetSelect(){
	var ds_sel = document.getElementById("dataset_sel");
	ds_sel.innerHTML = "";
}

function showFloorplan(floorplan_id,show_deployment){
	// show the floorplan here, you may need further AJAX calls to get the floorplan details back
	//alert("showing the floorplan");
	 var parameters = {"floorplan_id" : floorplan_id};
	 //current_floorplan = fp_sel[fp_sel.selectedIndex].value;
	 $.ajax({
		 url:'/ibeaconapp/floorplan/img/',
		 type:'GET',
		 data: parameters,
		 accept: 'application/json',
		 success: function(data, responseText, jqXHR) {
			 //alert("the floorplan img file name is: " + data.floorplan_img);
			 var myCanvas = document.getElementById('canvas_fp');
			 var ctx = myCanvas.getContext('2d');
			 ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
			 var img = new Image;
			 img.onload = function(){
				 ctx.drawImage(img,0,0); // Or at whatever offset you like
			 };
			 img.src = "/static/ibeaconapp/image/"+data.floorplan_img;
			 if(show_deployment)
				 showDeployment(floorplan_id,current_deployment)
		 },
		 failure: function(){alert('Failed to get floorplan list from server...');}
	 });
}

function showDeployment(floorplan_id,deployment_id){
	// show the deployment here, you may need further AJAX calls to get the deployment details back
	//alert("showing the deployment");
	var parameters = {"deployment_id" : deployment_id};
	current_deployment = deployment_id;
	$.ajax({
		url:'/ibeaconapp/deployment/beacons/',
		type:'GET',
		data: parameters,
		accept: 'application/json',
		success: function(data, responseText, jqXHR) {
			// draw the beacons on the canvas
			var canvas_fp = document.getElementById("canvas_fp");
			var ctx = canvas_fp.getContext("2d");
			for(var i=0; i<data.beaconlist.length; i++){
				ctx.beginPath();
				ctx.arc(data.beaconlist[i].x,data.beaconlist[i].y,10,0,2*Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(data.beaconlist[i].x,data.beaconlist[i].y,15,0,2*Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(data.beaconlist[i].x,data.beaconlist[i].y,20,0,2*Math.PI);
				ctx.stroke();
			}
		},
	});
}

function showDataset(floorplan_id,deployment_id,dataset_id){
	// show the dataset here, you may need further AJAX calls to get the dataset details back
	alert("showing the dataset");
}

