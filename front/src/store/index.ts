import axios from 'axios';

import { createStore } from 'vuex';
import { env } from '../env';

export type SubFile = {
	file?: File;
	url?: string;
	status: 'PENDING' | 'SUCCESS' | 'FAILURE';
};

const store = createStore({
	state: {
		files: [] as SubFile[],
	},
	mutations: {
		uploadSuccess (state, subFile: SubFile) {
			console.log(state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]));
			state.files = state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]);
		},
		uploadFailure (state, subFile: SubFile) {
			console.log(state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]));
			state.files = state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]);
		},
		uploadPending (state, subFile: SubFile) {
			console.log(state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]));
			state.files = state.files.filter((sb) => sb.file !== subFile.file).concat([subFile]);
		},
	},
	actions: {
		upload (store, file: File) {
			store.commit('uploadPending', {
				file,
				status: 'PENDING',
			});

			const form = new FormData();
			form.append('file', file);

			return axios
				.post(env.BASE_URL, form, {
					headers: { 'Content-type': 'multipart/form-data' },
				})
				.then(({ data }) =>
					store.commit('uploadSuccess', {
						file,
						url: data.Location,
						status: 'SUCCESS',
					} as SubFile),
				)
				.catch(() => {
					store.commit('uploadSuccess', {
						file,
						status: 'FAILURE',
					} as SubFile);
				});
		},
	},
	getters: {
		files (state) {
			console.log('hello', state)
			return state.files;
		},
	},
	modules: {},
});

export default store;
