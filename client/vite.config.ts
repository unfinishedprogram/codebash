/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins:[solidPlugin()],
    
    test: {
        environment: 'jsdom',
        globals: true,
        transformMode: {
            web: [/\.[jt]sx?$/],
        },
        setupFiles: './setupVitest.ts',
        deps: {
            inline: [/solid-js/],
        },
        // Just for stability, can remove to improve test speed
        threads: false,
        isolate: false,
    },

    build: {
        target: 'esnext',
    },

    resolve: {
        conditions: ['development', 'browser'],
    },
})