<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $login = $requestData->parameters['login'];
                $dealer = $Link->query("SELECT * from dealer Where login='$login'");

                while($row = $dealer->fetch_array(MYSQLI_ASSOC)){
                     $dealerInfo[] = (['id' => $row['id'], 'login' => $row['login'], 'speed' => $row['speed'], 'money' => $row['money'], 'weight' => $row['weight']]);
                    }
                echo json_encode($dealerInfo);

                break;
            case 'POST':
                $login = $requestData->body->login;
                $dealer = $Link->query("SELECT login from dealer Where login='$login'")->fetch_assoc();
                

                if($login != $dealer['login']){
                    $weight = rand(50, 130);
                    $speed = rand(2, 8);
                    $money =rand(50000, 150000);
                    $userInsertsResult = $Link->query("INSERT INTO `dealer` (`login`, `speed`, `money`, `weight`) VALUES ('$login', '$speed', '$money', '$weight')");
                    $dealerId = $Link->query("SELECT id from dealer where login='$login'")->fetch_assoc();
                    $saveNum = date('Y-m-d H:i');
                    $dealerClearId = $dealerId['id'];

                    $city = $Link->query("SELECT * from cities");

                    while($row = $city->fetch_array(MYSQLI_ASSOC)){
                         $cityInfo[] = (['id' => $row['id'], 'name' => $row['name'], 'distance' => $row['distance']]);
                    }

                    $info = $cityInfo[rand(0 ,count($cityInfo) - 1)];
                    $cityName = $info['name'];
                    $cityDistance = $info['distance'];

                    $saves = $Link->query("INSERT INTO `playersaves` (`SaveName`, `playerID`, `city`, `distance`, `speed`, `money`, `weight`) VALUES ('$saveNum', '$dealerClearId', '$cityName', '$cityDistance', '$speed', '$money', '$weight')");
                    echo json_encode(['access' => true, 'login' => $login, 'dealer' => $dealer['login']]);
                }else{
                    echo json_encode(['access' => false, 'login' => $login, 'dealer' => $dealer['login']]);
                }
                break;
            default:
                break;
        }
    }

?>