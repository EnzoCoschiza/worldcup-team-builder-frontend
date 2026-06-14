Quiero construir un frontend estético en un repositorio separado para consumir mi API `worldcup-team-builder-api`.

El objetivo es crear una interfaz visual para armar equipos del Mundial sobre una cancha de fútbol.

Stack requerido:

* React
* Vite
* TypeScript
* Tailwind CSS
* Sin backend propio
* Sin base de datos
* Sin autenticación
* Sin complejidad innecesaria

Nombre sugerido del proyecto:

`worldcup-team-builder-frontend`

La API backend ya existe y tiene estos endpoints:

1. `GET /health`

Respuesta:

```json
{
  "status": "ok"
}
```

2. `GET /allowed-countries`

Respuesta:

```json
{
  "allowed_countries": ["Argentina", "Brasil", "España", "Alemania"]
}
```

3. `POST /teams`

Payload:

```json
{
  "country": "Argentina",
  "players": [
    {
      "name": "Messi",
      "position": "forward"
    }
  ]
}
```

Respuesta exitosa:

```json
{
  "message": "Team created successfully",
  "country": "Argentina",
  "players_count": 1
}
```

Errores posibles:

```json
{
  "detail": "Country not allowed"
}
```

```json
{
  "detail": "A team cannot have more than 11 players"
}
```

```json
{
  "detail": "A team must have at least 1 player"
}
```

El frontend debe usar una variable de entorno:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Crear también `.env.example`.

---

## Diseño visual deseado

Quiero una app moderna, estética, con estilo deportivo/futurista.

La pantalla principal debe tener:

1. Header superior:

   * Título: `World Cup Team Builder`
   * Subtítulo: `Build and validate your starting eleven`
   * Estado de conexión con la API:

     * Verde si `/health` responde ok
     * Rojo si la API no responde

2. Selector de país:

   * Argentina
   * Brasil
   * España
   * Alemania
   * Idealmente usando banderas emoji o badges visuales
   * El país seleccionado debe influir en el estilo visual de algunos detalles, por ejemplo colores del badge o borde

3. Cancha de fútbol:

   * Una cancha verde en vista vertical o apaisada
   * Líneas de mitad de cancha, áreas, círculo central y arcos
   * Debe verse estética, no hace falta ser perfecta
   * Sobre la cancha deben aparecer 11 burbujas/círculos numerados del 1 al 11
   * Cada burbuja representa un jugador
   * Las burbujas deben estar distribuidas como una formación de fútbol, por ejemplo:

     * 1 arquero
     * 4 defensores
     * 3 mediocampistas
     * 3 delanteros
   * Si una burbuja no tiene jugador, mostrar solamente el número
   * Si una burbuja tiene jugador, mostrar:

     * número
     * nombre corto o iniciales
     * posición
   * Al hacer click en una burbuja, se debe abrir/actualizar un panel lateral para editar ese jugador

4. Panel lateral o card de edición:

   * Campo `name`
   * Campo `position`
   * Botón `Save player`
   * Botón `Clear slot`
   * Mostrar qué slot se está editando, por ejemplo: `Editing player #7`

5. Panel resumen:

   * País seleccionado
   * Cantidad de jugadores cargados, por ejemplo `7 / 11`
   * Lista de jugadores cargados
   * Botón principal: `Validate Team`
   * Botón secundario: `Reset Team`

6. Feedback visual:

   * Si el equipo es válido, mostrar un toast/card verde:
     `Team created successfully`
   * Si la API rechaza el equipo, mostrar un toast/card rojo con el detail del backend
   * Si faltan jugadores, permitir validar igual siempre que haya al menos 1 jugador, porque la regla del backend permite entre 1 y 11
   * Si no hay ningún jugador cargado, avisar desde frontend antes de enviar:
     `Add at least one player before validating`

---

## Reglas de frontend

* El frontend no debe permitir crear más de 11 slots.
* Los 11 slots ya deben estar predefinidos visualmente en la cancha.
* Un jugador se considera cargado si tiene `name` y `position`.
* Al enviar al backend, mandar solamente los jugadores cargados.
* No mandar slots vacíos.
* El país debe ser obligatorio.
* Si el backend devuelve error, mostrarlo de forma clara.

