#  Mini Store - Saphirus

Proyecto **Mini Store** desarrollado en **React + Vite**, con un carrito de compras dinámico y descuentos progresivos.  
Permite explorar productos, ver categorías, agregar al carrito y enviar el pedido directamente por **WhatsApp**.



##  Características principales
-  **Diseño responsive** (mobile, tablet y desktop).  
-  **Carrito de compras** con descuentos por cantidad.  
-  **Barra de progreso (ProgressStepper)** que muestra beneficios desbloqueados.  
-  **Sidebar del carrito** desplegable y accesible en todas las pantallas.  
-  Productos **Saphirus** organizados por categorías.  
-  Envío directo del pedido vía **WhatsApp**.  
-  Persistencia con **LocalStorage** (el carrito se guarda aunque cierres la página).  

---

##  Tecnologías utilizadas
- [React]
- [Vite] 
- [JavaScript (ES6+)]
- [CSS3]



##  Estructura del proyecto

mini-store/
├── public/ # Imágenes y recursos estáticos
├── src/
│ ├── components/ # Componentes reutilizables (Cart, Gallery, Sidebar, etc.)
│ ├── data/ # Datos de productos
│ ├── utils/ # Funciones de descuentos, helpers
│ ├── App.jsx # Componente raíz
│ ├── main.jsx # Punto de entrada
│ └── index.css # Estilos globales
├── package.json
├── vite.config.js
└── README.md