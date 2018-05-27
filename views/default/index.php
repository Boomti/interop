<?php
//gettting asstes from parent module repo
$cssAnsScriptFilesModule = array( 
	'/js/dataHelpers.js',
	'/js/interoperability/interoperability.js',
	
);
HtmlHelper::registerCssAndScriptsFiles($cssAnsScriptFilesModule, Yii::app()->getModule( Yii::app()->params["module"]["parent"] )->getAssetsUrl() );


$cssAnsScriptFilesModule = array( 
	'/js/interop.js',
);
HtmlHelper::registerCssAndScriptsFiles($cssAnsScriptFilesModule, Yii::app()->getModule( Interop::MODULE )->getAssetsUrl() );




if( $this->layout != "//layouts/empty"){
	$layoutPath = 'webroot.themes.'.Yii::app()->theme->name.'.views.layouts.';
	$this->renderPartial($layoutPath.'header',array("page"=>"interop","layoutPath"=>$layoutPath));
}

var_dump(Yii::app()->params["module"]);

echo Yii::app()->getModule( Interop::MODULE )->assetsUrl.'/js/interop.js' ;

?>

<div id="container-result-interop_search" class="container-result-search col-xs-12 bg-white">
	<div class="col-sm-2 col-md-2 col-xs-12 text-right pull-left margin-top-15 no-padding" 
			id="col-btn-type-directory">
		<hr class="hidden-xs">
 		<button id="btn-wiki" class="btn text-grey btn-directory-type" data-type="wikidata">
			<img width=50 src='<?php echo $this->module->assetsUrl; ?>/images/logos/logo-wikidata.png'> 
			<span class="hidden-xs">Wikidata</span>
		</button><br class="hidden-xs">
	</div> 
	<div id="dropdown_search" class="col-md-8 col-sm-8 col-xs-10 padding-10"></div>
</div>

<script type="text/javascript">	

jQuery(document).ready(function() {
	$(".btn-directory-type").click(function(){
		mylog.log('.btn-directory-type', $(this).data("type") );
		var type = $(this).data("type");
		interop.startSearch(0,30);
		// putInteropImageOnTitle(typeD);
		// initTypeSearchInterop();
		// startSearchInterop(0, 30);
		// KScrollTo("#container-result-interop_search");
	});
});

</script>