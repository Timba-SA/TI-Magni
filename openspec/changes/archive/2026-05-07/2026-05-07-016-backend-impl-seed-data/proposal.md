# Proposal: Backend - Implementación de Seed Data y DB Init

## Contexto y Objetivo
El sistema necesita datos iniciales inmutables y de configuración para funcionar. Sin estos datos, el backend no puede iniciar flujos críticos (como el login de administrador, asignación de roles o la creación de un pedido con estados iniciales).

El objetivo es crear un script de seed robusto e **idempotente** que pueble la base de datos con los catálogos base requeridos por la especificación: Roles, Estados de Pedido, Formas de Pago, y el Usuario Administrador inicial.

## Requisitos de Negocio
- **Roles:** Deben existir `ADMIN`, `STOCK`, `PEDIDOS`, `CLIENT`.
- **EstadoPedido:** Deben existir `PENDIENTE`, `CONFIRMADO`, `EN_PREP`, `EN_CAMINO`, `ENTREGADO` (terminal), `CANCELADO` (terminal).
- **FormaPago:** `MERCADOPAGO`, `EFECTIVO`, `TRANSFERENCIA` (todas habilitadas por defecto).
- **Admin Root:** Usuario `admin@foodstore.com` con rol `ADMIN` y clave inicial segura (`Admin1234!`).
