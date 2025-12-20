# Blueprint del Proyecto: Recetas Comunitarias

Este documento sirve como la hoja de ruta y la fuente de verdad para el desarrollo de la aplicación de recetas. Define la visión, las características implementadas y el plan de desarrollo futuro.

---

## 📜 Visión General

Crear una plataforma de recetas moderna, intuitiva y comunitaria donde los usuarios puedan descubrir, compartir y comentar sus platos favoritos. La experiencia de usuario debe ser fluida, atractiva y segura, fomentando un entorno colaborativo y creativo.

---

## ✅ Características Implementadas

A fecha de hoy, la aplicación cuenta con las siguientes funcionalidades básicas, todas conectadas a un backend de Supabase:

- **Navegación de Recetas:**
  - Página principal que muestra una selección de recetas.
  - Página de categorías para explorar recetas por tipo (pastas, postres, etc.).
  - Página de detalle de receta individual.
- **Base de Datos:**
  - Creación de la tabla `recipes` para almacenar toda la información de las recetas.
  - Creación de la tabla `comments` para los comentarios.
- **Autenticación y Comentarios:**
  - Sistema de registro e inicio de sesión de usuarios con Supabase Auth.
  - Sección de comentarios en cada receta que permite a los usuarios autenticados publicar sus opiniones.

---

## 🗺️ Hoja de Ruta de Desarrollo

Esta hoja de ruta está basada en la visión del usuario, ordenada por prioridad para asegurar la construcción de una aplicación robusta y de alta calidad.

### 🧱 NIVEL 1 · FUNDAMENTOS SÓLIDOS (Prioridad Inmediata)

-   [ ] **1. Persistencia de Sesión:**
    -   [ ] Mantener la sesión del usuario al recargar la página.
    -   [ ] Manejar el logout de forma global en toda la aplicación.
    -   [ ] Redirecciones inteligentes (tras login, volver a la página anterior).
-   [ ] **2. Estados de Carga y Errores:**
    -   [ ] Implementar componentes de carga (skeletons/spinners) en vistas de datos.
    -   [ ] Mostrar mensajes de error claros y amigables para el usuario.
-   [ ] **3. Validaciones (Frontend y Backend):**
    -   [ ] Validar formato de email.
    -   [ ] Impedir envío de comentarios vacíos o excesivamente largos.
    -   [ ] Deshabilitar botones de envío tras el primer clic para evitar duplicados.

### ✨ NIVEL 2 · EXPERIENCIA DE USUARIO

-   [ ] **4. Perfil de Usuario:**
    -   [ ] Página de perfil con nombre, avatar y fecha de registro.
    -   [ ] Funcionalidad para editar el perfil.
-   [ ] **5. Sistema de Permisos:**
    -   [ ] Permitir que un usuario solo pueda borrar/editar sus propios comentarios.
-   [ ] **6. Feedback Visual Inmediato (UI Optimista):**
    -   [ ] Añadir/eliminar comentarios de la UI al instante, sin esperar la recarga.

### 🔐 NIVEL 3 · SEGURIDAD

-   [ ] **7. Row Level Security (RLS) en Supabase:**
    -   [ ] Activar RLS en todas las tablas sensibles.
    -   [ ] Definir políticas para que los usuarios solo puedan modificar sus propios datos.
-   [ ] **8. Rate Limiting Básico:**
    -   [ ] Investigar e implementar límites para evitar spam y ataques de fuerza bruta.

### 🚀 NIVEL 4 · FUNCIONALIDADES "ENGANCHE"

-   [ ] **9. Likes / Reacciones:** en recetas y/o comentarios.
-   [ ] **10. Búsqueda:** por nombre, categoría o ingredientes.
-   [ ] **11. Favoritos:** permitir a los usuarios guardar sus recetas preferidas.

### 🧪 NIVEL 5 · CALIDAD

-   [ ] **12. Logs y Manejo de Errores:** centralizar la captura de errores.
-   [ ] **13. Accesibilidad (A11Y):** asegurar navegación por teclado y contrastes adecuados.
-   [ ] **14. SEO Básico:** títulos y metadescripciones dinámicas.

---

## 🎯 Tarea Actual: Implementar Persistencia de Sesión

**Objetivo:** Solucionar el problema de que la sesión del usuario no persiste al recargar la página.

**Plan:**

1.  **Centralizar el estado de la sesión:** Modificar el componente `Header.tsx` para que se encargue de gestionar el estado de autenticación del usuario.
2.  **Usar `onAuthStateChange`:** Implementar un listener de Supabase que se active al cargar la página y cada vez que el estado de autenticación cambie (login/logout).
3.  **Renderizado Condicional:** Actualizar el Header para que muestre el nombre del usuario y un botón de "Logout" si la sesión está activa, o los botones de "Login/Register" si no lo está.
4.  **Implementar Logout:** Asegurarse de que el botón de "Logout" llame a la función `supabase.auth.signOut()`.
