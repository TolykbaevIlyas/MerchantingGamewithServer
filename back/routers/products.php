<?php
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                $products = $Link->query("SELECT * from products");

                while($row = $products->fetch_array(MYSQLI_ASSOC)){
                     $usersAll[] = (['id' => $row['id'], 'name' => $row['name'], 'weight' => $row['weight'], 'cost' => $row['cost'], 'type' => $row['type'], 'status' => $row['status'],'CostOfSellingPlace' => $row['CostOfSellingPlace']]);
                     //echo json_encode($row);
                    }
                echo json_encode($usersAll);
                break;
            case 'POST':
                $name = $requestData->body->NameOfProduct;
                $cost = $requestData->body->CostOfProduct;
                $weight = $requestData->body->WeightfOfProduct;
                $status = $requestData->body->StatusOfProduct;
                $type = $requestData->body->TypeOfProduct;
                $sellingPrice = $cost * $status;
                $productName = $Link->query("SELECT name from products Where name='$name'")->fetch_assoc();

                if($name != $productName['name']){
                    $productInsertResult = $Link->query("INSERT INTO `products` (`name`, `weight`, `cost`, `type`, `status`, `CostOfSellingPlace`) VALUES ('$name', '$weight','$cost','$type', '$status', '$sellingPrice')");
                    echo json_encode(['access' => true, 'name' => $requestData, 'productName' => $productName['name']]);
                }else{
                    echo json_encode(['access' => false, 'name' => $requestData, 'productName' => $productName['name']]);
                }
                //echo json_encode($requestData);
                break;
            
            default:
                break;
        }
    }

?>