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
	 var html = '';
	 for(var i=0; i<music_demo.length; i++){
		 html += '<option>';
		 html += music_demo[i].type;
		 html += '</option>';
	 }
	 
	 document.getElementById("floorplan_sel").innerHTML = html;
}


// process floorplan selection change
function onFloorplanChange(index){
	rec = index;
	 var html = '';
	 for(var i=0; i<music_demo[index].content.length; i++){
		 html += '<option>';
		 html += music_demo[index].content[i];
		 html += '</option>';
	 }
	 document.getElementById("deployment_sel").innerHTML = html;
}

//process deployment selection change
function onDeploymentChange(index){
	
}

//process dataset selection change
function onDatasetChange(index){
	
}