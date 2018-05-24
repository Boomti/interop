<?php
//gettting asstes from parent module repo
// $cssAnsScriptFilesModule = array( 
// 	'/js/dataHelpers.js',
// 	'/js/interop.js',
// );
// HtmlHelper::registerCssAndScriptsFiles($cssAnsScriptFilesModule, Yii::app()->getModule( Yii::app()->params["module"]["parent"] )->getAssetsUrl() );

//echo "Helo there";
//echo Rest::json($this->layout);
//if( $this->layout != "//layouts/empty"){
	// $layoutPath = 'webroot.themes.'.Yii::app()->theme->name.'.views.layouts.';
	// $this->renderPartial($layoutPath.'header',array("page"=>"interop","layoutPath"=>$layoutPath));
//}

?>

<!-- <div id="all_activity" class="hidden col-sm-12 col-md-12 hidden-xs hidden-sm text-left"></div> -->

<div id="container-result-interop_search" class="container-result-search col-xs-12 bg-white">
	<div class="col-sm-2 col-md-2 col-xs-12 text-right pull-left margin-top-15 no-padding" id="col-btn-type-directory">
		<!-- <button class="btn text-black bg-dark btn-open-filliaire">
			<i class="fa fa-th"></i> 
			<span class="hidden-xs">Thématiques</span>
		</button><hr class="hidden-xs">
		<button id="btn-all-interop" class="btn text-grey btn-directory-type" data-type="all_interop">
			<i class="fa fa-search"></i>
			<span class="hidden-xs">TOUS</span>
		</button><br class="hidden-xs"> -->
		<hr class="hidden-xs">
 		<button id="btn-wiki" class="btn text-grey btn-directory-type" data-type="wikidata">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo-wikidata.png'> 
			<span class="hidden-xs">Wikidata</span>
		</button><br class="hidden-xs">
		<!-- <button id="btn-datagouv" class="btn text-red btn-directory-type" data-type="datagouv">
			<img width=30 src='<?php echo $this->module->assetsUrl; ?>/images/logos/data-gouv-logo.png'> 
			<span class="hidden-xs">DataGouv</span>
		</button><br class="hidden-xs">
		<button id="btn-osm" class="btn text-green btn-directory-type" data-type="osm">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/OSM-logo.png'> 
			<span class="hidden-xs">Open Stret Map</span>
		</button><br class="hidden-xs">
		<button id="btn-ods" class="btn text-blue btn-directory-type" data-type="ods">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/opendata-soft-logo.png'> 
			<span class="hidden-xs">ODS : Base Sirene</span>
		</button><br class="hidden-xs">
		<button id="btn-ods" class="btn text-yellow btn-directory-type" data-type="datanova">
			<img width=70 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo-laposte.png'> 
			<span class="hidden-xs">La poste</span>
		</button><br class="hidden-xs">
		<button id="btn-pole-emploi" class="btn text-blue btn-directory-type" data-type="pole_emploi">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo_pole_emploi.png'> 
			<span class="hidden-xs">Pôle emploi</span>
		</button><br class="hidden-xs">
		<hr class="hidden-xs">
		<button id="btn-eco-doct" class="btn text-blue btn-directory-type" data-type="eco_doct">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo_open_data_educ.jpg'> 
			<span class="hidden-xs">Ecoles doct</span>
		</button><br class="hidden-xs">
		<button id="btn-membres-univ" class="btn text-blue btn-directory-type" data-type="membres_univ">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo_open_data_educ.jpg'> 
			<span class="hidden-xs">Membres univ.</span>
		</button><br class="hidden-xs">
		<button id="btn-struc-recherche" class="btn text-blue btn-directory-type" data-type="struct_recherche">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo_open_data_educ.jpg'> 
			<span class="hidden-xs">Struc. recherche</span>
		</button><br class="hidden-xs">
		<button id="btn-etab-recherche" class="btn text-blue btn-directory-type" data-type="etab_recherche">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo_open_data_educ.jpg'> 
			<span class="hidden-xs">Etab. recherche</span>
		</button><br class="hidden-xs"> -->
		<!-- <hr class="hidden-xs"> -->
	</div> 
	<div id="dropdown_search" class="col-md-8 col-sm-8 col-xs-10 padding-10"></div>
	<!-- <div id="listTags" class="col-sm-2 col-md-2 hidden-xs hidden-sm text-left"></div> -->
</div>

<script type="text/javascript">	

jQuery(document).ready(function() {
	$(".btn-directory-type").click(function(){
		mylog.log('.btn-directory-type', $(this).data("type") );
		var type = $(this).data("type");
		//interop.startSearch();
		// putInteropImageOnTitle(typeD);
		// initTypeSearchInterop();
		// startSearchInterop(0, 30);
		// KScrollTo("#container-result-interop_search");
	});
});

</script>