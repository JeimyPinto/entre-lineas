# 🧪 Testing Guide - NextAuth Migration

## Importar Colección en Postman

1. Abre Postman
2. Click en **Import** (esquina superior izquierda)
3. Selecciona el archivo `postman-collection.json` de este repositorio
4. La colección se importará con todos los endpoints

---

## 📋 Variables de Entorno

Antes de ejecutar los tests, configura estas variables en Postman:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `BASE_URL` | `http://localhost:3000` | URL base de tu app |
| `SESSION_TOKEN` | *(obtener de login)* | Token de sesión para rutas admin |
| `RESET_TOKEN` | *(obtener de reset)* | Token de reset de contraseña |
| `USER_ID` | *(obtener de GET users)* | ID del usuario a modificar |

---

## 🧬 Flujo de Testing Completo

### 1️⃣ Signup - Crear Usuario
**Endpoint:** `POST /api/auth/signup`

**Body:**
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123",
  "name": "Test User"
}
```

**Respuesta esperada (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "user": {
    "id": "cuid123...",
    "email": "testuser@example.com",
    "name": "Test User",
    "role": "user"
  }
}
```

---

### 2️⃣ Login - Credenciales Locales
**Endpoint:** `POST /api/auth/callback/credentials`

**Body:**
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123"
}
```

**Notas:**
- NextAuth/JWT maneja la sesión automáticamente
- Se establecerá una cookie `next-auth.session-token`
- Para APIs que requieren autenticación, usar esta sesión

**Casos de test:**
- ✅ Login exitoso con credenciales correctas
- ❌ Login fallo con contraseña incorrecta
- ❌ Login fallo con email inexistente
- ❌ Login fallo con usuario baneado

---

### 3️⃣ Password Reset - Flujo Completo

#### Paso A: Solicitar Token de Reset
**Endpoint:** `POST /api/admin/password/reset`

**Body:**
```json
{
  "email": "testuser@example.com"
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Si el email existe, se enviará un enlace de recuperación",
  "token": "abc123def456...",  // Solo en desarrollo
  "resetLink": "http://localhost:3000/admin/reset-password?token=abc123def456..."
}
```

**Importante:** Copiar el `token` para el siguiente paso.

#### Paso B: Confirmar Nueva Contraseña
**Endpoint:** `POST /api/admin/password/confirm`

**Body:**
```json
{
  "token": "{{RESET_TOKEN}}",
  "password": "NewPassword123"
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**Casos de test:**
- ✅ Reset con token válido
- ❌ Reset con token expirado
- ❌ Reset con token inválido
- ❌ Reset con contraseña muy corta
- ✅ Login con nueva contraseña funciona

---

### 4️⃣ Gestión de Usuarios (Admin)

#### Listar Usuarios
**Endpoint:** `GET /api/admin/users`

**Headers:**
```
Authorization: Bearer {{SESSION_TOKEN}}
```

**Respuesta (200):**
```json
{
  "users": [
    {
      "id": "cuid123...",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "org_role": ["admin"],
      "banned": false,
      "createdAt": "2026-06-09T17:00:00Z"
    },
    ...
  ]
}
```

**Casos de test:**
- ✅ GET con autenticación válida
- ❌ GET sin token (401)
- ❌ GET con token inválido (401)

---

#### Invitar Usuario
**Endpoint:** `POST /api/admin/users`

**Headers:**
```
Authorization: Bearer {{SESSION_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "email": "invited@example.com"
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Invitación enviada",
  "token": "xyz789...",  // Solo en desarrollo
  "inviteLink": "http://localhost:3000/api/auth/signup?invite=xyz789..."
}
```

**Casos de test:**
- ✅ Invitar usuario nuevo
- ❌ Invitar email que ya existe (409)
- ❌ Invitar email inválido (400)

---

#### Ban/Unban Usuario
**Endpoint:** `PATCH /api/admin/users/{{USER_ID}}`

**Headers:**
```
Authorization: Bearer {{SESSION_TOKEN}}
Content-Type: application/json
```

**Body (Ban):**
```json
{
  "disabled": true
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "user": {
    "id": "cuid123...",
    "email": "testuser@example.com",
    "banned": true
  }
}
```

**Body (Unban):**
```json
{
  "disabled": false
}
```

**Casos de test:**
- ✅ Ban usuario activo
- ✅ Unban usuario baneado
- ❌ Ban usuario inexistente (error)
- ✅ Usuario baneado no puede hacer login

---

#### Eliminar Usuario
**Endpoint:** `DELETE /api/admin/users/{{USER_ID}}`

**Headers:**
```
Authorization: Bearer {{SESSION_TOKEN}}
```

**Respuesta (200):**
```json
{
  "success": true,
  "user": {
    "id": "cuid123...",
    "email": "deleted@example.com"
  }
}
```

**Casos de test:**
- ✅ Eliminar usuario existente
- ❌ Eliminar usuario inexistente
- ✅ Usuario eliminado no puede hacer login
- ✅ Sesiones del usuario se cierran

---

## 🚀 Orden Recomendado de Ejecución

```
1. Signup (crear usuario de prueba)
2. Login (obtener sesión)
3. Listar Usuarios (verificar que aparece)
4. Request Password Reset (obtener token)
5. Confirm Password Reset (actualizar contraseña)
6. Login con nueva contraseña (verificar que funciona)
7. Invitar Usuario (crear otro usuario)
8. Ban Usuario (deshabilitar)
9. Verificar que usuario baneado no puede login
10. Unban Usuario (reactivar)
11. Delete Usuario (eliminar)
12. Verificar que usuario no existe
```

---

## ✅ Checklist de Validación

- [ ] Signup crea usuario correctamente
- [ ] Login con credenciales locales funciona
- [ ] Password reset genera token válido
- [ ] Nueva contraseña se puede usar para login
- [ ] GET /users lista todos los usuarios
- [ ] POST /users invite crea token de invitación
- [ ] PATCH ban/unban funciona
- [ ] DELETE usuario elimina todas sus sesiones
- [ ] Usuario baneado no puede hacer login
- [ ] Las APIs están protegidas (requieren auth)
- [ ] Los errores retornan códigos HTTP correctos

---

## 🔍 Debugging Tips

### Ver logs en consola
```bash
npm run dev
# Los logs aparecerán en la terminal
# Buscar logs con prefix: [auth], [signup], [password]
```

### Verificar BD (Prisma Studio)
```bash
npx prisma studio
# Se abre UI para ver/editar datos en BD
```

### Inspeccionar requests/responses
- Abre DevTools (F12) en el navegador
- Ve a Network para ver requests
- Ve a Storage → Cookies para ver `next-auth.session-token`

---

## 🐛 Problemas Comunes

### "DATABASE_URL not set"
- Asegúrate que `.env.local` existe con `DATABASE_URL`
- Ejecuta migraciones: `npx prisma migrate dev`

### "User not found" en login
- Ejecuta primero el endpoint Signup
- Verifica que el email sea correcto

### "Token inválido" en password reset
- El token expira en 1 hora
- Solicita uno nuevo con `/api/admin/password/reset`
- En desarrollo, el token aparece en la respuesta

### "No autorizado" en APIs admin
- Debes estar logueado primero
- Usa el endpoint Login para obtener sesión
- Las cookies se envían automáticamente

---

## 📚 Referencias

- [NextAuth v5 Docs](https://authjs.dev/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

