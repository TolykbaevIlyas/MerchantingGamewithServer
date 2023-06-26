<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $login = $requestData->parameters['login'];
                $dealer = $Link->query("SELECT id from dealer Where login='$login'")->fetch_assoc();
                $dealerId = $dealer['id'];
                $city = $Link->query("SELECT * FROM `playersaves` Where playerID='$dealerId'")->fetch_assoc();
                $CityInfo[] = (['id' => $city['id'], 'name' => $city['city'], 'distance' => $city['distance']]);
                echo json_encode($CityInfo);

                break;
            case 'POST':
                $name = $requestData->body->cityName;
                $distance = $requestData->body->cityDistance;
                $cityName = $Link->query("SELECT name from cities Where name='$name'")->fetch_assoc();

                if($name != $cityName['name']){
                    $cityInsertResult = $Link->query("INSERT INTO `cities` (`name`, `distance`) VALUES ('$name', '$distance')");
                    echo json_encode(['access' => true, 'name' => $name, 'cityName' => $cityName['name']]);
                }else{
                    echo json_encode(['access' => false, 'name' => $name, 'cityName' => $cityName['name']]);
                }
                break;
                break;
            default:
                break;
        }
    }

?>