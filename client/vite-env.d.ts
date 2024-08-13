/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  // Add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
