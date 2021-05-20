<style lang="scss" scoped>
article {
	height: var(--item-height);
	width: 100%;
	border-radius: 6px;
	border: 1px solid #a2bbd6;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f7fafd;
	font-size: 1.3rem;
	color: #2c5c8b;
	min-width: 0;
	user-select: none;
	padding: 0.4rem;
	box-sizing: border-box;
	margin-bottom: 0.4rem;

	animation: fadeIn 0.3s ease-in 1;

	&:last-of-type {
		margin-bottom: 0;
	}

	.name {
		width: 60%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.download {
		cursor: pointer;
	}

	svg {
		font-size: 1.8rem;
		margin-right: 0.8rem;

		&[data-icon='cloud-download-alt'] {
			animation: success 0.5s linear 2;
		}

		&[data-icon='circle-notch'] {
			animation: rotate 2s linear infinite;
		}

		&[data-icon='exclamation-circle'] {
			color: #ca4353;
		}
	}
}

@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}

@keyframes success {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
		height: 0;
	}
	100% {
		opacity: 1;
		height: --item-height;
	}
}
</style>

<template>
	<section class="subtitles-container" v-if="subtitles.length">
		<article v-for="subtitle in subtitles" :key="subtitle.filename">
			<span class="name">{{ subtitle.file.name }}</span>
			<span class="icon" v-if="subtitle.status === 'PENDING'"
				><font-awesome-icon icon="circle-notch"></font-awesome-icon
			></span>
			<span
				class="icon download"
				v-if="subtitle.status === 'SUCCESS'"
				v-on:click="download(subtitle.url)"
			>
				<font-awesome-icon
					icon="cloud-download-alt"
				></font-awesome-icon>
			</span>
			<span
				class="icon"
				v-if="subtitle.status === 'FAILURE'"
				title="transformation failed"
			>
				<font-awesome-icon icon="exclamation-circle"></font-awesome-icon
			></span>
		</article>
	</section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store, { SubFile } from '../store';

@Options({
	name: 'SubtitleList',
	store,
})
export default class SubtitleList extends Vue {
	subtitles: SubFile[] = [];

	mounted () {
		(this as any).$store.subscribe(
			(_mutation: MutationRecord, state: any) => {
				console.log(state);
				this.subtitles = state.files;
				this.$forceUpdate();
			},
		);
	}

	download (url: string) {
		console.log(url);
		window.open(url, '_blank', 'noopener');
	}
}
</script>
