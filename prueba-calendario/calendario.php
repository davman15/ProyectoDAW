<?php
    class conexion{

        private $conn=null;
        public function __construct()
        {
            $dsn="mysql:host=localhost;charset=utf8;";
            $this->conn=new PDO($dsn,'root','');
        }

        public function agregarFechas($titulo,$fechaIni,$fechaFin,$color,$descripcion){
            $datos=array(':titulo'=>$titulo,':fechaIni'=>$fechaIni,':fechaFin'=>$fechaFin,':color'=>$color,':descripcion'=>$descripcion);
            $sql='insert into calendario.fechas (title,start,end,color,description) values (:titulo,:fechaIni,:fechaFin,:color,:descripcion)';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function modificarFechas($titulo,$fechaIni,$fechaFin,$color,$descripcion,$id){
            $datos=array(':titulo'=>$titulo,':fechaIni'=>$fechaIni,':fechaFin'=>$fechaFin,':color'=>$color,':descripcion'=>$descripcion,':id'=>$id);
            $sql='update calendario.fechas set title=:titulo, start=:fechaIni, end=:fechaFin, color=:color , description=:descripcion where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function drop($fechaIni,$fechaFin,$id){
            $datos=array(':fechaIni'=>$fechaIni,':fechaFin'=>$fechaFin,':id'=>$id);
            $sql='update calendario.fechas set start=:fechaIni, end=:fechaFin where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function eliminarFechas($id){
            $datos=array(':id'=>$id);
            $sql='delete from calendario.fechas where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function listarEventos(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from calendario.fechas");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }
    }

    $conexion=new conexion();

    if(isset($_POST['x'])){
        $datos=json_decode($_POST['x']);

        if($datos[5]==""){
            if($conexion->agregarFechas($datos[0],$datos[1],$datos[2],$datos[3],$datos[4])){
                echo json_encode(1);
            }else{
                echo json_encode(0);
            }            
        }else{
            if($conexion->modificarFechas($datos[0],$datos[1],$datos[2],$datos[3],$datos[4],$datos[5])){
                echo json_encode(1);
            }else{
                echo json_encode(0);
            }
        }
    }

    if(isset($_POST['d'])){
        $datos=json_decode($_POST['d']);
        if($conexion->drop($datos[0],$datos[1],$datos[2])){
            echo json_encode(1);
        }else{
            echo json_encode(0);
        }
    }


    if(isset($_POST['b'])){
        $datos=json_decode($_POST['b']);
        if($conexion->eliminarFechas($datos)){
            echo json_encode(1);
        }else{
            echo json_encode(0);
        }
    }

?>