<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $event = $Link->query("SELECT * from event");

                while($row = $event->fetch_array(MYSQLI_ASSOC)){
                     $dealerInfo[] = (['id' => $row['id'], 'name' => $row['name'], 'description' => $row['description'], 'speed' => $row['speed'], 'luck' => $row['luck']]);
                    }

                //echo rand(5, 15)
                echo json_encode($dealerInfo[rand(0,count($dealerInfo) - 1)]);

                break;
            case 'POST':
                $name = $requestData->body->NameOfEvent;
                $discription = $requestData->body->DiscriptionOfEvent;
                $speed = $requestData->body->SpeedDebuffOfEvent;
                $luck = $requestData->body->LuckDebuffOfEvent;
                $eventName = $Link->query("SELECT name from event Where name='$name'")->fetch_assoc();

                if($name != $eventName['name']){
                    $eventInsertResult = $Link->query("INSERT INTO `event` (`name`, `description`, `speed`, `luck`) VALUES ('$name', '$distance','$speed','$luck')");
                    echo json_encode(['access' => true, 'name' => $requestData, 'cityName' => $eventName['name']]);
                }else{
                    echo json_encode(['access' => false, 'name' => $requestData, 'cityName' => $eventName['name']]);
                }
                break;
            default:
                break;
        }
    }

?>