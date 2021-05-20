<template>
	<div
		class="container"
	>
		<DropZone></DropZone>
		<SubtitleList></SubtitleList>
	</div>
</template>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	width: 60%;
	min-width: 20rem;
	min-height: 40%;
	border-radius: 0.6rem;
	background-color: white;
	padding: 0.8rem;
	box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.2);
	transition: height 1s ease;
}

.dropzone-container {
	flex-grow: 1;
}

.subtitles-container {
	margin-top: 0.8rem;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DropZone from './Dropzone.vue';
import SubtitleList from './SubtitleList.vue';

@Options({
	components: {
		DropZone,
		SubtitleList,
	},
})
export default class DropzoneContainer extends Vue {}
</script>
