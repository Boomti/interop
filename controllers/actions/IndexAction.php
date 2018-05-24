<?php
class IndexAction extends CAction
{
    public function run(){
    	//echo "Hello there"; exit;
      	CO2Stat::incNbLoad("co2-interop");
		if(Yii::app()->request->isAjaxRequest)
			echo $this->getController()->render("interop.views.co.index");
		else {
			//$this->getController()->layout = "//layouts/empty";
			$controller->render( "interop.views.co.index");
		}

    }
}