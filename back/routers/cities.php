<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $dealer = $Link->query("SELECT * from cities");

                while($row = $dealer->fetch_array(MYSQLI_ASSOC)){
                     $dealerInfo[] = (['id' => $row['id'], 'name' => $row['name'], 'distance' => $row['distance']]);
                    }

                //echo rand(5, 15)
                echo json_encode($dealerInfo[rand(0,count($dealerInfo) - 1)]);

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