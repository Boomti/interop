/* ******************
CO.js
********************* */
var interopObj = {
    wikidata : {
    	name : "Wikidata",
    	color : "grey",
    	icon : "group",
    	type : "wiki",
        urlImg : moduleUrl +"/images/logos/logo-wikidata.png",
        getUrlApi : function(wikidataID, text){
            var url = baseUrl + "/api/convert/wikipedia?url=https://www.wikidata.org/wiki/Special:EntityData/"+wikidataID+".json";
            if (text !== "")
                url += "&text_filter="+text;
            return url;
        }
    }
};


directory.interopPanelHtml = function(params, objType) {
	mylog.log("----------- interopPanelHtml",params, params.type,params.name, params.url);


	// TODO Revoir cette parti des hash ans TRANSLATE
	//params.hash = getUrlForInteropDirectoryElements(objType.type, params.shortDescription, params.url);
	params.hash = params.url;
	params.url = params.hash;

	params.type = "poi.interop."+objType.type;

	if (typeof params.tags == "undefined") 
		params.tags = [];
	params.tags.push(objType.type);

	str = "";  
	str += "<div class='col-lg-4 col-md-6 col-sm-8 col-xs-12 searchEntityContainer "+params.type+" "+params.elTagsList+" "+params.elRolesList+" '>";
		str += "<div class='searchEntity' id='entity"+params.id+"'>";

	if(params.itemType!="city" && (params.useMinSize))
	str += "<div class='imgHover'>" + params.imgProfil + "</div>"+
	"<div class='contentMin'>";


	if(params.itemType!="city" && (typeof params.size == "undefined" || params.size == "max"))
	str += "<a href='"+params.hash+"' class='container-img-profil lbhp add2fav'  data-modalshow='"+params.id+"'>" + params.imgProfil + "</a>";

	str += "<div class='padding-10 informations'>";

	if(!params.useMinSize){
		if(typeof params.size == "undefined" || params.size == "max"){
			str += "<div class='entityCenter no-padding'>";
			str +=    "<a href='"+params.hash+"' class='lbhp add2fav'  data-modalshow='"+params.id+"'>" ;
				str +=  "<img width=100 style='margin-top:20px;' src='"+objType.urlImg+"'>";
			str +=  "</a>";
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
		// str += "<div class='entityDate dateFrom bg-"+objType.color+" transparent badge'>" + params.startDate + "</div>";
		// if(params.endDate != null)
		// str += "<div  class='entityDate dateTo  bg-"+objType.color+" transparent badge'>" + params.endDate + "</div>";

		if(typeof params.size == "undefined" || params.size == "max"){
		str += "<div class='entityCenter no-padding'>";
		str +=    "<a href='"+params.hash+"' class='lbhp add2fav'  data-modalshow='"+params.id+"'> <img width=100 style='margin-top:20px;' src='"+objType.urlImg+"'> </a>";
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