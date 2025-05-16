# Interactive Eye Tracking Components

A collection of React components for password inputs and interactive eye icons with mouse tracking capabilities.

---

## Components

### PasswordInput Component

The PasswordInput component extends the standard input element with an interactive eye toggle. This allows users to show or hide their password, and the eye icon can follow the mouse cursor for a more engaging and interactive experience.

**Props:**

| Prop           | Type      | Description                                   |
| -------------- | --------- | --------------------------------------------- |
| eyeFollowMouse | boolean   | Enable mouse tracking for the eye icon        |
| followDelay    | number    | Delay in ms before eye starts following mouse |
| slowMovement   | boolean   | Enable smooth movement animation              |
| movementSpeed  | number    | Speed of eye movement (1-20)                  |
| eyeSize        | number    | Size of the eye icon in pixels                |

---

### EyeMovementIcon Component

The EyeMovementIcon component is a standalone eye icon that can toggle between open and closed states. It also supports mouse tracking and customizable animation settings.

**Props:**

| Prop           | Type      | Description                                   |
| -------------- | --------- | --------------------------------------------- |
| showEye        | boolean   | Toggle between open and closed eye states     |
| eyeFollowMouse | boolean   | Enable mouse tracking for the eye             |
| followDelay    | number    | Delay in ms before eye starts following mouse |
| slowMovement   | boolean   | Enable smooth movement animation              |
| movementSpeed  | number    | Speed of eye movement (1-20)                  |
| size           | number    | Size of the eye icon in pixels                |

