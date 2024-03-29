import { defineStore } from 'pinia'

export const useDocumentModalStore = defineStore({
    id: 'documentModal',
    state: () => ({
        modal: {
					'show' : false,
					'name' : '', 
                    'static' : false,
				},
    }),
    actions: {
		show(modalName, isStatic=true) {
            this.modal.name = modalName
			this.modal.show = true
            this.modal.static = isStatic
		},
        close() {
			this.modal.show = false
		},
        isStatic() {
            this.modal.static = true
        },
        cancel() {
            this.modal.static = false
            this.modal.show = false
        }
	},
	getters: {
		open() {
			return this.modal.show
		},
        name() {
			return this.modal.name
		},
        static() {
			return this.modal.static
		},
    }
});
