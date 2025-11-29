# MiUNAC Mapa Vivo 🚀

## Descripción general
MiUNAC Mapa Vivo es una plataforma hecha por estudiantes para estudiantes de la Universidad Nacional del Callao. Combina dinámicas de redes sociales tipo Twitter con mapas interactivos para mostrar publicaciones, estados, servicios, inventario y eventos directamente sobre el mapa del campus UNAC. El objetivo es fomentar la colaboración, el apoyo académico, el networking y la gestión comunitaria del campus mediante experiencias geoespaciales accesibles.

## Características principales
- Microestados geoespaciales tipo tweets con ubicación precisa y contexto inmediato.
- Mentorías y apoyo académico entre estudiantes y egresados.
- Préstamo o intercambio de objetos y recursos estudiantiles.
- Servicios estudiantiles informales (tutorías, resúmenes, impresión, etc.).
- Mapa interactivo con pines animados, capas temáticas y filtros dinámicos.
- Eventos del campus representados como NPCs (sustentaciones, charlas, ferias).
- Chat básico 1-a-1 entre estudiantes.
- Perfiles personalizables con inventario simple y estados recientes.

## Arquitectura del sistema
- **Backend**: Python con Django REST Framework; base de datos PostgreSQL con extensión PostGIS para consultas espaciales.
- **Frontend**: Next.js con React, TailwindCSS para estilos y Framer Motion para animaciones fluidas.
- **Mapa**: MapLibre GL JS o Mapbox GL JS para renderizado vectorial y control de capas.
- **Geoprocesamiento**: QGIS para preparación de geodatos del campus y validación de geometrías.
- **Versión móvil**: optimizada con diseño responsive y componentes adaptativos.

## Tecnologías usadas
- **Lenguajes**: Python, TypeScript/JavaScript.
- **Frameworks**: Django REST Framework, Next.js, React.
- **UI/UX**: TailwindCSS, Framer Motion.
- **Mapas**: MapLibre GL JS / Mapbox GL JS.
- **Base de datos**: PostgreSQL + PostGIS.
- **Geotools**: QGIS para edición y exportación de geodatos.

## Módulos del MVP
- Mapa del campus UNAC con pines interactivos.
- Publicación de estados geolocalizados (microestados).
- Perfiles básicos con alias y foto.
- Inventario simple para objetos o servicios ofrecidos.
- Chat 1-a-1 básico entre estudiantes.
- Filtros por tipo de estado (ayuda, servicios, eventos, objetos, etc.).
- Soporte para estados NPC que representan eventos del campus.

## Mapa y geodatos
- Uso de capas vectoriales del campus UNAC (aulas, laboratorios, zonas comunes, servicios).
- Pines animados y tooltips para mostrar contenido en contexto espacial.
- Geocodificación y validación con PostGIS; edición de insumos geográficos con QGIS.
- Posible uso de teselas vectoriales para rendimiento en web y móvil.

## Futuras versiones
- Portafolios académicos y de proyectos para cada estudiante.
- Reputación, logros y gamificación para incentivar participación.
- Sistema de proyectos estudiantiles colaborativos con seguimiento.
- Integración con API oficial de eventos de facultades y escuelas.
- Notificaciones push y modo PWA con sincronización offline.

## Instalación y ejecución (backend y frontend)
### Backend
1. Crear/activar el entorno (ejemplo con conda del prompt):
   ```bash
   conda activate miunac
   ```
2. Instalar dependencias desde la raíz del repo:
   ```bash
   pip install -r requirements.txt
   ```
3. Instalar librerías de sistema GIS (GDAL/GEOS/PROJ):
   - **Windows (Conda)**: `conda install -c conda-forge gdal geos proj` y verifica que las variables `GDAL_LIBRARY_PATH`, `GEOS_LIBRARY_PATH` y `PROJ_LIB` queden configuradas automáticamente en el entorno (si no, apunta manualmente a las rutas `Library/bin` del entorno).
   - **Linux (Debian/Ubuntu)**: `sudo apt-get install gdal-bin libgdal-dev libgeos-dev proj-bin` y exporta `GDAL_LIBRARY_PATH`, `GEOS_LIBRARY_PATH` y `PROJ_LIB` si no se detectan.
4. Arrancar el backend:
   ```bash
   cd miunac_backend
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```
5. Endpoints clave del MVP:
   - Salud: `GET /api/health/`
   - Lugares del campus: `GET /api/campus/places/`
   - Estados en vivo (incluye acción `nearby`): `GET /api/campus/statuses/`
   - Endpoint geoespacial de estados cercanos: `GET /api/campus/statuses/nearby/?lat=<lat>&lon=<lon>&radius=<m>`

### Base de datos con PostGIS
1. Instalar PostgreSQL y PostGIS.
2. Crear base de datos y habilitar extensión:
   ```sql
   CREATE DATABASE miunac;
   \c miunac;
   CREATE EXTENSION postgis;
   ```
3. Ajustar credenciales en la configuración de Django.

### Frontend (Vite + React)
1. Instalar dependencias de frontend (asegura que se descargue `react-router-dom` y demás librerías de `package.json`):
   ```bash
   cd miunac-frontend
   npm install
   ```
2. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Acceder a la URL que imprime Vite (por defecto `http://localhost:5173/`).

## Estructura del repositorio
- `backend/`: código de la API en Django REST Framework (endpoints, modelos, serializers).
- `frontend/`: aplicación Next.js con componentes React, TailwindCSS y Framer Motion.
- `data/`: insumos geoespaciales (capas vectoriales, shapefiles, geojson) preparados con QGIS.
- `docs/`: diagramas de arquitectura, flujos y especificaciones del MVP.
- `scripts/`: utilidades para despliegue, carga de datos y mantenimiento.

## Licencia
Este proyecto se distribuye bajo la licencia indicada en el archivo [LICENSE](LICENSE).

## Créditos / Autor
Desarrollado por la comunidad estudiantil de la Universidad Nacional del Callao para potenciar la colaboración y el sentido de pertenencia en el campus. 💡
