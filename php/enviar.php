<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $asunto = trim($_POST['asunto']);
    $mensaje = trim($_POST['mensaje']);

    $errores = [];

    if (empty($nombre) || strlen($nombre) > 100) {
        $errores[] = "Nombre inválido.";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100) {
        $errores[] = "Correo electrónico inválido.";
    }

    if (empty($asunto) || strlen($asunto) > 100) {
        $errores[] = "Asunto inválido.";
    }

    if (empty($mensaje) || strlen($mensaje) > 1000) {
        $errores[] = "Mensaje inválido o demasiado largo.";
    }

    // Prevenir cabeceras maliciosas
    $pattern = "/(content-type|bcc:|cc:|to:)/i";
    if (preg_match($pattern, $nombre) || preg_match($pattern, $email) || preg_match($pattern, $asunto)) {
        $errores[] = "Datos inválidos detectados.";
    }

    if (!empty($errores)) {
        echo "Error:<br>" . implode("<br>", $errores);
        exit();
    }

    // Configuración de PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // o el servidor SMTP de tu hosting
        $mail->SMTPAuth   = true;
        $mail->Username   = 'Postulaciones.aptts@gmail.com'; // tu correo
        $mail->Password   = 'xfrnspntzuupllxi'; // tu App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('Postulaciones.aptts@gmail.com', 'Formulario de Contacto');
        $mail->addAddress('dominiksalazar10@gmail.com'); // destinatario
        $mail->addAddress('postulaciones.aptts@gmail.com'); // copia a correo de origen

        // Opcional: Responder al correo del usuario
        $mail->addReplyTo($email, $nombre);

        $mail->Subject = "Nuevo mensaje de contacto: $asunto";
        $mail->Body    = "Nombre: $nombre\nCorreo: $email\nAsunto: $asunto\n\nMensaje:\n$mensaje";

        $mail->send();

        // Redirigir a página de agradecimiento
        header("Location: gracias.html#thanks");
        exit();
    } catch (Exception $e) {
        echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
    }

} else {
    echo "Acceso no permitido.";
}
?>