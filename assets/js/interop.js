var interop = {
	currentType : [],
	textSearch : "",
	urlSearch : [],
	initVar : function () {
		interop.currentType : [];
		interop.textSearch : "";
		interop.urlSearch : [];
	},
	startSearch : function(indexMin, indexMax) {
		mylog.log("startSearchInterop", indexMin, indexMax);
		if (interop.currentType == "") {
			interop.currentType = ["wikidata"];
		}
		//indexStep = 30;
		interop.textSearch = ($('#main-search-bar').length>0) ? $('#main-search-bar').val() : "";
		// currentIndexMin = indexMin;
		// currentIndexMax = indexMax;  

		//interop.getUrlForInteropResearch(indexMin, indexMax);
		

		// if (all_interop_url.length > 0 ) {
		// 	all_interop_data = [];
		// 	$.each(all_interop_url,function(index, value) {
		// 		getInteropResults(value);
		// 	});
		// } else {
		// 	getInteropResults(url_interop);
		// }
	},
	getUrlForInteropResearch : function(indexMin, indexMax) {

		// var all_interop_url = [];
		// var url_interop = "";
		interop.urlSearch = [];

		if( notNull(myScopes.type) && notNull(myScopes[myScopes.type]) ) {
			mylog.log("here", myScopes.type);
			$.each(myScopes[myScopes.type],function(e,v){
				if(myScopes[myScopes.type][e].active == true){
					// scopeActive[e] = myScopes[myScopes.type][e] ;
					city_id = myScopes[myScopes.type][e].id ;
					type_zone = myScopes[myScopes.type][e].type ;
				}
			});
		}

		var city_data = interop.getCityDataById(city_id, type_zone);
		// var geoShape = typeof city_data.geoShape != "undefined" ? getGeoShapeForOsm(city_data.geoShape) : {};
		// var geofilter = typeof city_data.geoShape != "undefined" ? getGeofilterPolygon(city_data.geoShape) : {};
		var city_wikidataID = city_data.wikidataID;
		// var city_insee = city_data.insee;

		// if (searchTags !== "") {
		// 	var libelle_activity = getLibelleActivity();
		// 	var amenity_filter = getAmenityFilter();
		// 	var rome_letters = getRomeActivityCodeFromThematic(searchTags);
		// } else {
		// 	var libelle_activity = null;
		// 	var amenity_filter = null;
		// 	var rome_letters = null;
		// }
		$.each(interop.currentType,function(k,v){
			interop.urlSearch.push(interopObj[v].getUrlApi(city_wikidataID, interop.textSearch));
		});
	},
	getCityDataById : function(id, type=null) {
		$.ajax({
			type: "GET",
			url: baseUrl + "/co2/interoperability/get/type/"+type+"/id/"+id,
			async: false,
			success: function(data){ mylog.log("succes get CityDataById", data); //mylog.dir(data);
				if ((Object.keys(data).length) <= 1) {
					$.each(data, function(index, value) {
						city_data = value;
					});
				}
				else {
					city_data = data;
				}
			}
		});

		return city_data;
	}
}