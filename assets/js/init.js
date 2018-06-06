/* ******************
CO.js
********************* */
var interopObj = {
    // interop : {
    //   name : "interop",
    //   color : "grey",
    //   icon : "group",
    //   type : "interop",
    //     urlImg : moduleUrl +"/images/logos/logo-wikidata.png",
    //     getUrlApi : function(wikidataID, text){
    //         var url = baseUrl + "/api/convert/wikipedia?url=https://www.wikidata.org/wiki/Special:EntityData/"+wikidataID+".json";
    //         if (text !== "")
    //             url += "&text_filter="+text;
    //         return url;
    //     }
    // },
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

typeObj.interop = {
	col:"interop", 
	ctrl:"interop", 
	icon : "group", 
	titleClass : "bg-green",
	color:"green",
	bgClass : "bgOrga"
} ;

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
	//params.tags.push(objType.type);

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


/* 
interopPanelHtml : function(params){
      mylog.log("----------- interopPanelHtml OLD",params, params.type,params.name, params.url);

      var interop_type = getTypeInteropData(params.source.key);
      mylog.log("interopPanelHtml", interop_type);
      // TODO Revoir cette parti des hash ans TRANSLATE
      //params.hash = getUrlForInteropDirectoryElements(interop_type, params.shortDescription, params.url);
      params.hash = params.url;
      params.url = params.hash;


      params.color = getIconColorForInteropElements(interop_type);
      params.htmlIco = getImageIcoForInteropElements(interop_type);
      params.type = "poi.interop."+interop_type;

      if (typeof params.tags == "undefined") 
        params.tags = [];
      params.tags.push(interop_type);

      str = "";  
      str += "<div class='col-lg-4 col-md-6 col-sm-8 col-xs-12 searchEntityContainer "+params.type+" "+params.elTagsList+" "+params.elRolesList+" '>";
      str +=    "<div class='searchEntity' id='entity"+params.id+"'>";

      if(params.itemType!="city" && (params.useMinSize))
        str += "<div class='imgHover'>" + params.imgProfil + "</div>"+
                "<div class='contentMin'>";

      if(params.itemType!="city" && (typeof params.size == "undefined" || params.size == "max"))
        str += "<a href='"+params.hash+"' class='container-img-profil lbhp add2fav'  data-modalshow='"+params.id+"'>" + params.imgProfil + "</a>";

      str += "<div class='padding-10 informations'>";

      if(!params.useMinSize){
        if(typeof params.size == "undefined" || params.size == "max"){
          str += "<div class='entityCenter no-padding'>";
          str +=    "<a href='"+params.hash+"' class='lbhp add2fav'  data-modalshow='"+params.id+"'>" + params.htmlIco + "</a>";
          str += "</div>";
        }
      }  
              
      str += "<div class='entityRight no-padding'>";

      var iconFaReply = notEmpty(params.parent) ? "<i class='fa fa-reply fa-rotate-180'></i> " : "";
      str += "<a  href='"+params.hash+"' class='"+params.size+" entityName text-dark lbhp add2fav'  data-modalshow='"+params.id+"'>"+
                iconFaReply + params.name + 
             "</a>";
      
      var thisLocality = "";
      if(params.fullLocality != "" && params.fullLocality != " ")
        thisLocality = "<a href='"+params.hash+"' data-id='" + params.dataId + "' class='entityLocality lbhp add2fav'  data-modalshow='"+params.id+"'>"+
                          "<i class='fa fa-home'></i> " + params.fullLocality + 
                        "</a>";
      else thisLocality = "<br>";
      
      str += "<div class='entityDescription'>" + params.description + "</div>";
      str += "<div class='tagsContainer text-red'>"+params.tagsLbl+"</div>";

      if(params.useMinSize){
        // if(params.startDate != null)
        // str += "<div class='entityDate dateFrom bg-"+params.color+" transparent badge'>" + params.startDate + "</div>";
        // if(params.endDate != null)
        // str += "<div  class='entityDate dateTo  bg-"+params.color+" transparent badge'>" + params.endDate + "</div>";
        
        if(typeof params.size == "undefined" || params.size == "max"){
          str += "<div class='entityCenter no-padding'>";
          str +=    "<a href='"+params.hash+"' class='lbhp add2fav'  data-modalshow='"+params.id+"'>" + params.htmlIco + "</a>";
          str += "</div>";
        }
      }  

      if(params.type!="city" && (params.useMinSize))
        str += "</div>";
        str += "</div>";
      str += "</div>";
      str += "</div>";

      str += "</div>";
      return str;
    },

*/