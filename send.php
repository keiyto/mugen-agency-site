<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://mugen-agency.fr');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// ---- CONFIG SMTP ----
$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;
$smtpUser = 'contact@mugen-agency.fr';
$smtpPass = trim(file_get_contents(__DIR__ . '/.smtp_pass'));
$smtpFrom = 'contact@mugen-agency.fr';
$smtpTo   = 'contact@mugen-agency.fr';

// Récupération des données
$firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
$lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$projectType = htmlspecialchars(trim($_POST['projectType'] ?? ''), ENT_QUOTES, 'UTF-8');
$budget = htmlspecialchars(trim($_POST['budget'] ?? ''), ENT_QUOTES, 'UTF-8');
$source = htmlspecialchars(trim($_POST['source'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validation
if (!$firstName || !$lastName || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Champs obligatoires manquants']);
    exit;
}

// Labels lisibles
$projectLabels = [
    'vitrine' => 'Site vitrine',
    'ecommerce' => 'Boutique e-commerce',
    'seo' => 'Référencement SEO',
    'autre' => 'Autre'
];

$budgetLabels = [
    '1k' => 'Moins de 1 000 €',
    '2k' => '1 000 – 2 500 €',
    '5k' => '2 500 – 5 000 €',
    '10k' => '5 000 – 10 000 €',
    'plus' => 'Plus de 10 000 €'
];

$sourceLabels = [
    'google' => 'Recherche Google',
    'bouche' => 'Bouche à oreille',
    'reseaux' => 'Réseaux sociaux',
    'prospection' => 'Vous m\'avez contacté',
    'autre' => 'Autre'
];

$projectLabel = $projectLabels[$projectType] ?? $projectType;
$budgetLabel = $budgetLabels[$budget] ?? $budget;
$sourceLabel = $sourceLabels[$source] ?? $source;

// Construction du message
$subject = "Nouvelle demande de $firstName $lastName - $projectLabel";
$bodyText = "===========================================\r\n";
$bodyText .= "  NOUVELLE DEMANDE - MUGEN AGENCY\r\n";
$bodyText .= "===========================================\r\n\r\n";
$bodyText .= "Prénom : $firstName\r\n";
$bodyText .= "Nom : $lastName\r\n";
$bodyText .= "Email : $email\r\n\r\n";
$bodyText .= "Projet : $projectLabel\r\n";
$bodyText .= "Budget : $budgetLabel\r\n";
$bodyText .= "Source : $sourceLabel\r\n\r\n";
$bodyText .= "-------------------------------------------\r\n";
$bodyText .= "MESSAGE :\r\n";
$bodyText .= "-------------------------------------------\r\n";
$bodyText .= "$message\r\n\r\n";
$bodyText .= "-------------------------------------------\r\n";
$bodyText .= "Envoyé depuis mugen-agency.fr\r\n";

// ---- ENVOI SMTP ----
function smtpSend($host, $port, $user, $pass, $from, $to, $replyTo, $subject, $body) {
    $socket = fsockopen("ssl://$host", $port, $errno, $errstr, 10);
    if (!$socket) return "Connexion impossible: $errstr ($errno)";

    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '220') return "Erreur serveur: $resp";

    $commands = [
        "EHLO mugen-agency.fr",
        "AUTH LOGIN",
        base64_encode($user),
        base64_encode($pass),
        "MAIL FROM:<$from>",
        "RCPT TO:<$to>",
        "DATA"
    ];

    $expectedCodes = ['250', '334', '334', '235', '250', '250', '354'];

    foreach ($commands as $i => $cmd) {
        fputs($socket, $cmd . "\r\n");
        $resp = fgets($socket, 512);
        if (substr($resp, 0, 3) !== $expectedCodes[$i]) {
            fputs($socket, "QUIT\r\n");
            fclose($socket);
            return "Erreur SMTP ($cmd): $resp";
        }
    }

    // Headers + body
    $headers = "From: Mugen Agency <$from>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Reply-To: <$replyTo>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "\r\n";

    fputs($socket, $headers . $body . "\r\n.\r\n");
    $resp = fgets($socket, 512);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return (substr($resp, 0, 3) === '250') ? true : "Erreur envoi: $resp";
}

$result = smtpSend($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpFrom, $smtpTo, $email, $subject, $bodyText);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $result]);
}