---

## UX esperada

Flujo de uso:

1. El usuario abre la app.
2. La app verifica `/health`.
3. La app carga los países desde `/allowed-countries`.
4. El usuario elige un país.
5. El usuario hace click en las burbujas de la cancha.
6. Completa nombre y posición.
7. La burbuja se actualiza visualmente.
8. Cuando quiere, toca `Validate Team`.
9. El frontend envía el equipo al backend con `POST /teams`.
10. Se muestra si el equipo fue aceptado o rechazado.

---

## Estructura esperada

Crear una estructura limpia:

```txt
src/
├── api/
│   └── client.ts
├── components/
│   ├── AppHeader.tsx
│   ├── CountrySelector.tsx
│   ├── FootballPitch.tsx
│   ├── PlayerBubble.tsx
│   ├── PlayerEditor.tsx
│   ├── TeamSummary.tsx
│   └── FeedbackMessage.tsx
├── types/
│   └── team.ts
├── utils/
│   └── formation.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Detalles de implementación

En `types/team.ts` definir tipos:

```ts
export type Player = {
  name: string;
  position: string;
};

export type PlayerSlot = {
  slotNumber: number;
  x: number;
  y: number;
  player?: Player;
};

export type TeamPayload = {
  country: string;
  players: Player[];
};
```

En `utils/formation.ts` definir los 11 slots con coordenadas porcentuales para posicionarlos sobre la cancha.

Ejemplo:

```ts
export const defaultFormation = [
  { slotNumber: 1, x: 50, y: 88 },
  { slotNumber: 2, x: 18, y: 68 },
  { slotNumber: 3, x: 38, y: 70 },
  { slotNumber: 4, x: 62, y: 70 },
  { slotNumber: 5, x: 82, y: 68 },
  { slotNumber: 6, x: 28, y: 48 },
  { slotNumber: 7, x: 50, y: 44 },
  { slotNumber: 8, x: 72, y: 48 },
  { slotNumber: 9, x: 25, y: 24 },
  { slotNumber: 10, x: 50, y: 18 },
  { slotNumber: 11, x: 75, y: 24 }
];
```

En `api/client.ts` crear funciones:

* `checkHealth()`
* `getAllowedCountries()`
* `validateTeam(payload)`

Usar `fetch`, no instalar Axios salvo que sea necesario.

---

## Estética

Usar Tailwind con:

* Fondo general oscuro
* Card principal con glassmorphism
* Cancha verde con gradientes
* Burbujas circulares con sombra
* Animación hover sobre las burbujas
* Botones modernos
* Feedback claro para success/error
* Diseño responsive

Inspiración visual:

* dashboard deportivo moderno
* fantasy football
* mundial/fútbol
* UI tipo SaaS moderna

No quiero que parezca una tabla aburrida. La cancha debe ser protagonista.

---

## Validaciones frontend

Antes de enviar:

* Si no hay país seleccionado, mostrar error.
* Si no hay jugadores cargados, mostrar error.
* Si hay algún jugador parcialmente cargado, por ejemplo tiene name pero no position, no enviarlo o pedir completarlo. Preferentemente pedir completarlo.
* El botón `Validate Team` debe mostrar loading mientras espera la respuesta.

---

## README

Crear un README con:

* Descripción del proyecto.
* Stack usado.
* Cómo instalar.
* Cómo correr localmente.
* Cómo configurar `VITE_API_BASE_URL`.
* Cómo conectar con el backend.
* Captura conceptual o descripción del flujo.
* Comandos:

```bash
npm install
npm run dev
npm run build
```

---

## Calidad

Antes de terminar:

* Verificar que `npm run build` funcione.
* Revisar que no haya errores de TypeScript.
* No dejar código muerto.
* No agregar librerías innecesarias.
* Mantener componentes chicos y entendibles.
* Usar nombres claros.

El resultado debe ser un frontend visualmente atractivo, simple de explicar y conectado a la API backend existente.
