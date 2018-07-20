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
		getUrlElement : function(params){
			var url = params.url
			return url;
		},
		getUrlApi : function(params){
			var url = baseUrl + "/api/convert/poleemploi?url=https://api.emploi-store.fr/partenaire/offresdemploi/v1/rechercheroffres";
			return url;
		},
		getParamsUrl : function(objType){
			var data = {
				'technicalParameters'  : {
					'page' : 1,
					'per_page' : 30,
					'sort' : 1
				},
				'criterias' : {}
			} ;

			var listScope = interop.getScope();

			mylog.log("listScope", listScope);
			var dataCities = null ;
			$.each(listScope,function(e,v){
				dataCities = interop.getCityDataById(v.id, v.type, objType.paramsUrl.cityFields);
			});

			if(dataCities != null && typeof dataCities.insee != "undefined" )
				data["criterias"]["cityCode"] = dataCities.insee;
			
			if(typeof searchObject != "undefined" && searchObject.text != "")
				data["criterias"]["keywords"] = searchObject.text;
			
			if(typeof searchObject != "undefined" && searchObject.subType != "" && typeof modules.jobs.categories.subcat[searchObject.subType] != "undefined")
				data["criterias"]["largeAreaCode"] = modules.jobs.categories.subcat[searchObject.subType].poleEmploiKey;
				
			if(typeof searchObject != "undefined" && searchObject.priceMin != "")
				data["criterias"]["minSalary"] = searchObject.priceMin;
				
			return data ;
		},
		startSearch : function(indexMin, indexStep){
			interop.currentType = ["poleEmploi"]
			interop.startSearch(indexMin, indexStep);
		}
	}
};

function initRangeInterop(){
	// $.each(interopObj, function(key, value){
	// 	searchObject.ranges[key] = { indexMin : 0, indexMax : 30, waiting : 30 }
	// });
}

function initHeaderParams(){
	$.each(interopObj, function(key, value){
		headerParams[key] = { color: value.color, icon: value.icon, name: value.name }
	});
}


function initTypeObj(){
	$.each(interopObj, function(key, value){
		typeObj[key] = { col: key, ctrl: key, color: value.color, icon: value.icon, sameAs:key }
	});
}

initHeaderParams();
initTypeObj();
// typeObj[typeObj[addType].sameAs].ctrl

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
	params.hash = objType.getUrlElement(params);
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
	str += "<div class='col-lg-4 col-md-6 col-sm-8 col-xs-12 "+params.type+"' style='min-height: 170px; max-height: 170px; margin-bottom: 25px;'>"+
				"<div class='searchEntity' id='entity"+params.id+"'>"+
					"<div class='contentMin'>"+
						"<div class='padding-10 informations'>"+
							"<div class='entityRight no-padding'>"+
								"<a  href='"+params.hash+"' target='_blank' class='"+params.size+" entityName text-dark lbhp add2fav' "+
									"data-modalshow='"+params.id+"'>"+
									'<span class="col-xs-2 text-center">'+
										"<img width=40 src='"+objType.urlImg+"'>" +
									'</span>'+
    								'<span class="col-xs-10">' + params.name + '</span>'+
								"</a>";
								if(	typeof params.address != "undefined" && 
									typeof params.address.addressLocality != "undefined"){
									str += "<a href='"+params.hash+"'  target='_blank' data-id='" + params.dataId + "' "+
												"class='entityLocality lbhp add2fav'  data-modalshow='"+params.id+"'>"+
												"<i class='fa fa-home'></i> " + params.address.postalCode + ", " + 
												params.address.addressLocality +
											"</a>";
								}
								else str += "<br/>";
						//str += "<div class='entityDescription'>" + params.shortDescription + "</div>";
						if(typeof params.shortDescription != "undefined" && params.shortDescription != "" && params.shortDescription != null)
							str += "<br><span class='entityDescription'>"+params.shortDescription+"</span>";
						else if(typeof params.description != "undefined" && params.description != "" && params.description != null){
							str += "<br><span class='entityDescription'>"+
								( (params.description.length > 140) ? params.description.substring(0,140)+"..." : params.description )+"</span>";
						}
						str += "<div class='tagsContainer text-red'>"+params.tagsLbl+"</div>";
					str += "</div>";
				str += "</div>";
			str += "</div>";
		str += "</div>";

	str += "</div>";
	return str;
};

// if(typeof searchObject == "undefined"){
// 	lazyLoad( moduleUrl+'/js/default/search.js', null, function(){
// 		searchAllEngine.initRanges();
// 		initRangeInterop();
		
// 	});
// }else if(typeof searchObject.ranges == "undefined"){
// 	searchAllEngine.initRanges();
// 	initRangeInterop();
// }else if( typeof searchObject.ranges.interop == "undefined" ){
// 	initRangeInterop();
// }



