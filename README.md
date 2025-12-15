# NodeJS-TP-Final
Projecto final del curso / Construcción de una API Rest

Flujo de la Aplicación:

index.js → Rutas → Middlewares → Controladores → Modelos → Firestore
       ↓
  Vistas HTML


Endpoints Relacionados (de los routers):

Productos:
GET /productos → Todos los productos (público)

GET /productos/:id → Por ID (público)

GET /productos/nombre/:nombre → Por nombre (público)

GET /productos/categoria → Filtro por categoría (query params)

GET /productos/stock → Solo con stock (privado)

POST /productos → Crear (privado)

DELETE /productos/:id → Eliminar (admin)

PUT /productos/stock/:id → Actualizar stock (privado)

PUT /productos/precio/:id → Actualizar precio (privado)

Operadores:
GET /operadores → Todos (público)

GET /operadores/:id → Por ID (público)

GET /operadores/email/:email → Por email (público)

POST /operadores → Crear (privado)

POST /operadores/email/:email → Actualizar por email (privado)

POST /operadores/:id → Actualizar por ID (privado)

DELETE /operadores/email/:email → Eliminar por email (admin)

DELETE /operadores/:id → Eliminar por ID (admin)

PATCH /operadores/reset/:id → Resetear intentos (admin)

Autenticación:
POST /login → Iniciar sesión (público)


Diccionario de Datos - Sistema de Gestión

Colección: Productos
Campo	Tipo	Descripción	Restricciones	Ejemplo
idproducto	number	Identificador único del producto	Requerido, único	9
nombre	string	Nombre del producto	Requerido, máximo 255 chars	"Micrófono Omnidireccional JBL Bluetooth"
categorias	array[string]	Categorías del producto	Array de strings	["Tecnología", "Audio", "Accesorios"]
precio	number	Precio en centavos/moneda base	Requerido, entero positivo	123400 (≡ $1234.00)
stock	number	Cantidad disponible	Entero no negativo	23
operadoralta	number	ID del operador que creó el registro	Referencia a Operadores	1
operadormodificacion	number	ID del último operador que modificó	Referencia a Operadores	0 (¿sistema?)
fechaalta	timestamp	Fecha de creación del registro	Automático	8 dic 2025 21:18:30 UTC-3
fechamodificacion	timestamp	Fecha última modificación	Actualizado automáticamente	10 dic 2025 16:19:01 UTC-3

Colección: Operadores
Campo	Tipo	Descripción	Restricciones	Ejemplo
idoperador	number	Identificador único del operador	Requerido, único	1
nombre	string	Nombre del operador	Requerido, máximo 100 chars	"Admin"
email	string	Correo electrónico	Requerido, único, formato email	"papapitufo@gmail.com"
password	string	Hash de contraseña (SHA-256)	Requerido, 64 chars hex	"e18d20c33fc1860873b0ab34a1915f13..."
tipooperador	number	Nivel de permisos	0-2 (1: admin, 2: básico)	1
intentos	number	Intentos fallidos de login	Entero no negativo, reseteable	0
fechaultimologin	timestamp	Último acceso exitoso	Opcional	1 dic 2025 19:06:29 UTC-3


Relaciones y Reglas de Negocio

Códigos de Operador:
0: Sistema/automático (para operadormodificacion)

1: Administrador (como en el ejemplo)

2+: Otros niveles (operadores normales, etc.)

Formato de Precio:
Almacenado en centavos/unidades mínimas

123400 → $123,400.00 (moneda base es pesos)

Categorías:
Almacenado como string JSON que representa array

En FireStore: "["Tecnología", "Audio", "Accesorios"]"

Parsear con JSON.parse() al leer

Seguridad:
Passwords hasheadas con SHA-256 (64 caracteres hex)

Campo intentos para control de bloqueos por intentos fallidos

Endpoint específico para reset de intentos (PATCH /operadores/reset/:id)

TP2/
├── .env
├── .env-example
├── .gitignore
├── Ejercicio - Clase 15 - Node .JS.pdf
├── index.js
├── NodeJS dependencias.txt
├── package-lock.json
├── package.json
├── README.md
├── start.bat
├── vercel.json
├── src/
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── servicios/           # (carpeta vacía en el listado)
│   ├── vistas/
│   │   ├── ayuda.html
│   │   ├── help.html
│   │   └── css/
│   │       └── estilos.css
│   ├── controladores/
│   │   ├── AuthControlers.js
│   │   ├── OperadoresControlador.js
│   │   └── ProductosControlador.js
│   ├── modelos/
│   │   ├── firebase.js
│   │   ├── Operadores.js
│   │   ├── Productos.js
│   │   └── Productos.json
│   └── rutas/
│       ├── authRouter.js
│       ├── OperadoresRouter.js
│       └── ProductosRouter.js
└── utiles/
    └── token_generator.js


Explicación de Directorios:
📁 src/controladores/
Contienen la lógica de negocio para cada endpoint

AuthControlers.js: Autenticación y login

OperadoresControlador.js: CRUD de operadores

ProductosControlador.js: CRUD de productos

📁 src/modelos/
Conexión a base de datos y definición de esquemas

firebase.js: Configuración de Firestore

Operadores.js/Productos.js: Interacción con colecciones

📁 src/rutas/
Define las rutas HTTP y asigna controladores

authRouter.js: Rutas de autenticación

OperadoresRouter.js: Rutas de operadores

ProductosRouter.js: Rutas de productos

📁 src/middlewares/
Interceptores de peticiones HTTP

auth.middleware.js: Verificación de tokens JWT

📁 utiles/
Funciones auxiliares reutilizables

token_generator.js: Creación/validación de tokens

Notas de Estructura:
Separación clara de responsabilidades (MVC-like)

Configuración centralizada en archivos raíz

Frontend básico en /src/vistas/ para documentación/ayuda

Variables sensibles aisladas en .env

Despliegue configurado para Vercel