/* ******************
CO.js
********************* */
var interopObj = {
    wikidata : {
    	name : "Wikidata",
    	color : "grey",
    	icon : "group",
    	type : "wiki",
        urlImg : modules.interop.assets +"/images/logos/logo-wikidata.png",
        paramsUrl : {
        	cityFields : ["wikidataID"],
        	others : ["textSearch"]
        },
        getUrlApi : function(params){
            var url = baseUrl + "/api/convert/wikipedia?url=https://www.wikidata.org/wiki/Special:EntityData/"+params.wikidataID+".json";
            if (params.textSearch !== "")
                url += "&text_filter="+params.textSearch;
            return url;
        }
    },
    poleEmploi : {
    	name : "Pole Emploi",
    	color : "grey",
    	icon : "group",
    	type : "poleEmploi",
        urlImg : modules.interop.assets +"/images/logos/logo_pole_emploi.png",
        paramsUrl : {
        	cityFields : ["insee"],
        	others : ["indexMax"]
        },
        getUrlApi : function(params){
            var url = baseUrl + "/api/convert/poleemploi?url=https://api.emploi-store.fr/partenaire/infotravail/v1/datastore_search_sql?sql=SELECT%20%2A%20FROM%20%22421692f5%2Df342%2D4223%2D9c51%2D72a27dcaf51e%22%20WHERE%20%22CITY_CODE%22=%27"+params.insee+"%27%20LIMIT%20"+params.indexMax;
            // if (text !== "")
            //     url += "&text_filter="+text;
            return url;
        },
        startSearch : function(){
            interop.currentType = ["poleEmploi"]
            interop.startSearch(0, 30);
        }
    }
};

function initRangeInterop(){
	$.each(interopObj, function(key, value){
		searchObject.ranges[key] = { indexMin : 0, indexMax : 30, waiting : 30 }
	});
}

function initHeaderParams(){
	$.each(interopObj, function(key, value){
		headerParams[key] = { color: value.color, icon: value.icon, name: value.name }
	});
}

initHeaderParams();

// typeObj.interop = {
// 	col:"interop", 
// 	ctrl:"interop", 
// 	icon : "group", 
// 	titleClass : "bg-green",
// 	color:"green",
// 	bgClass : "bgOrga"
// } ;


directory.interopPanelHtml = function(params, objType) {
	mylog.log("----------- interopPanelHtml",params, objType, params.type,params.name, params.url);


	// TODO Revoir cette parti des hash ans TRANSLATE
	//params.hash = getUrlForInteropDirectoryElements(objType.type, params.shortDescription, params.url);
	params.hash = params.url;
	params.url = params.hash;

	params.type = "poi.interop."+objType.type;

	if (typeof params.tags == "undefined"){
		params.tags = [];
	}

	var thisTags = "";
	if(typeof params.tags != "undefined" && params.tags != null){
		$.each(params.tags, function(key, value){
			if(typeof value != "undefined" && value != "" && value != "undefined"){
				var tagTrad = typeof tradCategory[value] != "undefined" ? tradCategory[value] : value;
				thisTags += "<span class='badge bg-transparent text-red btn-tag tag' data-tag-value='"+slugify(value, true)+"' data-tag-label='"+tagTrad+"'>#" + tagTrad + "</span> ";
				params.elTagsList += slugify(value, true)+" ";
			}
		});
		
	}
	params.tagsLbl = thisTags;

	str = "";  
	str += "<div class='col-lg-4 col-md-6 col-sm-8 col-xs-12 searchEntityContainer "+params.type+"'>"+
				"<div class='searchEntity' id='entity"+params.id+"'>"+
					"<div class='contentMin'>"+
						"<div class='padding-10 informations'>"+
							"<div class='entityRight no-padding'>"+
								"<a  href='"+params.hash+"' class='"+params.size+" entityName text-dark lbhp add2fav' "+
									"data-modalshow='"+params.id+"'>"+
									'<span class="col-xs-2 text-center">'+
										"<img width=40 src='"+objType.urlImg+"'>" +
									'</span>'+
    								'<span class="col-xs-10">' + params.name + '</span>'+
								"</a>";
								if(typeof params.address != "undefined"){
									str += "<a href='"+params.hash+"' data-id='" + params.dataId + "' "+
												"class='entityLocality lbhp add2fav'  data-modalshow='"+params.id+"'>"+
												"<i class='fa fa-home'></i> " + params.address.postalCode + ", " + 
												params.address.addressLocality +
											"</a>";
								}
								else str += "<br/>";
						str += "<div class='entityDescription'>" + params.shortDescription + "</div>";
						str += "<div class='tagsContainer text-red'>"+params.tagsLbl+"</div>";
					str += "</div>";
				str += "</div>";
			str += "</div>";
		str += "</div>";

	str += "</div>";
	return str;
};

if(typeof searchObject == "undefined"){
	lazyLoad( moduleUrl+'/js/default/search.js', null, function(){
		searchAllEngine.initRanges();
		initRangeInterop();
		
	});
}else if(typeof searchObject.ranges == "undefined"){
	searchAllEngine.initRanges();
	initRangeInterop();
}else if( typeof searchObject.ranges.interop == "undefined" ){
	initRangeInterop();
}



