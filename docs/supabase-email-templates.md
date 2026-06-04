# Plantillas de Email de Supabase

## Configuración en Supabase Dashboard

Ir a: **Authentication → Templates → Reset password**

## Plantilla mejorada para Entre Líneas

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recupera tu Contraseña - Entre Líneas</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0a0a0a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo img {
      width: 120px;
      height: 120px;
    }
    .card {
      background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
      border: 1px solid #333;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
    }
    h1 {
      color: #fff;
      font-size: 28px;
      margin: 0 0 20px 0;
      font-weight: 300;
    }
    p {
      color: #888;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 30px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #ff6b35, #f7931e);
      color: #fff;
      text-decoration: none;
      padding: 16px 40px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
    }
    .button:hover {
      background: linear-gradient(135deg, #f7931e, #ff6b35);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #444;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <img src="https://tu-proyecto.vercel.app/1-01.png" alt="Entre Líneas">
      </div>
      <h1>Recupera tu Contraseña</h1>
      <p>Hemos recibido una solicitud para restablecer tu contraseña del Panel de Control de Entre Líneas.</p>
      <p>Haz clic en el botón de abajo para crear una nueva contraseña:</p>
      <a href="{{ .ConfirmationURL }}" class="button">Restablecer Contraseña</a>
      <p style="margin-top: 30px; font-size: 14px;">Este link expire en 60 minutos.</p>
    </div>
    <div class="footer">
      <p>© 2026 Entre Líneas - Colombia</p>
    </div>
  </div>
</body>
</html>
```

## Plantilla de Confirmación (opcional)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido - Entre Líneas</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; margin-bottom: 30px; }
    .logo img { width: 120px; height: 120px; }
    .card { background: linear-gradient(145deg, #1a1a1a, #0f0f0f); border: 1px solid #333; border-radius: 16px; padding: 40px; text-align: center; }
    h1 { color: #fff; font-size: 28px; margin: 0 0 20px 0; font-weight: 300; }
    p { color: #888; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; }
    .button { display: inline-block; background: linear-gradient(135deg, #ff6b35, #f7931e); color: #fff; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; }
    .footer { text-align: center; margin-top: 40px; color: #444; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <img src="https://entre-lineas-rap.vercel.app/" alt="Entre Líneas">
      </div>
      <h1>¡Bienvenido a Entre Líneas!</h1>
      <p>Tu cuenta ha sido creada exitosamente. Confirma tu email para acceder al Panel de Control.</p>
      <a href="{{ .ConfirmationURL }}" class="button">Confirmar Email</a>
    </div>
    <div class="footer">
      <p>© 2026 Entre Líneas - Colombia</p>
    </div>
  </div>
</body>
</html>
```

## Notas

1. Reemplaza `https://tu-proyecto.vercel.app/1-01.png` con tu URL real de producción
2. El color principal (#ff6b35) es el naranja de Entre Líneas
3. Mantén los variables `{{ .ConfirmationURL }}` y `{{ .SiteURL }}` tal cual
