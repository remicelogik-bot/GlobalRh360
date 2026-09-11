<?php
// Traitement minimal du formulaire de contact, pense pour l'hebergement
// mutualise Hostinger (PHP natif, pas de service tiers).

declare(strict_types=1);

const DEST_EMAIL = "cr.globalrh@gmail.com";
const REDIRECT_OK = "/contact-merci/";
const REDIRECT_ERROR = "/contact/?erreur=1";

function clean_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], "", $value));
}

function redirect(string $url): void {
    header("Location: " . $url, true, 303);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    redirect("/contact/");
}

$nom = clean_header_value((string)($_POST["nom"] ?? ""));
$email = clean_header_value((string)($_POST["email"] ?? ""));
$telephone = clean_header_value((string)($_POST["telephone"] ?? ""));
$message = trim((string)($_POST["message"] ?? ""));

if ($nom === "" || $message === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect(REDIRECT_ERROR);
}

$subject = "Nouveau message depuis globalrh360.fr";
$body = "Nom : {$nom}\n"
      . "Email : {$email}\n"
      . "Telephone : " . ($telephone !== "" ? $telephone : "non renseigne") . "\n\n"
      . "Message :\n{$message}\n";

$headers = [
    "From: GLOBAL RH site <no-reply@globalrh360.fr>",
    "Reply-To: " . $nom . " <" . $email . ">",
    "Content-Type: text/plain; charset=UTF-8",
];

$sent = mail(DEST_EMAIL, $subject, $body, implode("\r\n", $headers));

redirect($sent ? REDIRECT_OK : REDIRECT_ERROR);
