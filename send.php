<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://mugen-agency.fr');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

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

// Construction de l'email
$to = 'contact@mugen-agency.fr';
$subject = "Nouvelle demande de $firstName $lastName - $projectLabel";

$body = "
===========================================
  NOUVELLE DEMANDE - MUGEN AGENCY
===========================================

Prénom : $firstName
Nom : $lastName
Email : $email

Projet : $projectLabel
Budget : $budgetLabel
Source : $sourceLabel

-------------------------------------------
MESSAGE :
-------------------------------------------
$message

-------------------------------------------
Envoyé depuis mugen-agency.fr
";

$headers = "From: Mugen Agency <noreply@mugen-agency.fr>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: Mugen Agency Contact Form\r\n";

// Envoi
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi']);
}
