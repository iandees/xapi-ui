$(document).ready(function() {

  // Set up the map
  var map = new OpenLayers.Map('bboxmap');
  // var osm = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
  // var osm = new OpenLayers.Layer.OSM;
//  var map = new OpenLayers.Map ("bboxmap", {
//    controls: [
//      new OpenLayers.Control.Navigation()
//    ],
//    maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,
//                                     20037508.34,20037508.34),
//    numZoomLevels: 20,
//    maxResolution: 156543.0339,
//    displayProjection: new OpenLayers.Projection("EPSG:4326"),
//    units: 'm',
//    projection: new OpenLayers.Projection("EPSG:900913")
//  });
  var osm = new OpenLayers.Layer.OSM.Mapnik("Mapnik", {
    displayOutsideMaxExtent: true,
    wrapDateLine: true,
    attribution: ''
  });

  map.addLayer(osm);
  //map.zoomToMaxExtent();
  map.zoomTo(1);

  // Set up the function for the control box
  var control = new OpenLayers.Control();
  OpenLayers.Util.extend(control, {
    draw: function () {
      // this Handler.Box will intercept the shift-mousedown
      // before Control.MouseDefault gets to see it
      this.box = new OpenLayers.Handler.Box( control,
                                             {"done": this.notice},
                                             {keyMask: OpenLayers.Handler.MOD_SHIFT});
      this.box.activate();
    },
    
    notice: function (bounds) {
      OpenLayers.Console.userError(bounds);
    }
  });
  map.addControl(control);

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
    // Foo
    if ($('#searchbytag').is(':checked')) {
      results = results + tagsearch();
      if ($('#searchbybbox').is(':checked')) {
        results = results + '[' + bbox() + ']'; };}
    else {
      if ($('#searchbybbox').is(':checked')) {
        results = results + 'map?' + bbox(); }
    };
    $('#results').text(results);
  };

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

  $('#bbox_top').keyup(function() { update_results();});
  $('#bbox_bottom').keyup(function() { update_results();});
  $('#bbox_left').keyup(function() { update_results();});
  $('#bbox_right').keyup(function() { update_results();});
  
});
