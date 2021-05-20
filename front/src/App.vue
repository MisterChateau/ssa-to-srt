<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #e9f3fe;
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
}

body {
	margin: 0;
	height: 100vh;
	width: 100vw;
	background-color: #e9f3fe;
}

:root {
	font-size: 13px;
	--item-height: 4rem;
}
</style>

<template>
	<dropzoneContainer></dropzoneContainer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DropzoneContainer from './components/DropzoneContainer.vue';

@Options({
	components: {
		DropzoneContainer,
	},
})
export default class App extends Vue {
	mounted () {
		const el = document.querySelector('#app') as Node;
		el.addEventListener('drop', (e: Event) => e.preventDefault());
		el.addEventListener('dragover', (e: Event) => e.preventDefault());
	}
}
</script>
