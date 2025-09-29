# Laboratorio 2.1 – Resumen Semgrep

## Hallazgo 1: Command Injection (ejemplo)
- **Archivo / Línea:** `index.js`, línea 54 (llamada a `exec(queryObject.cmd, ...)` dentro de `http.createServer`)
- **Gravedad:** Alta. Ejecutar directamente entrada controlada por el usuario permite inyección de comandos y ejecución remota en el servidor.
- **Propuesta de mitigación:** No ejecutar comandos recibidos del usuario. Usar un conjunto de comandos permitidos (whitelist) o mapear acciones a comandos predeterminados; si debe ejecutarse un proceso, usar `spawn`/`execFile` con argumentos separados y validar/escapar rigurosamente toda entrada.

## Hallazgo 2: Hardcoded Secret (ejemplo)
- **Archivo / Línea:** `index.js`, línea 66 (`const SECRET_KEY = "12345-CLAVE-SUPER-INSEGURA";`)
- **Gravedad:** Media-Alta. Claves incrustadas en el código pueden filtrarse (control de versiones, despliegues) y facilitan compromisos si se exponen.
- **Propuesta de mitigación:** Mover secretos a variables de entorno o a un gestor de secretos (Vault, AWS Secrets Manager, etc.). Asegurar que ningún secreto esté versionado (añadir a `.gitignore` y rotar claves si se han comprometido).

