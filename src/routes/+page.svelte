<script lang="ts">
	import * as Web3 from '@solana/web3.js';
	import type { PublicKey } from '@solana/web3.js';
	import { workSpace } from '@portal-payments/wallet-adapter-anchor';
	import { walletStore } from '@portal-payments/wallet-adapter-core';

	walletStore.subscribe(async () => {});

	let inputText: string = '';

	const send_confession = async () => {
		if ($workSpace.baseAccount) {
			$workSpace.baseAccount = Web3.Keypair.generate();

			await $workSpace.program?.methods
				.sendConfession(inputText)
				.accounts({
					confession: $workSpace.baseAccount.publicKey,
					author: $walletStore.publicKey?.toBase58(),
					systemProgram: $workSpace.systemProgram?.programId
				})
				.signers([$workSpace.baseAccount])
				.rpc();

			fetch_confessions();
			inputText = '';
		} else {
			console.log('No base account');
		}
	};

	const react = async (publicKey: PublicKey) => {
		await $workSpace.program?.methods
			.addReact()
			.accounts({
				confession: publicKey,
				author: $walletStore.publicKey?.toBase58()
			})
			.rpc();
		fetch_confessions();
	};

	let confess: any = [];
	let loading = false;
	const fetch_confessions = async () => {
		const confessions = await $workSpace.program?.account.confession.all();
		confess = confessions;
		let loading = true;
	};
	let page = 1;
	const nextPage = () => {
		page++;
	};

	const prevPage = () => {
		if (page > 1) {
			page--;
		}
	};
	const pageSize = 4;

	$: if ($walletStore.connected) {
		fetch_confessions();
	}
</script>

<div>
	<button class="text-7xl transform transition-transform hover:scale-125 hover:rotate-12">🍑</button
	>
	<h3 text-2xl pt-10>Confeshyn with ASS</h3>
	{#if !$walletStore?.connected}
		<h1 text-2xl leading-10 font-bold text-center m-0>
			Sign in with your Solana<br /> wallet to continue.
		</h1>
	{:else if $walletStore.publicKey}
		<!-- <h3>
			Confess your shyns
			Connected to {$walletStore.publicKey.toBase58()}.
		</h3> -->

		<textarea
			class="shadow appearance-none border rounded w-70 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="confession"
			rows="4"
			bind:value={inputText}
			placeholder="Confess your sins here..."
		></textarea><br />
		<button class="bg-slate-200 !hover:bg-teal-200" on:click={send_confession}>Confeshyn</button>
		<div class="flex justify-between items-center">
			<button
				on:click={prevPage}
				disabled={page === 1}
				class="i-ph:caret-left-bold bg-gray-400 !hover:bg-gray-500 text-black h-screen w-70 font-bold py-2 px-4 rounded"
			>
				
			</button>
			<div class="flex flex-col">
				{#if loading}
					<h1> LOADING....</h1>	
				{:else}
					
					{#each confess
						.sort((a, b) => b.account.timestamp.toNumber() - a.account.timestamp.toNumber())
						.slice((page - 1) * pageSize, page * pageSize) as confession (confession.publicKey)}
						<!-- <ConfessionCard {confession} /> -->
						<div p="b-5 t-5">
							<div
								class="max-w-md rounded-5 break-normal shadow-lg hover:shadow-2xl flex flex-col bg-sky-100"
							>
								<!-- <div p="x-6 y-4 b-5" opacity-78>
						<p text="sm" font="semibold">
							{confession.account.author}
						</p>
					</div> -->

								<div p="x-6 t-10 b-5">
									<div class="max-w-md rounded-4 break-normal w-95 pe-2 ps-2 flex flex-col">
										<p text="lg center" font="bold">
											{confession.account.content}
										</p>
									</div>
								</div>
								<div flex flex-row>
									<div p="x-6  e-40" opacity-78 flex>
										<p text="xs" font="semibold">
											{new Date(confession.account.timestamp.toNumber() * 1000).toLocaleDateString(
												'en-US'
											)}, {new Date(
												confession.account.timestamp.toNumber() * 1000
											).toLocaleTimeString('en-US')}
										</p>
									</div>
									<div p="x-6 " opacity-78 flex>
										<button
											class="i-ph:heart-fill !hover:bg-green-400"
											on:click={react(confession.publicKey.toBase58())}
										>
										</button>
										<p>{confession.account.reactionCount}</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<button
				on:click={nextPage}
				disabled={page * pageSize >= confess.length}
				class="i-ph:caret-right-bold bg-gray-400 !hover:bg-gray-500 h-screen w-70 text-black font-bold py-2 px-4 rounded"
			>
				
			</button>
		</div>
	{/if}
</div>
