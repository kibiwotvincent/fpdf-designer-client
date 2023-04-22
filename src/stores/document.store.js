import { defineStore } from 'pinia'
import createHttp from '@/axios.js'

export const useDocumentStore = defineStore({
    id: 'document',
    state: () => ({
        document: {'name': 'doc1', 'page' : {}, 'fonts' : [], 'draggables' : [], 'active_draggable' : {}},
		defaultValues: {
					'text' : {
						'type' : 'text',
						'text' : 'Text',
						'left' : '0',
						'top' : '0',
						'height' : '50',
						'width' : '400',
						'text_align' : 'left',
						'font_size' : '12',
						'font_weight' : 'normal',
						'font_color' : '#000000',
						'font_style' : 'normal',
						'font_family' : 'Arial',
						'background' : 'none',
						'background_color' : '#ffffff',
						'border_left' : 'none',
						'border_top' : 'none',
						'border_right' : 'none',
						'border_bottom' : 'none',
						'border_color' : '#000000',
						'border_weight' : '1',
					}
		}
    }),
    actions: {
        async init(source, id) {
			this.reset()
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/'+source+'/'+id)
			.then((response) => {
				this.document.draggables = response.data.draggables
			})
		},
		async setFonts() {
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/fonts')
			.then((response) => {
				this.document.fonts = response.data
			})
		},
		async save() {
			this.cleanDraggables()
			const http = createHttp()
			http.post(process.env.VUE_APP_API_URL+'/api/documents/save', {'document' : this.document})
			.then((response) => {
				console.log(response)
			})
		},
		async update(id) {
			this.cleanDraggables()
			const http = createHttp()
			http.post(process.env.VUE_APP_API_URL+'/api/documents/update', {'id': id, 'document' : this.document})
			.then((response) => {
				console.log(response)
			})
		},
		reset() {
			this.document.page = {}
			this.document.draggables = []
			this.document.active_draggable = {}
		},
		addDraggable(draggable) {
			this.document.draggables.push(this.format(draggable))
			this.activateDraggable(this.document.draggables.length - 1)
		},
		updatePageSettings(page) {
			this.document.page = page
		},
		setActiveDraggable(draggable, index) {
			this.document.active_draggable = this.format(draggable)
			this.document.active_draggable.index = index
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
			return draggable
		},
		activateDraggable(index) {
			this.document.draggables[index].active = true
		},
		deleteDraggable(index) {
			this.document.draggables.splice(index, 1)
		},
		updateDraggable(index, item, itemValue) {
			this.document.draggables[index][item] = itemValue
		},
		cleanDraggables() {
			for(let i = 0; i < this.document.draggables.length; i++) {
				//set active to false
				if(typeof this.document.draggables[i]['active'] != 'undefined') {
					this.document.draggables[i]['active'] = false
				}
				/*
				//insert borders
				let borders = ['left','top','right','bottom']
				for(let j = 0; j < borders.length; j++) {
					if(typeof this.document.draggables[i]['border_'+borders[j]] == 'undefined') {
						this.document.draggables[i]['border_'+borders[j]] = 'none'
					}
				}
				//populate font color
				if(typeof this.document.draggables[i]['font_color'] == 'undefined') {
					this.document.draggables[i]['font_color'] = '#000000'
				}
				//populate border color
				if(typeof this.document.draggables[i]['border_color'] == 'undefined') {
					this.document.draggables[i]['border_color'] = '#000000'
				}
				//populate background
				if(typeof this.document.draggables[i]['background'] == 'undefined') {
					this.document.draggables[i]['background'] = 'none'
				}
				//populate background color
				if(typeof this.document.draggables[i]['background_color'] == 'undefined') {
					this.document.draggables[i]['background_color'] = '#000000'
				}
				*/
			}
		},
	},
	getters: {
		doc() {
			return this.document
		},
		draggables() {
			return this.document.draggables
		},
		fonts() {
			return this.document.fonts
		},
		activeDraggable() {
			return this.document.active_draggable
		},
		defaults() {
			return this.defaultValues
		},
    }
});
