

<!-- local-development:start -->
# Desarrollo local

Puedes abrir este repositorio en VS Code, Antigravity o Sublime Text. El compilador y los servicios necesarios dependen del componente indicado abajo.

## Ruby / Rails

Usa la versión de Ruby y el Gemfile de cada aplicación en WSL o Linux. Crea una base de datos local y ejecuta sus pruebas antes de iniciarla. El editor de Windows no aporta el runtime Ruby.

## Componentes y validación

Inventario y compilaciones locales del 2026-11-15. Una compilación correcta no acredita todavía interacción, compatibilidad de base de datos, instalador ni despliegue.

| Componente | Tipo / destino | Validación |
| --- | --- | --- |
| [Ruby-master/ProyectRuby/proyecto/Gemfile](<Ruby-master/ProyectRuby/proyecto/Gemfile>) | ruby | Sin ejecutar |
| [Ruby-master/RubyRailsLinux/Test1/Gemfile](<Ruby-master/RubyRailsLinux/Test1/Gemfile>) | ruby | Sin ejecutar |
| [Ruby-master/RubyRailsLinux/andres/Gemfile](<Ruby-master/RubyRailsLinux/andres/Gemfile>) | ruby | Sin ejecutar |

## Archivos ignorados

`.gitignore` excluye credenciales locales, estado del editor y salidas de las herramientas detectadas. No deja de versionar archivos que ya estaban en Git. Los manifiestos, archivos de bloqueo, recursos fuente y scripts de esquema forman parte del código.
<!-- local-development:end -->

<!-- improvements-20261119:start -->
## Mejoras y verificación — 2026-11-19 (Cliente JS endurecido (tabs sin bug de cierre, auth limpia y URL configurable) y verificación Ruby)

- Corregido el bug de cierre en `cambiarPestanna` (`$(document).ready` dentro de `while` en `Client/JavaScript/index.js`), limpieza de `authtoken` en logout, validación de IDs con `encodeURIComponent` y soporte de URL configurable (`PROYECTRUBY_API_URL`).
- Validación: `node --check`, `node --test` sobre helpers REST del cliente, `ruby -c` en scripts/controladores y ejecución de `Guia/HolaMundo.rb` en WSL Ruby 3.2.3.
<!-- improvements-20261119:end -->
