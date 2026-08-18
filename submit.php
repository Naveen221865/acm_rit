<?php
// ── CONFIG ──────────────────────────────────────────────
$apps_script_url = "https://script.google.com/macros/s/AKfycbxfDVh97YjERqiYUzY4NJzBQ4jU6uxthyP5WqWYLYhM8SdHdwdRAN2NpbraV1SgBmf3/exec";
// ────────────────────────────────────────────────────────

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: join.html");
    exit;
}

function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)));
}

$data = [
    "first_name"      => clean($_POST["first_name"]      ?? ""),
    "last_name"       => clean($_POST["last_name"]       ?? ""),
    "register_number" => clean($_POST["register_number"] ?? ""),
    "department"      => clean($_POST["department"]      ?? ""),
    "section"         => clean($_POST["section"]         ?? ""),
    "year"            => clean($_POST["year"]            ?? ""),
    "phone"           => clean($_POST["phone"]           ?? ""),
    "email"           => clean($_POST["email"]           ?? ""),
    "interest"        => clean($_POST["interest"]        ?? ""),
    "reason"          => clean($_POST["reason"]          ?? ""),
];

// ── SEND TO GOOGLE APPS SCRIPT ───────────────────────────
$ch = curl_init($apps_script_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_exec($ch);
curl_close($ch);

// ── REDIRECT WITH SUCCESS ────────────────────────────────
header("Location: join.html?status=success");
exit;
?>
