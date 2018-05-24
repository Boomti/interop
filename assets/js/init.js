/* ******************
CO.js
********************* */
//var/www/dev/modules/co2/config/CO2/params.json:
// urlCtrl.loadableUrls[ "#interop" ] = {
// 	inMenu : true, 
//     useHeader : true, 
//     open : true, 
//     subdomain : "interop", 
//     subdomainName : "Interops",
//     hash : "#interop.co.index",
//     icon : "cubes", 
//     mainTitle : "Moteur de Interop <span class='text-red'>territoriales</span>",
//     placeholderMainSearch : "Rechercher un Interop ...",
//     lblBtnCreate : "Ajouter une Interop",
//     colorBtnCreate : "purple",
//     module:"ressources"
// };

// MODULES
urlCtrl.loadableUrls["#interop"] = {title:'INTEROPERABILITY', icon : 'puzzle-piece',useHeader : true, module:"interop"};



//CO LANG
// co.rsc = {
//     form : function() { dyFObj.openForm("ressource") },
//     i : function () { co.ctrl.lbh("#"+userConnected.username+".view.directory.dir.ressources");},
// };


var interopObj = {
    wikipedia : {
        urlImg : moduleUrl +"/images/logos/logo-wikidata.png",
        getUrlApi : function(wikidataID, text){
            var url = baseUrl + "/api/convert/wikipedia?url=https://www.wikidata.org/wiki/Special:EntityData/"+wikidataID+".json";
            if (text !== "")
                url_wiki += "&text_filter="+text_search_name;
            return url_wiki;
        }
    }
}
