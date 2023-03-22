import { defineStore } from 'pinia'
import axios from 'axios'

export const useDocumentStore = defineStore({
    id: 'document',
    state: () => ({
        document: {'page' : {}, 'draggables' : [], 'active_draggable' : {}},
		defaultValues: {
					'text' : {
						'type' : 'text',
						'text' : 'Text',
						'left' : '0',
						'top' : '0',
						'height' : '50',
						'width' : '400',
						'font_size' : '12',
						'font_weight' : 'normal',
						'font_color' : '#333333',
						'font_family' : 'Arial',
						'padding_top' : '0',
						'padding_right' : '0',
						'padding_bottom' : '0',
						'padding_left' : '0',
						'background_color' : '#ffffff'
					}
				}
    }),
    actions: {
        async init(templateID) {
			axios
			.get(process.env.VUE_APP_API_URL+'/api/templates/'+templateID)
			.then((response) => {
				this.document.draggables = response.data.draggables
			})
		},
		addDraggable(draggable) {
			this.document.draggables.push(this.format(draggable))
			this.activateDraggable(this.document.draggables.length - 1)
		},
		updatePageSettings(page) {
			this.document.page = page
		},
		setActiveDraggable(draggable) {
			this.document.active_draggable = this.format(draggable)
			this.default_text = this.document.active_draggable
		},
		dragDraggable(draggable) {
			this.document.active_draggable.left = draggable.left
			this.document.active_draggable.top = draggable.top
			//this.log()
		},
		resizeDraggable(draggable) {
			this.document.active_draggable.left = draggable.left
			this.document.active_draggable.top = draggable.top
			this.document.active_draggable.width = draggable.width
			this.document.active_draggable.height = draggable.height
			//this.log()
		},
		log() {
			console.log('Left: '+this.document.active_draggable.left)
			console.log('Top: '+this.document.active_draggable.top)
			console.log('Width: '+this.document.active_draggable.width)
			console.log('Height: '+this.document.active_draggable.height)
		},
		format(draggable) {
			draggable.left = parseInt(draggable.left)
			draggable.top = parseInt(draggable.top)
			draggable.height = parseInt(draggable.height)
			draggable.width = parseInt(draggable.width)
			draggable.font_size = parseInt(draggable.font_size)
			draggable.padding_top = parseInt(draggable.padding_top)
			draggable.padding_right = parseInt(draggable.padding_right)
			draggable.padding_bottom = parseInt(draggable.padding_bottom)
			draggable.padding_left = parseInt(draggable.padding_left)
			return draggable
		},
		activateDraggable(index) {
			this.document.draggables[index].active = true
		}
	},
	getters: {
		doc() {
			return this.document
		},
		draggable() {
			return this.document.active_draggable
		},
		draggables() {
			return this.document.draggables
		},
		activeDraggable() {
			return this.document.active_draggable
		},
		defaults() {
			return this.defaultValues
		},
    },
});
