import os

changes = {
    "016-backend-impl-seed-data": {
        "title": "Backend: Implementación de Seed Data y DB Init",
        "context": "Poblar la base de datos con datos base (roles, estados, formas de pago).",
        "tasks": ["Implementar app.db.seed.py", "Asegurar inserciones idempotentes", "Agregar ejecución en el ciclo de vida o script separado"]
    },
    "017-backend-impl-auth": {
        "title": "Backend: Implementación de Autenticación (JWT y Roles)",
        "context": "Implementar JWT, hashing bcrypt y rutas de autenticación.",
        "tasks": ["Implementar modelos (Rol, UsuarioRol, RefreshToken)", "Implementar schemas de Auth", "Implementar AuthRepository", "Implementar AuthService (login, register, refresh)", "Implementar AuthRouter"]
    },
    "018-backend-impl-usuarios": {
        "title": "Backend: Implementación de Usuarios (Perfil)",
        "context": "CRUD de usuarios y gestión del perfil del cliente.",
        "tasks": ["Implementar modelo Usuario", "Implementar schemas de Usuario", "Implementar UsuarioRepository", "Implementar UsuarioService (get_me, update_me)", "Implementar UsuarioRouter"]
    },
    "019-backend-impl-categorias": {
        "title": "Backend: Implementación de Categorías",
        "context": "CRUD jerárquico de categorías de productos.",
        "tasks": ["Implementar modelos (Categoria)", "Implementar schemas", "Implementar CategoriaRepository", "Implementar CategoriaService", "Implementar CategoriaRouter"]
    },
    "020-backend-impl-ingredientes": {
        "title": "Backend: Implementación de Ingredientes",
        "context": "CRUD de ingredientes y gestión de alérgenos.",
        "tasks": ["Implementar modelo Ingrediente", "Implementar schemas", "Implementar IngredienteRepository", "Implementar IngredienteService", "Implementar IngredienteRouter"]
    },
    "021-backend-impl-productos": {
        "title": "Backend: Implementación de Productos y Catálogo",
        "context": "Gestión del catálogo de productos y su disponibilidad.",
        "tasks": ["Implementar modelo Producto y uniones", "Implementar schemas", "Implementar ProductoRepository", "Implementar ProductoService", "Implementar ProductoRouter"]
    },
    "022-backend-impl-direcciones": {
        "title": "Backend: Implementación de Direcciones de Entrega",
        "context": "Gestión de múltiples direcciones por usuario y dirección principal.",
        "tasks": ["Implementar modelo DireccionEntrega", "Implementar schemas", "Implementar DireccionRepository", "Implementar DireccionService", "Implementar DireccionRouter"]
    },
    "023-backend-impl-pedidos": {
        "title": "Backend: Implementación de Pedidos y Máquina de Estados",
        "context": "Creación atómica de pedidos, snapshots y transiciones FSM.",
        "tasks": ["Implementar modelos (Pedido, DetallePedido, Historial)", "Implementar schemas", "Implementar PedidoRepository", "Implementar PedidoService con lógica FSM", "Implementar PedidoRouter"]
    },
    "024-backend-impl-pagos": {
        "title": "Backend: Integración con MercadoPago (Idempotency)",
        "context": "Generar preferencias de pago y recibir webhooks IPN.",
        "tasks": ["Implementar modelo Pago", "Configurar SDK de MercadoPago", "Implementar PagoService (preferencia y webhook)", "Implementar PagoRouter"]
    },
    "025-backend-impl-admin-stock": {
        "title": "Backend: Gestión de Stock y Disponibilidad",
        "context": "Endpoints administrativos para actualizar stock.",
        "tasks": ["Implementar schemas administrativos", "Implementar AdminService para actualización de stock", "Implementar AdminRouter (PATCH /stock)"]
    },
    "026-backend-impl-admin-metrics": {
        "title": "Backend: Dashboard de Métricas Administrativas",
        "context": "Consultas de análisis de ventas y actividad del negocio.",
        "tasks": ["Implementar schemas de métricas", "Implementar consultas analíticas (top productos, ventas por estado)", "Implementar router de métricas"]
    }
}

base_dir = "openspec/changes"
os.makedirs(base_dir, exist_ok=True)

for dir_name, info in changes.items():
    change_dir = os.path.join(base_dir, dir_name)
    os.makedirs(change_dir, exist_ok=True)
    
    # proposal.md
    with open(os.path.join(change_dir, "proposal.md"), "w", encoding="utf-8") as f:
        f.write(f"# Proposal: {info['title']}\n\n## Contexto\n{info['context']}\n")
        
    # design.md
    with open(os.path.join(change_dir, "design.md"), "w", encoding="utf-8") as f:
        f.write(f"# Design: {info['title']}\n\nSigue la arquitectura definida en el ERD y los placeholders actuales.\n")
        
    # tasks.md
    with open(os.path.join(change_dir, "tasks.md"), "w", encoding="utf-8") as f:
        f.write(f"# Tasks: {info['title']}\n\n")
        for t in info['tasks']:
            f.write(f"- [ ] {t}\n")
            
    # acceptance.md
    with open(os.path.join(change_dir, "acceptance.md"), "w", encoding="utf-8") as f:
        f.write(f"# Acceptance: {info['title']}\n\n- [ ] Los tests unitarios pasan.\n- [ ] Implementa correctamente el contrato establecido.\n")
        
    print(f"Generado {dir_name}")
