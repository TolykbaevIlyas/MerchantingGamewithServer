<?php
    global $Link;

    function getData($method){
        $data = new stdClass();
        if($method != "GET"){
            $data->body = json_decode(file_get_contents('php://input'));
        }
        $data -> parameters = [];
        $dataGet = $_GET;
        foreach ($dataGet as $key => $value) {
            if($key != "q"){
                $data->parameters[$key] = $value;
            }
        }
        return $data;
    }

    function getMethod(){
        return $_SERVER['REQUEST_METHOD'];
    }

    header('Access-Control-Allow-Origin:*');
    header("Access-Control-Allow-Headers:Origin, X-Request-With, Content-Type, Accept,Authorization");
    header('Content-type: application/json');
    
    $Link = mysqli_connect("srv-pleskdb25.ps.kz:3306", "tolykbai_tolykbai", "g5x3_1i9n@RY","tolykbai_merchantsSimulator");

    if(!$Link){

        setHTTPStatus("500", "DB Connection Error: " . mysqli_connect_error());
        exit;
    }

    // echo "Соединение с MySql установлено!" . PHP_EOL;
    // echo "Информация о сервере " . mysqli_get_host_info($Link) . PHP_EOL;

    $message = [];
    $message["users"] = [];


    $url =isset($_GET['q']) ? $_GET['q'] : '';
    $url =rtrim($url, '/');
    $urlList = explode('/',  $url);

    //echo json_encode($urlList);

    $router = $urlList[0];
    $requestData = getData(getMethod());
    $method = getMethod();

    if(file_exists(realpath(dirname(__FILE__)) . '/routers/' . $router . '.php')){
        
        include_once 'routers/' . $router . '.php';

        route($method, $urlList, $requestData);
    }else{
        echo "NOPE 404";
    }

    mysqli_close($Link);
    return;

?>