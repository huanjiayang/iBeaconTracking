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


function init(){
	 var html = '';
	 for(var i=0; i<music_demo.length; i++){
		 html += '<option>';
		 html += music_demo[i].type;
		 html += '</option>';
	 }
	 
	 document.getElementById("floorplan_sel").innerHTML = html;
}

var rec;

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

function onDeploymentChange(index){
	
}

function onDatasetChange(index){
	
}