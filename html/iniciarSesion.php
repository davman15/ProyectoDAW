<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="icon" href="../img/Icono_Notek.png">
    <!--Link de Bootstrap-->
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <!--Estilos CSS de la pagina-->
    <link rel="stylesheet" href="../css/iniciarSesion.css">
    <!--Libreria de alertas-->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!--Libreria de animaciones chidaas-->
    <link rel="stylesheet" href="../css/animate.css" />
    <script src="../js/jquery-3.6.0.min.js"></script>
</head>

<body id="fondo">
    <div id="cajaPrincipal" class="row">
        <!--Esta caja es la contiene al contenido del formulario-->
        <div id="cajaInicio" class="col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3">
            <a href="../index.html"><img src="../img/Logo_Notek.png" alt="NotekLogo" class="logoImagen"></a>
            <div class="row bg-dark">
                <h2 class="text-white pt-3 pb-5 col-12">Iniciar Sesión</h2>
                <form class="col">
                    <div class="row">
                        <div class="col-5">
                            <label class="text-light">Email</label>
                        </div>
                        <div class="col-6">
                            <input type="email" id="email" name="email" class="form-control " />
                        </div>
                        <div class="col-5 pt-4">
                            <label class="text-light">Contraseña</label>
                        </div>
                        <div class="col-6 pt-4">
                            <input type="password" id="password" name="contrasena" class="form-control " />
                        </div>
                        <div class="col pt-5 pb-5">
                            <div class="centrarBoton">
                                <input type="button" id="boton" value="Iniciar Sesión"
                                    class="form-control w-auto btn btn-outline-light" />
                            </div>
                            <p class="text-center text-muted mt-3 mb-0">¿No tienes una cuenta? <a href="./registro.php"
                                    class="fw-bold text-info"><u>Regístrate</u></a></p>
                            <p class="text-center mt-3 mb-0"><a href="./passOlvidada.php"
                                    class="fw-bold text-info"><u>¿Olvidaste la contraseña?</u></a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="module" src="../js/iniciarSesion.js"></script>
    <!--Script de Bootstrap-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
        crossorigin="anonymous"></script>
</body>

</html>