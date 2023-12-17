import Unocss from 'unocss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
export default defineConfig({
  plugins: [Unocss(), sveltekit(), nodePolyfills()],
  optimizeDeps: {
    include: ['@project-serum/anchor', '@solana/web3.js']
  },
 
});