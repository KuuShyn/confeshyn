<script lang="ts">
	// ..Svelte
	import { onMount } from 'svelte';
	import Header from '../lib/component/Header.svelte';
	import Footer from '../lib/component/Footer.svelte';
	// ..Unocss
	import 'virtual:uno.css';

	// ..Solana
	import { clusterApiUrl, Connection } from '@solana/web3.js';
	import { WalletProvider, ConnectionProvider } from '@portal-payments/wallet-adapter-ui';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
	import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';

	import idl from '../lib/idl/mmcm_confession.json';
	import { AnchorConnectionProvider } from '@portal-payments/wallet-adapter-anchor';

	const localStorageKey = 'walletAdapter';

	const network = clusterApiUrl('devnet'); // localhost or mainnet
	
	
	
	let wallets: (PhantomWalletAdapter | SolflareWalletAdapter)[];

	let isLoaded = false;
	onMount(async () => {
		const walletsMap = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
		wallets = walletsMap;
		isLoaded = true;
	});


	
</script>

{#if isLoaded}
	<WalletProvider {localStorageKey} {wallets} autoConnect />

	<ConnectionProvider {network} />
	<AnchorConnectionProvider {network} {idl} />


	<Header />
	<main pt-32 gap-8 items-start max-w-300 w-full>
		<slot />
		
	</main>
	<Footer />
{:else}
	<p>Loading.....</p>
{/if}

<style>
	/* Padding goes inside boxes */
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	/* Use grid by default */
	:global(div, footer, header, main, nav, title, section) {
		display: grid;
		place-items: center;
	}

	/* Sensible links */
	:global(a, a:visited, a:hover, a:active) {
		text-decoration: none;
		color: var(--black);
	}

	:global(body) {
		min-height: 100dvh;
		display: grid;
		grid-auto-flow: row;
		justify-items: center;
		padding: 0;
		margin: 0;
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		background: linear-gradient(135deg, #edfff8, #e9fffe);
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;
	}
</style>
