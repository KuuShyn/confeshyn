// uno.config.ts
import { defineConfig } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import {
	presetUno,
	presetIcons,
	presetAttributify,
	presetTypography,
	presetWebFonts,
	transformerCompileClass
} from 'unocss';

export default defineConfig({
	// ...Svelte options
	extractors: [extractorSvelte()],

	// ...UnoCSS options
	presets: [
		presetAttributify({
			strict: true
		}),
		presetUno(),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				base: 'Inter:400,500,600,700,800,900'
			}
		}),
		presetTypography(),
		presetIcons({
			extraProperties: {
				'display': 'inline-block',
				'vertical-align': 'middle'
			}
		})
	],
	transformers: [
		transformerCompileClass({
			// ...options
		})
	]

	
});
