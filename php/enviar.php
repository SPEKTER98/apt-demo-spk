<?php
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

  // Prevenir inyección de cabeceras
  $pattern = "/(content-type|bcc:|cc:|to:)/i";
  if (preg_match($pattern, $nombre) || preg_match($pattern, $email) || preg_match($pattern, $asunto)) {
    $errores[] = "Datos inválidos detectados.";
  }

  if (!empty($errores)) {
    echo "Error:<br>" . implode("<br>", $errores);
    exit();
  }

  // Configurar el envío del correo
  $to = "dominiksalazar10@gmail.com";  // Cambia esto por el correo destino real
  $subject = "Nuevo mensaje de contacto: $asunto";
  $body = "Nombre: $nombre\nCorreo: $email\nAsunto: $asunto\nMensaje:\n$mensaje";

  $headers = "From: noreply@aptts.net.ve\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  if (mail($to, $subject, $body, $headers)) {
    header("Location: gracias.html");
    exit();
  } else {
    echo "Error al enviar el mensaje. Intenta de nuevo.";
  }

} else {
  echo "Acceso no permitido.";
}
?>