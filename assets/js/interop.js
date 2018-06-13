var interop = {
	currentType : [],
	textSearch : "",
	urlSearch : [],
	all_interop_data : [],
	indexMin : 0,
	indexMax : 30,
	initVar : function () {
		interop.currentType = [];
		interop.textSearch = "";
		interop.urlSearch = [];
	},
	startSearch : function(indexMin, indexMax) {
		mylog.log("startSearchInterop", indexMin, indexMax);
		if(notNull(myScopes.countActive) && myScopes.countActive > 0) {
			
			if (interop.currentType == "") {
				interop.currentType = ["wikidata"];
			}
			//indexStep = 30;
			interop.textSearch = ($('#main-search-bar').length>0) ? $('#main-search-bar').val() : "";
			interop.indexMin = (notNull(indexMin) ? indexMin : 0);
			interop.indexMax = (notNull(indexMax) ? indexMax : 0);  
			interop.getUrlForInteropResearch();
		}else{
			$("#dropdown_search").html("<center><span class='search-loaderr text-red' style='font-size:20px;'>Selectionner au moins un lieu </span></center>");
			showWhere(true);
		}
	},
	getUrlForInteropResearch : function() {
		mylog.log("getUrlForInteropResearch");
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
		mylog.log("interop.textSearch", interop.textSearch);

		$.each(interop.currentType,function(k,valType){
			mylog.log("valType", valType);
			var objType = interopObj[valType];


			var city_data = interop.getCityDataById(city_id, type_zone, objType.cityFields);
			// var geoShape = typeof city_data.geoShape != "undefined" ? getGeoShapeForOsm(city_data.geoShape) : {};
			// var geofilter = typeof city_data.geoShape != "undefined" ? getGeofilterPolygon(city_data.geoShape) : {};
			var paramsUrl = interop.getParamsForUrl(objType.paramsUrl, city_data);

			var url = objType.getUrlApi(paramsUrl);
			mylog.log("url", url);
			interop.getResults(url,objType);
		});


	},
	getParamsForUrl : function(oT, cD) {
		mylog.log("getParamsForUrl", oT, cD);
		var params = {};
		$.each(oT.cityFields, function(index, value) {
			params[value] = cD[value];
		});
		$.each(oT.others, function(index, value) {
			params[value] = interop[value];
		});
		return params;
	},
	getCityDataById : function(id, type=null, fields=[]) {
		$.ajax({
			type: "GET",
			url: baseUrl + "/co2/interoperability/get/type/"+type+"/id/"+id+"/fields/"+fields.toString(),
			async: false,
			success: function(data){ 
				mylog.log("succes get CityDataById", data); //mylog.dir(data);
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
	},
	getResults : function(url_interop, objType) {


		var indexMin = 0;
		var indexMax = 30;

		var startNow = 0;
		var endNow = 30;

    	mylog.log("getInteropResults : ", url_interop);
    	var data=constructSearchObjectAndGetParams();

	    //loadingData = true;
	    
	    // str = "<i class='fa fa-circle-o-notch fa-spin'></i>";
	    // $(".btn-start-search").html(str);
	    // $(".btn-start-search").addClass("bg-azure");
	    // $(".btn-start-search").removeClass("bg-dark");
	    
	    if(indexMin > 0)
	    	$("#btnShowMoreResult").html("<i class='fa fa-spin fa-circle-o-notch'></i> "+trad.currentlyresearching+" ...");
	    else
	    	$("#dropdown_search").html("<center><span class='search-loaderr text-dark' style='font-size:20px;'><i class='fa fa-spin fa-circle-o-notch'></i> "+trad.currentlyresearching+" ...</span></center>");
	      
	    if(isMapEnd) {
	      $.blockUI({message : "<h1 class='homestead text-red'><i class='fa fa-spin fa-circle-o-notch'></i> Commune<span class='text-dark'>xion en cours ...</span></h1>"});
	    }

    	$.ajax({
	        type: "POST",
	        url: url_interop,
	        dataType: "json",
	        error: function (data){
	            mylog.log("error autocomplete INTEROP search"); 
                mylog.dir(data);     
	            //signal que le chargement est terminé
	            //loadingData = false;  
                // $('#dropdown_search').append("<br/><div><h1>Something went wrong during this research ... </h1></div>");   
                $("#dropdown_search").html("<center><span class='search-loaderr text-dark' style='font-size:20px;'></i> Something went wrong during this research ...</span></center>");
	        },
	        success: function(data){ 
	        	mylog.log("success autocomplete INTEROP search", data); 
	        	toastr.success("Une partie des données est arrivé");
	            all_data_for_map = [];
	            var part_data = [];
	            if (data.length > 0) {
	                part_data = data;
	                var totalData = data.length;
	                var countData = data.length;
	            	mylog.log('PART_DATA POUR CHAQUE INTEROP RESEARCH : ', part_data);
	            	var str = "";
	            	var city, postalCode = "";
	            	searchObject.indexMin = interop.indexMin;
	            	searchObject.countType = interop.currentType;
	            	searchObject.types = interop.currentType;
	            	searchAllEngine.searchCount[objType.type] = countData ;

	            	$(".headerSearchContainer").html( directory.headerHtml() );

	            	// str += '<div class="col-md-12 text-left" id="nb_results_search">';
	             //    str += "<h4 style='margin-bottom:10px; margin-left:15px;' class='text-dark'>"+
	             //            "<i class='fa fa-angle-down'></i> " + totalData + " résultats ";
	             //    str += "<small>";

	                // if(typeof headerParams != "undefined"){
	                    
	                //     str += "<span class='text-"+objType.color+"'>"+
	                //                 "<i class='fa fa-"+objType.icon+" hidden-sm hidden-md hidden-lg padding-5'></i> <span class='hidden-xs'>"+objType.name+"</span>"+
	                //               "</span> ";
	                // }

	                // str += "</small>";
	                // str += "</h4>";
	                // str += "<hr style='float:left; width:100%;'/>";
	                // str += "</div>";

	                $.each(part_data,function(index,value) {
		                interop.all_interop_data.push(value);
		                str += directory.interopPanelHtml(value, objType);
		            });


	                //ajout du footer      	
                    // str += '<div class="pull-left col-md-12 text-center" id="footerDropdown" style="width:100%;">';
                    // str += "<hr style='float:left; width:100%;'/><h3 style='margin-bottom:10px; margin-left:15px;' class='text-dark'>" + totalData + " résultats</h3>";
                    // //str += '<span class="" id="">Complétez votre recherche pour un résultat plus précis</span></center><br/>';
                    // str += '<button class="btn btn-default" id="btnShowMoreResult"><i class="fa fa-angle-down"></i> Afficher plus de résultat</div></center>';
                    // str += "</div>";

                   	$(".footerSearchContainer").html( directory.footerHtml() );

                    //si on n'est pas sur une première recherche (chargement de la suite des résultat)
                    if(indexMin > 0){

                        //on supprime l'ancien bouton "afficher plus de résultat"
                        $("#btnShowMoreResult").remove();
                        //on supprimer le footer (avec nb résultats)
                        $("#footerDropdown").remove();

                        //on calcul la valeur du nouveau scrollTop
                        var heightContainer = $(".main-container")[0].scrollHeight - 180;
                        //on affiche le résultat à l'écran
                        $("#dropdown_search").append(str);
                        //on scroll pour afficher le premier résultat de la dernière recherche
                        $(".my-main-container").animate({"scrollTop" : heightContainer}, 1700);
                        //$(".my-main-container").scrollTop(heightContainer);

                    //si on est sur une première recherche
                    } else {
                        //on affiche le résultat à l'écran

                        $("#dropdown_search").html(str);

                        if(typeof myMultiTags != "undefined"){
                            $.each(myMultiTags, function(key, value){ //mylog.log("binding bold "+key);
                                $("[data-tag-value='"+key+"'].btn-tag").addClass("bold");
                            });
                        } 
                    }
                    
                    if(countData < 30){
		                $("#btnShowMoreResult").remove(); 
		                scrollEnd = true;
		            }else{
		                scrollEnd = false;
		            }

		            if(typeof searchCallback == "function") {
		                searchCallback();
		            }

		            if(mapElements.length==0) 
		            	mapElements = part_data;
		            else 
		            	$.extend(mapElements, part_data);   



	            } else { 
	            	toastr.error(part_data.content); 
	            	$.unblockUI();
                    showMap(false);
                    $(".btn-start-search").html("<i class='fa fa-refresh'></i>"); 
                    if(indexMin == 0){
                        //ajout du footer   
                        var msg = "<i class='fa fa-ban'></i> "+trad.noresult;    
                        // if(name == "" && locality == "") 
                        // 	msg = "<h3 class='text-dark padding-20'><i class='fa fa-keyboard-o'></i> Préciser votre recherche pour plus de résultats ...</h3>"; 
                        str += '<div class="pull-left col-md-12 text-left" id="footerDropdown" style="width:100%;">';
                        str += "<hr style='float:left; width:100%;'/><h3 style='margin-bottom:10px; margin-left:15px;' class='text-dark'>"+msg+"</h3><br/>";
                        str += "</div>";
                        $("#dropdown_search").html(str);
                        $("#searchBarText").focus();
                    } 
	            }
	        }
        });
	}
}