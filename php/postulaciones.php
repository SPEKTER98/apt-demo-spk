
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

    $recaptcha = $_POST['g-recaptcha-response'];
    $secretKey = "TU_SECRET_KEY_AQUI";

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$recaptcha}");
    $response = json_decode($verify);

    if (!$response->success) {
    throw new Exception("No se pudo verificar el reCAPTCHA. Intenta de nuevo.");
    }

    $mail->send();

     // ✅ Redirección al finalizar con éxito
    header("Location: gracias.html#thanks");
    exit;

} catch (Exception $e) {
    echo "Error al enviar: " . $e->getMessage();
}
?>
