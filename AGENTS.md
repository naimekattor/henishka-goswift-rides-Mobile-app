# Expo and NativeWind Guidelines

Always read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## NativeWind v4 Configuration & Styling
- **CSS Import:** Import standard CSS via `import "../global.css";` or `import "@/global.css";` in root layout entry files (e.g., [src/app/_layout.tsx](file:///c:/Users/native/Desktop/projects/haniska/src/app/_layout.tsx)).
- **Tailwind Config:** The [tailwind.config.js](file:///c:/Users/native/Desktop/projects/haniska/tailwind.config.js) must always scan target files under the `./src` directory: `content: ["./src/**/*.{js,jsx,ts,tsx}"]`.
- **Metro Config:** The [metro.config.js](file:///c:/Users/native/Desktop/projects/haniska/metro.config.js) is configured using `withNativeWind(config, { input: './src/global.css' })`.
- **Babel Config:** Preset configuration in [babel.config.js](file:///c:/Users/native/Desktop/projects/haniska/babel.config.js) uses `["babel-preset-expo", { jsxImportSource: "nativewind" }]` and `"nativewind/babel"`.
- **TypeScript Type Safety:** Ensure type definitions are referenced via [nativewind-env.d.ts](file:///c:/Users/native/Desktop/projects/haniska/nativewind-env.d.ts) using `/// <reference types="nativewind/types" />`.

## App Architecture: Multi-Role Flow
- **Roles & Flows:** The app handles **7 distinct roles** with **7 separate user flows** (one for each role), sharing a **common onboarding flow**.
- **Authentication & Onboarding Flow:** 
  - **Shared Screens:** Login, Forgot Password, and OTP Verification are shared and common across all users.
  - **Bifurcated Signup:** The Signup process may differ per role, requiring role-specific forms or multi-step flows.
- **Routing Structure:** Use Expo Router groups under `src/app/` to organize and isolate the flows cleanly:
  - `(onboarding)` - Shared onboarding flow (containing common login, forgot password, and OTP, plus role-based signup flows)
  - `(role1)`, `(role2)`, ..., `(role7)` - Individual isolated flows for each role
- **Component Reusability:**
  - Maximize component reuse. Extract custom components to `src/components/` if they are shared across flows or reused in 2 or more files.
  - Break down UI files to prevent single files from becoming too long (aim for modularity, clean separation of concerns).
- **Expo Packages:**
  - Use native/recommended Expo SDK packages rather than external custom libraries:
    - **Date Inputs:** `@expo/ui` or `@react-native-community/datetimepicker`
    - **File Inputs:** `expo-document-picker`
    - **Image Inputs:** `expo-image-picker`
    - **Storage:** `expo-secure-store`
    - **Icons:** `@expo/vector-icons` and `expo-symbols`
- **Keyboard Handling for Input Screens:**
  - Wrapping: All screens with text fields or inputs must wrap key elements in a `KeyboardAvoidingView` configured with `behavior={Platform.OS === "ios" ? "padding" : "padding"}` at the outermost layout level (wrapping the `SafeAreaView`).
  - Scrolling: Nested inputs should reside inside a `ScrollView` with `contentContainerStyle={{ flexGrow: 1 }}` and an inner `View` wrapping the content to permit clean scrolling when the keyboard becomes active.
