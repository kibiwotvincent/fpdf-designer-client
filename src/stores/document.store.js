import { defineStore } from 'pinia'
import createHttp from '@/axios.js'

export const useDocumentStore = defineStore({
    id: 'document',
    state: () => ({
        document: {
					'name' : 'document_name',
					'draggables' : [], 
					'active_draggable' : {},
					'page_settings' : {},
				},
		setup: {
				'fonts' : [],
				'page_sizes' : [],
				'page_margins' : [],
				},
		loaded: {
				'document' : false,
				'template' : false,
				'page_settings' : false,
		},
		defaultValues: {
					'page' : {
						'size' : 'A4',
						'orientation' : 'P',
						'width' : '210',
						'height' : '297',
						'workspace_width' : '190',
						'workspace_height' : '277',
						'font_size' : '11',
						'font_color' : '#000000',
						'font_family' : 'Arial',
						'margins' : 'medium',
						'top_margin' : '10',
						'right_margin' : '10',
						'bottom_margin' : '10',
						'left_margin' : '10',
						'scale_factor' : 3.7795 /*eqivalent of 1mm in pixels at 96PPI*/
					},
					'text' : {
						'type' : 'text',
						'text' : 'Text',
						'left' : '0',
						'top' : '0',
						'height' : '50',
						'width' : '400',
						'text_align' : 'left',
						'font_size' : '11',
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
		async setPage() {
			if(sessionStorage.getItem('page_setup_data') == null) {
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/page/setup')
				.then((response) => {
					this.setup = response.data
					sessionStorage.setItem('page_setup_data', JSON.stringify(response.data))
				})
			}
			else {
				this.setup = JSON.parse(sessionStorage.getItem('page_setup_data'))
			}
			
			if(sessionStorage.getItem('page_settings') == null) {
				//set page with default values
				this.document.page_settings = this.defaultValues.page
			}
			else {
				//set page with values from session
				this.document.page_settings = JSON.parse(sessionStorage.getItem('page_settings'))
			}
			//update default font size, color and family for new text draggables
			this.updatePageFonts()
		},
		async fetchPageSettings(source, id) {
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/'+source+'/'+id)
			.then((response) => {
				//save document ID in session; fresh page settings will be fetched if document ID changes
				sessionStorage.setItem('document_id', response.data.id)
				this.loaded.page_settings = true
				this.updatePageSettings(JSON.parse(response.data.page_settings))
			})
		},
        async initDocument(source, id) {
			this.reset()
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/'+source+'/'+id)
			.then((response) => {
				if(source == 'documents') {
					this.loaded.document = true;
				}
				else if(source == 'templates') {
					this.loaded.template = true;
				}
				this.document.draggables = response.data.draggables
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
			}
		},
		updatePageSettings(pageSettings) {
			this.document.page_settings = pageSettings
			
			this.updatePageMargins()
			this.updatePageOrientation()
			this.updatePageFonts()
			sessionStorage.setItem('page_settings', JSON.stringify(this.document.page_settings))
			//refresh page
			//location = window.reload
		},
		updatePageMargins() {
			const marginsCode = this.document.page_settings.margins
			if(this.document.page_settings.margins != 'custom') {
				for(let margin in this.setup.page_margins[marginsCode]) {
					this.document.page_settings[margin] = this.setup.page_margins[marginsCode][margin]
				}
			}
		},
		updatePageOrientation() {
			const pageSize = this.setup.page_sizes[this.document.page_settings.size]
			
			if(this.document.page_settings.orientation == 'L') {
				this.document.page_settings.width = pageSize.height
				this.document.page_settings.height = pageSize.width
			}
			else {
				this.document.page_settings.width = pageSize.width
				this.document.page_settings.height = pageSize.height
			}
		},
		updatePageSize() {
			this.updatePageOrientation()
		},
		updatePageFonts() {
			//update default font size, color & family with values from page set up
			this.defaultValues.text.font_size = this.document.page_settings.font_size
			this.defaultValues.text.font_color = this.document.page_settings.font_color
			this.defaultValues.text.font_family = this.document.page_settings.font_family
		}
	},
	getters: {
		doc() {
			return this.document
		},
		draggables() {
			return this.document.draggables
		},
		pageSettings() {
			return this.document.page_settings
		},
		fonts() {
			return this.setup.fonts
		},
		pageSizes() {
			return this.setup.page_sizes
		},
		pageMargins() {
			return this.setup.page_margins
		},
		activeDraggable() {
			return this.document.active_draggable
		},
		defaults() {
			return this.defaultValues
		},
		isLoaded() {
			return this.loaded
		},
    }
});
