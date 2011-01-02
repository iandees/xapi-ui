$(document).ready(function() {

  // Set up the map
  var map = new OpenLayers.Map('bboxmap', 
                               {projection: "EPSG:900913",});
  var osm = new OpenLayers.Layer.OSM.Mapnik("Mapnik", {
    attribution: ''
  });

  // We'll use these projections in our functions later
  var goog =  new OpenLayers.Projection("EPSG:900913");
  var latlon = new OpenLayers.Projection("EPSG:4326")
  map.addLayer(osm);
  map.zoomTo(1);

  map.events.register('move', map, function() {
    var bounds = map.getExtent().transform(goog, latlon);
    $('#bbox_top').val(bounds.top);
    $('#bbox_bottom').val(bounds.bottom);
    $('#bbox_left').val(bounds.left);
    $('#bbox_right').val(bounds.right);
    update_results();
  });
  
  // Set up some other basics
  var baseurl = "http://xapi-server"

  // Basic update functions
  var tagsearch = function() {
    if($("#searchbytag").is(':checked')) {
      t = $('#element').val() + '[' + $('#tag').val() + ']';
    }
    else { t = ""; };
    return t;
  };

  var bbox = function() {
    var b = 'bbox=' + $('#bbox_left').val() + ',' + $('#bbox_bottom').val() +
      ',' + $('#bbox_right').val() + ',' + $('#bbox_top').val();
    return b;
  }
  
  var update_results = function() {
    var results = baseurl + '/' ;
    if ($('#searchbytag').is(':checked')) {
      results = results + tagsearch();
      if ($('#searchbybbox').is(':checked')) {
        results = results + '[' + bbox() + ']'; };}
    else {
      if ($('#searchbybbox').is(':checked')) {
        results = results + 'map?' + bbox(); }
    };
    $('#results').text(results);
    $('#results').attr('href', results);
  };

  var update_bbox = function() {
    var bounds = new OpenLayers.Bounds( parseFloat($('#bbox_left').val()),
                                           parseFloat($('#bbox_bottom').val()),
                                           parseFloat($('#bbox_right').val()),
                                           parseFloat($('#bbox_top').val()));
    bounds.transform(latlon, goog);
    map.zoomToExtent(bounds, true)
    };
    
  // Set up some UI element functions
  $("#searchbytag").click(function() {
    if ( $(this).is(':checked') ) {
      $('#tag').removeAttr('disabled');
      $('#element').removeAttr('disabled');
    }
    else {
      $('#tag').attr('disabled', 'disabled');
      $('#element').attr('disabled', 'disabled');  		
    };
    update_results();
  });
  
  $('#element').change(function() {
    update_results(); });
  
  $('#tag').keyup(function() {
    update_results(); });
  
  $('#searchbybbox').click(function() {
    if ( $(this).is(':checked')) {
      $('#bbox_top').removeAttr('disabled');
      $('#bbox_bottom').removeAttr('disabled');
      $('#bbox_left').removeAttr('disabled');
      $('#bbox_right').removeAttr('disabled');
    }
    else {
      $('#bbox_top').attr('disabled', 'disabled');
      $('#bbox_bottom').attr('disabled', 'disabled');
      $('#bbox_left').attr('disabled', 'disabled');
      $('#bbox_right').attr('disabled', 'disabled');};
    update_results();
  });

  $('#bbox_top').change(function() {
    update_bbox();
    update_results();});
  $('#bbox_bottom').change(function() {
    update_bbox();
    update_results();});
  $('#bbox_left').change(function() {
    update_bbox();
    update_results();});
  $('#bbox_right').change(function() {
    update_bbox();
    update_results();});

  // Do the initial setup

    update_results();
});
