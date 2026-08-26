# Sonora

Plataforma web de exploración y reproducción musical, desarrollada como proyecto del curso **CIT2308 - Desarrollo Web** (Universidad Diego Portales, Semestre 2026-2), para el cliente ficticio **Sonora**.

Sonora reúne canciones, artistas y colecciones personales en una sola experiencia: catálogo con búsqueda y filtros, reproductor persistente con cola, playlists y favoritos, historial de escucha y recomendaciones explicables — todo sobre un catálogo educativo de audio propio, libre o autorizado.

## Contenido

- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo levantar el proyecto](#cómo-levantar-el-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Cuentas de prueba](#cuentas-de-prueba)
- [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
- [Roles de la plataforma](#roles-de-la-plataforma)
- [Estado del proyecto](#estado-del-proyecto)

## Stack

**Frontend**
- React + Vite
- Tailwind CSS v4
- pnpm como gestor de paquetes

**Backend**
- Node.js + Express
- Prisma (ORM)
- PostgreSQL

**Catálogo**
- [Jamendo](https://www.jamendo.com/) como fuente de música bajo licencia Creative Commons — se ingesta una vez vía script y se guarda en base de datos propia, no se consulta en vivo desde el cliente.

**Infraestructura (AWS)**
- RDS (PostgreSQL)
- App Runner (backend)
- Amplify Hosting (frontend)

## Estructura del proyecto

El frontend sigue una arquitectura de **islas**: cada pantalla o sección es un componente autocontenido, con su propio estado, sin depender de un router complejo.

```
web-rmf/
├── public/                 # assets estáticos servidos tal cual (imágenes, íconos)
├── src/
│   ├── islands/             # una carpeta por pantalla/sección
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Library.jsx
│   │   ├── Menu.jsx
│   │   ├── PlayerBar.jsx
│   │   ├── Historia.jsx
│   │   └── Admin.jsx
│   ├── shared/               # componentes y utilidades reutilizables entre islas
│   ├── PlayerContext.jsx     # único estado global: canción actual y cola de reproducción
│   ├── App.jsx                # decide qué isla mostrar según sesión/vista activa
│   ├── main.jsx
│   └── index.css              # entrada de Tailwind + fuentes
├── index.html
└── vite.config.js
```

## Cómo levantar el proyecto

Requiere [pnpm](https://pnpm.io/) instalado.

```bash
# clonar el repo
git clone https://github.com/facundoahumada-out/web-rmf.git
cd web-rmf

# instalar dependencias
pnpm install

# copiar variables de entorno de ejemplo y completar los valores propios
cp .env.example .env

# levantar el servidor de desarrollo
pnpm dev
```

Por defecto, Vite sirve el proyecto en `http://localhost:5173`.

> El servidor de desarrollo se deja **corriendo** mientras trabajas — no se reinicia en cada cambio. Los archivos se recargan solos al guardar (Hot Module Replacement).

## Variables de entorno

```env
# .env
JAMENDO_CLIENT_ID=tu_client_id_de_jamendo
VITE_API_URL=http://localhost:3000
```

`.env` no se sube al repositorio (está en `.gitignore`). Usa `.env.example` como referencia de qué variables necesitas configurar.

## Cuentas de prueba

Para probar los distintos roles sin crear una cuenta nueva:

| Rol | Correo | Contraseña |
|---|---|---|
| Oyente | `oyente@sonora.cl` | `demo1234` |
| Artista | `artista@sonora.cl` | `demo1234` |
| Admin | `admin@sonora.cl` | `demo1234` |

## Flujo de trabajo con Git

- `main` — rama estable, solo se actualiza vía Pull Request.
- Cada feature o fix se trabaja en su propia rama, con nombre descriptivo (ej: `feature/login-form`, `fix/player-bar-mobile`).
- Antes de subir cambios:

```bash
git checkout -b nombre-de-tu-rama
# ... trabajas y haces commits ...
git push -u origin nombre-de-tu-rama
```

Luego se abre un Pull Request en GitHub hacia `main` para revisión antes de mezclar.

## Roles de la plataforma

| Rol | Puede |
|---|---|
| **Oyente** | Explorar catálogo, reproducir, crear playlists, marcar favoritos, ver historial y recomendaciones. |
| **Artista** | Mantener su perfil, revisar información de sus canciones. |
| **Administrador** | Gestionar catálogo, artistas, usuarios, géneros y disponibilidad del contenido. |

## Estado del proyecto

Proyecto en desarrollo activo para el curso CIT2308. Ver la [propuesta original](./docs/propuesta-proyecto-sonora.pdf) para el detalle completo de alcance, hitos y criterios de aceptación.

---

Equipo del proyecto — CIT2308, Universidad Diego Portales, Semestre 2026-2.