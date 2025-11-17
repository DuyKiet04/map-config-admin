<script lang="ts">
	// PHẦN SCRIPT GIỮ NGUYÊN
	import { JSONEditor } from 'svelte-jsoneditor';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let content = {
		json: data.config
	};
	
	let jsonString = JSON.stringify(data.config, null, 2);

	function onEditorChange(newContent: any) {
		if (newContent.json) {
			jsonString = JSON.stringify(newContent.json, null, 2);
		} else if (newContent.text) {
			jsonString = newContent.text;
		}
	}
</script>

<svelte:head>
	<title>Map Config Admin</title>
</svelte:head>

<div class="page-container">
	
	<header class="page-header">
		<h1> Map Configuration Admin</h1>
	</header>

	<form method="POST" action="?/save" use:enhance class="config-form">
		
		<div class="editor-container">
			<JSONEditor
				bind:content
				mode="code"
				onChange={onEditorChange}
				mainMenuBar={true}
				statusBar={true}
			/>
		</div>

		<input type="hidden" name="config" bind:value={jsonString} />

		<div class="form-actions">
			<button type="submit" class="save-button">
				 Lưu Cấu Hình
			</button>

			{#if form}
				<p class="message" class:success={form.success} class:error={!form.success}>
					{form.message || form.error}
				</p>
			{/if}
		</div>

	</form>

</div>

<style>
	
	:global(body, html) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		background-color: #f0f2f5; 
	}

	
	.page-container {
		display: flex;
		flex-direction: column;
		height: 100vh; 
		width: 100vw;  
		overflow: hidden; 
	}

	
	.page-header {
		height: 65px; 
		background-color: #4caf50; 
		color: white;
		display: flex;
		align-items: center;
        justify-content: center;
		padding: 0 25px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		
	}
	.page-header h1 {
		font-size: 1.5rem;
	}

	
	.config-form {
		flex-grow: 1; 
		height: calc(100vh - 65px); 
		display: flex;
		flex-direction: column;
		margin: 10px 0;
		box-sizing: border-box; 
		gap: 20px; 
	}

	
	.editor-container {
		flex-grow: 1; 
		min-height: 0; 
		border-radius: 8px;
		overflow: hidden; 
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}
	
	:global(.jse-main) {
		height: 100% !important;
	}

	
	.form-actions {
		 
		display: flex;
        justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.save-button {
		padding: 12px 25px;
		font-size: 1rem;
		font-weight: 600;
		background-color: #4caf50; 
        
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	.save-button:hover {
		background-color: #388e3c; 
	}

	
	.message {
		padding: 12px 20px;
		border-radius: 6px;
		margin: 0;
		font-weight: 500;
	}
	.success {
		background-color: #e8f5e9;
		color: #0d0abaff;
	}
	.error {
		background-color: #ffebee;
		color: #c62828;
	}
</style>