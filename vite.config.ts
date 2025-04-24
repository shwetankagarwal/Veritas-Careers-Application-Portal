import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/Veritas-Careers-Application-Portal",
    optimizeDeps: {
        exclude: ["lucide-react"],
    },
});
