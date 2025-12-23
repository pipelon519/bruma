# Blueprint del Proyecto: Recetas Comunitarias

Este documento sirve como la hoja de ruta y la fuente de verdad para el desarrollo de la aplicación de recetas. Define la visión, las características implementadas y el plan de desarrollo futuro.

---

## 📜 Visión General

Crear una plataforma de recetas moderna, intuitiva y comunitaria donde los usuarios puedan descubrir, compartir y comentar sus platos favoritos. La experiencia de usuario debe ser fluida, atractiva y segura, fomentando un entorno colaborativo y creativo.

---

## ✅ Características Implementadas

A fecha de hoy, la aplicación cuenta con las siguientes funcionalidades, todas conectadas a un backend de Supabase:

- **Autenticación Completa:** Sistema de registro, inicio de sesión y persistencia de sesión.
- **Gestión de Recetas:** Los usuarios pueden crear, ver y explorar recetas.
- **Búsqueda Avanzada:** Funcionalidad para buscar recetas por nombre, categoría o ingredientes.
- **Favoritos:** Los usuarios pueden guardar y ver sus recetas preferidas.
- **Comentarios:** Sección de comentarios interactiva en cada receta.
- **Página Principal Dinámica:** El contenido de la página de inicio se adapta si el usuario ha iniciado sesión.
- **Navegación por Categorías:** Una sección visual para explorar recetas por categorías principales.

---

## 🗺️ Hoja de Ruta de Desarrollo

Esta hoja de ruta está basada en la visión del usuario, ordenada por prioridad.

### ✨ NIVEL 1 · FUNCIONALIDADES SOCIALES

- [🚧] **1. Likes / Reacciones:** en recetas y/o comentarios. *(En progreso)*
- [ ] **2. Perfil de Usuario:** Página de perfil con nombre, avatar, y las recetas que ha creado/le han gustado.
- [ ] **3. Sistema de Permisos:** Permitir que un usuario solo pueda borrar/editar sus propios comentarios o recetas.

### 🧪 NIVEL 2 · CALIDAD Y ROBUSTEZ

- [ ] **4. Estados de Carga y Errores:** Implementar componentes de carga (skeletons/spinners) y mostrar mensajes de error amigables.
- [ ] **5. Validaciones (Frontend y Backend):** Impedir envío de datos vacíos o incorrectos.
- [ ] **6. Logs y Manejo de Errores:** Centralizar la captura de errores para facilitar la depuración.

### 🔐 NIVEL 3 · SEGURIDAD Y OPTIMIZACIÓN

- [ ] **7. Row Level Security (RLS) en Supabase:** Definir políticas para que los usuarios solo puedan modificar sus propios datos.
- [ ] **8. Accesibilidad (A11Y):** Asegurar navegación por teclado y contrastes adecuados.
- [ ] **9. SEO Básico:** Títulos y metadescripciones dinámicas para mejorar el posicionamiento en buscadores.

---

## 🎯 Tarea Actual: Implementar "Likes" en Recetas

**Objetivo:** Implementar un sistema que permita a los usuarios dar 'Me gusta' a las recetas, proporcionando feedback social y ayudando a destacar el contenido más popular.

**Plan:**

1.  **Crear Tabla `recipe_likes`:** Añadir una nueva tabla en la base de datos para registrar los likes, con columnas para `recipe_id` y `user_id`.
2.  **Crear Componente `LikeButton`:** Desarrollar un componente de React que muestre el contador de likes y permita al usuario dar/quitar su like.
3.  **Integrar Botón:** Añadir el `LikeButton` a las tarjetas de recetas y a la página de detalle de la receta.
4.  **Actualizar Blueprint:** Mantener este documento al día con el progreso de la tarea.
