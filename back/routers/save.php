<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $login = $requestData->parameters['login'];
                $dealer = $Link->query("SELECT * from dealer Where login='$login'")->fetch_assoc();
                $dealerId = $dealer['id'];
                $saveId = $Link->query("SELECT * from playersaves where playerId='$dealerId'");

                while($row = $saveId->fetch_array(MYSQLI_ASSOC)){
                    $lastSave = $row;
                }
                $saveID = $lastSave['id'];

                $products = $Link->query("SELECT * from productsave Where dealerID='$saveID'");

                while($row = $products->fetch_array(MYSQLI_ASSOC)){
                    $product[] = (['id' => $row['id'], 'productName' => $row['productName'], 'productweight' => $row['productweight'], 'productCost' => $row['productCost'], 'productType' => $row['productType'], 'productStatus' => $row['productStatus'], 'productCostOfSellingPlace'=>$row['productCostOfSellingPlace']
                , "speed"=> $lastSave['speed'], "money"=>$lastSave['money'], 'weight'=>$lastSave['weight']]);
                    //$product += $row;
                    //echo json_encode($row);
                }

                echo json_encode($product);

                break;
            case 'POST':
                $date = date('Y-m-d H:i:s');
                $login = $requestData->body->login;
                $dealerId = $Link->query("SELECT id from dealer where login='$login'")->fetch_assoc();
                $dealerClearId = $dealerId['id'];
                $saveNum = date('Y-m-d H:i');

                $productName = $requestData->body->name;
                $productGet = $Link->query("SELECT * from products where name='$productName'")->fetch_assoc();
                $productCurrentName = $productGet['name'];
                $productweight = $productGet['weight'];
                $productCost = $productGet['cost'];
                $productType = $productGet['type'];
                $productStatus = $productGet['status'];
                $productCostOfSellingPlace = $productGet['CostOfSellingPlace'];
                
                $cityName = $requestData->body->cityName;
                $cityDistance = $requestData->body->cityDistance;
                $speed = $requestData->body->speed;
                $weight = $requestData->body->weight;
                $money = $requestData->body->cost;

                $saveId = $Link->query("SELECT * from playersaves where SaveName='$saveNum'")->fetch_assoc();
                
                if(($saveId['SaveName']) != $saveNum){
                    //echo json_encode($saveNum);
                    $saves = $Link->query("INSERT INTO `playersaves` (`SaveName`, `playerID`, `city`, `distance`, `speed`, `money`, `weight`) VALUES ('$saveNum', '$dealerClearId', '$cityName', '$cityDistance', '$speed', '$money', '$weight')");
                }

                $saveId = $Link->query("SELECT * from playersaves where SaveName='$saveNum'")->fetch_assoc();

                $saveCurrentId = $saveId['id'];

                $saveInsertResult = $Link->query("INSERT INTO `productsave` (`savename`, `dealerID`, `productName`, `productweight`, `productCost`, `productType`, `productStatus`, `productCostOfSellingPlace`) VALUES ('$saveNum', '$saveCurrentId', '$productCurrentName', '$productweight', '$productCost', ' $productType', '$productStatus', '$productCostOfSellingPlace')");

                //echo json_encode(['saveNum' => $saveNum, 'saveCurrentId' => $saveCurrentId, 'productCurrentName' => $productCurrentName, 'productweight' => $productweight, 'productCost' => $productCost, 'productType' => $productType, 'productStatus' => $productStatus, 'productCostOfSellingPlace' => $productCostOfSellingPlace]);
                //echo json_encode();
                //echo json_encode($date);
                //echo json_encode($saveNum);
                echo json_encode($productID);
                // echo json_encode(['adventure' => 'true']);
                break;
            default:
                break;
        }
    }

?>