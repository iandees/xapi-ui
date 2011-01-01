$(document).ready(function() {

  // Set up the map
  var map = new OpenLayers.Map('bboxmap');
  var osm = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
  map.addLayer(osm);
  map.zoomToMaxExtent();

  // Set up some other basics
  var baseurl = "http://xapi-server"
  var tagsearch = "";

  // Basic update functions
  var update_tagsearch = function() {
    if($("#searchbytag").is(':checked')){
      tagsearch = $('#element').val() + '[' +
        $('#tag').val() + ']';
    }
    else {
      tagsearch = "";
    }};

  var update_results = function() {
    update_tagsearch();
    
    $('#results').text(baseurl + "/" + 
                       tagsearch );
  }
  
  update_results();
  
  // Set up some UI element functions

  $("#searchbytag").click(function() {
    if ( $(this).is(':checked') ) {
      $('#tag').removeAttr('disabled');
      $('#element').removeAttr('disabled');
    }
    else {	
      $('#tag').attr('disabled', 'disabled');
      $('#element').attr('disabled', 'disabled');  		
    }
    update_results();
  });
  
  $('#element').change(function() {
    update_results(); });
  
  $('#tag').keyup(function() {
    update_results(); });
});
