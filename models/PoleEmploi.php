<?php

class PoleEmploi {
	
	public static function getResultUrl($url) {
		$curl = curl_init();
		
		curl_setopt($curl, CURLOPT_URL, "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire");

		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials&client_id=PAR_communecter_9cfae83c352184eff02df647f08661355f3be7028c7ea4eda731bf8718efbfff&client_secret=62a4a6aa2d82fa201eca1ebb3df639882d2ed7cd75284486aaed3a436df67e55&scope=application_PAR_communecter_9cfae83c352184eff02df647f08661355f3be7028c7ea4eda731bf8718efbfff api_infotravailv1"); 
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$token = curl_exec($curl);
		 
		curl_close($curl);
		//var_dump($token);
		$token_final = json_decode($token, true);

		$curl2 = curl_init();

		$pos = strpos($url, "=");

		$url_head = substr($url, 0, ($pos+1));
		$url_param = substr($url, ($pos+1));

		$url = $url_head . urlencode($url_param);
		//var_dump($url);
		curl_setopt($curl2, CURLOPT_URL, $url);
		curl_setopt($curl2, CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$token_final["access_token"]));

		curl_setopt($curl2, CURLOPT_RETURNTRANSFER, 1);
		$offres = curl_exec($curl2);
		// echo $offres;
		// exit;
		curl_close($curl2);

		$offres_final = json_decode($offres, true);
		return $offres_final;
	}
}


?>