# Chess Platform MVP (Desplegable)

MVP funcional para jugar ajedrez online en una sala compartida.

## ¿Qué incluye?
- Servidor Node.js + WebSocket para sincronizar una partida por sala.
- Validación de reglas con `chess.js` en backend.
- UI web simple para mover piezas y ver PGN en vivo.
- Docker Compose para levantar todo rápido.

## Despliegue local para jugar
```bash
cd chess-platform
docker compose up --build
```

Abre en tu navegador:
- `http://localhost:4000`

Para jugar entre 2 personas:
1. Ambos abren la URL.
2. Ambos ponen el mismo nombre de sala (por ejemplo `amistoso-1`).
3. Cada uno mueve piezas en su turno y se sincroniza en tiempo real.

## Notas
- Es un MVP (sin login ni matchmaking avanzado).
- Base PostgreSQL/Redis ya está levantada para futuras fases.
