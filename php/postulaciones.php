
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
try {
    $nombre   = htmlspecialchars($_POST['nombre']);
    $email    = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $telefono = htmlspecialchars($_POST['telefono']);
    $cargo    = htmlspecialchars($_POST['cargo']);
    $mensaje  = htmlspecialchars($_POST['mensaje']);

    if (!$email) {
        throw new Exception("Correo no válido.");
    }

    $archivo = $_FILES['cv'];
    $permitidos = ['pdf', 'doc', 'docx'];
    $ext = strtolower(pathinfo($archivo['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $permitidos)) {
        throw new Exception("Tipo de archivo no permitido.");
    }

    if ($archivo['size'] > 2 * 1024 * 1024) {
        throw new Exception("El archivo excede los 2MB permitidos.");
    }

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'Postulaciones.aptts@gmail.com';
    $mail->Password   = 'xfrnspntzuupllxi';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('Postulaciones.aptts@gmail.com', 'Postulaciones Web');
    $mail->addAddress('Postulaciones.aptts@gmail.com');

    $mail->Subject = "Nueva Postulacion: $nombre";
    $mail->Body    = "Nombre: $nombre\nCorreo: $email\nTeléfono: $telefono\nCargo: $cargo\nMensaje:\n$mensaje";
    $mail->addAttachment($archivo['tmp_name'], basename($archivo['name']));

    //Recaptcha v2

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Tu clave secreta de reCAPTCHA v2
    $secretKey = '6LeFMHQrAAAAAME43oQnwlAiThLRiuGMA6-RkuJ1';

    // La respuesta que envía el formulario (token)
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verificar que venga el token
    if (empty($recaptchaResponse)) {
        die('Por favor completa el reCAPTCHA.');
    }

    // Hacer la solicitud POST a Google para validar el token
    $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($verifyUrl . '?secret=' . $secretKey . '&response=' . $recaptchaResponse);
    $responseData = json_decode($response);

    if ($responseData->success) {
        // reCAPTCHA validado correctamente
        // Aquí va el resto del procesamiento de tu formulario (guardar datos, enviar email, etc)
        echo 'reCAPTCHA validado, formulario enviado correctamente.';
    } else {
        // Validación fallida
        die('Error al validar reCAPTCHA, intenta de nuevo.');
    }
} else {
    // Si no es POST redirigir o mostrar error
    die('Acceso inválido.');
}

//Envio de formulario
    $mail->send();

     // ✅ Redirección al finalizar con éxito
    header("Location: gracias.html#thanks");
    exit;

} catch (Exception $e) {
    echo "Error al enviar: " . $e->getMessage();
}
?>
