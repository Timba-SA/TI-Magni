# Verification: 001-backend-auth-module

- **Prueba 1:** Ejecución del seed inicial crea el usuario `admin`. (Exitoso)
- **Prueba 2:** POST `/api/auth/login` con admin/admin123 retorna código HTTP 200 y el objeto `user`. (Exitoso)
- **Prueba 3:** Intento de login con contraseña incorrecta retorna HTTP 401. (Exitoso)
