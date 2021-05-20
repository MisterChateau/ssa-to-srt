<style lang="scss" scoped>
section {
	position: relative;
	box-sizing: border-box;
	max-height: 40rem;
	min-width: 20rem;
	height: 100%;
	width: 100%;
	border-radius: 6px;
	padding: 2.4rem 1.6rem;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border: 2px dashed #a2bbd6;
	text-align: center;
}

img {
	width: 8rem;
	margin-bottom: 1.6rem;
	transition: transform 0.6s ease;

	&.animate {
		transform: scale(0.8);
	}
}

.dropzone {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 6px;
	background-color: #a2bbd6;
	opacity: 0.3;
}

.desc {
	color: #2c5c8b;
	font-size: 1.3rem;
	font-weight: 600;

	&__input {
		color: #51aade;
		cursor: pointer;
	}
}

input {
	visibility: hidden;
}
</style>

<template>
	<section v-on:dragover="onDragEvent" class="dropzone-container">
		<div
			class="dropzone"
			v-if="dragover"
			v-on:dragleave="onDragEvent"
			v-on:dragEnter="OnDragEvent"
			v-on:dragover="onDragEvent"
			v-on:drop="onDrop"
		></div>
		<img src="../assets/document.svg" :class="dragover ? 'animate' : ''" />
		<span class="desc"
			>Drop your ass/ssa file here, or
			<span @click="triggerInput()" class="desc__input"
				>browse</span
			></span
		>
		<input
			type="file"
			@change="upload($event.target.files)"
			ref="input"
			accept=".ass,.ssa"
		/>
	</section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '../store';

@Options({
	name: 'DropZone',
})
export default class DropZone extends Vue {
	dragover = false;
	setDragover (dragged: boolean) {
		console.log(dragged);
		this.dragover = dragged;
	}

	onDragEvent (event: Event & { target: HTMLElement }) {
		event.preventDefault();
		console.log(event);

		if (
			(event.type === 'dragover' &&
				event.target.nodeName === 'section') ||
			(event.type === 'dragleave' && event.target.nodeName === 'section')
		) {
			return;
		}

		this.setDragover(
			event.type === 'dragenter' || event.type === 'dragover',
		);
	}

	onDrop (event: Event & { dataTransfer: { files: FileList } }) {
		event.preventDefault();
		console.log(event);
		this.setDragover(false);
		this.upload(event.dataTransfer.files);
	}

	upload (files: FileList) {
		const file = files[0];
		store.dispatch('upload', file);
	}

	$refs!: {
		input: HTMLInputElement;
	};

	triggerInput () {
		this.$refs.input.click();
	}
}
</script>
