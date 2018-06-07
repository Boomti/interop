<?php

class Interop {
	const COLLECTION = "interop";
	const CONTROLLER = "interop";
	const MODULE = "interop";
	const ICON = "fa-cubes";
	
	//TODO Translate
	

	//From Post/Form name to database field name
	// public static $dataBinding = array (
	//     "section" => array("name" => "section"),
	//     "type" => array("name" => "type"),
	//     "category" => array("name" => "category"),
	//     "subtype" => array("name" => "placeType"),
	//     "name" => array("name" => "name", "rules" => array("required")),
	//     "address" => array("name" => "address", "rules" => array("addressValid")),
	//     "addresses" => array("name" => "addresses"),
	//     "streetAddress" => array("name" => "address.streetAddress"),
	//     "postalCode" => array("name" => "address.postalCode"),
	//     "city" => array("name" => "address.codeInsee"),
	//     "addressLocality" => array("name" => "address.addressLocality"),
	//     "addressCountry" => array("name" => "address.addressCountry"),
	//     "geo" => array("name" => "geo"),
	//     "geoPosition" => array("name" => "geoPosition"),
	//     "description" => array("name" => "description"),
	//     "addresses" => array("name" => "addresses"),
	//     "parent" => array("name" => "parent"),
	//     "parentId" => array("name" => "parentId"),
	//     "parentType" => array("name" => "parentType"),
	//     "media" => array("name" => "media"),
	//     "urls" => array("name" => "urls"),
	//     "medias" => array("name" => "medias"),
	//     "tags" => array("name" => "tags"),

	//     "modified" => array("name" => "modified"),
	//     "updated" => array("name" => "updated"),
	//     "creator" => array("name" => "creator"),
	//     "created" => array("name" => "created"),
	// );

	//used in initJs.php for the modules definition
	public static function getConfig(){
		return array(
			"collection"    => self::COLLECTION,
            "controller"   	=> self::CONTROLLER,
            "module"   		=> self::MODULE,
            "assets"   		=> Yii::app()->getModule( self::MODULE )->assetsUrl,
			"init"   		=> Yii::app()->getModule( self::MODULE )->assetsUrl."/js/init.js" ,
			"form"   		=> Yii::app()->getModule( self::MODULE )->assetsUrl."/js/dynForm.js" ,
            //"categories" 	=> CO2::getModuleContextList(self::MODULE,"categories"),
            "lbhp"			=> true
		);
	}

}
?>