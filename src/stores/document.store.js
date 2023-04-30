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
					'id' : '',
				},
		setup: JSON.parse(localStorage.getItem('setup')),
		spinners: {
			'saving_document' : false,
			'loading_workspace' : true,
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
		initializeWorkspace() {
			this.reset()
			this.document.draggables = JSON.parse(sessionStorage.getItem('draggables'))
		},
        async reloadWorkspaceDraggables() {
			/**
			* Workspace draggables are reloaded from session.
			* This is done so that, the draggables can obey parent size and stay within parent
			**/
			this.document.draggables = []
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/workspace/'+this.document.id)
			.then(() => {
				this.spinners.loading_workspace = false;
				this.document.draggables = JSON.parse(sessionStorage.getItem('draggables'))
			})
		},
		async update() {
			this.cleanDraggables()
			const http = createHttp()
			http.post(process.env.VUE_APP_API_URL+'/api/workspace/save', {'id': this.document.id, 'document' : this.document})
			.then((response) => {
				console.log(response) 
				this.spinners.saving_document = false
			})
		},
		reset() {
			this.document.draggables = []
			this.document.active_draggable = {}
		},
		updateDocument(item, itemValue) {
			this.document[item] = itemValue
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
		setPageSettings(pageSettings) {
			this.document.page_settings = pageSettings
		},
		setDraggables(draggables) {
			this.document.draggables = draggables
		},
		saveToSession(item, itemValue, stringify = true) {
			itemValue = stringify == true ? JSON.stringify(itemValue) : itemValue
			sessionStorage.setItem(item, itemValue)
		},
		setSpinner(spinner, status) {
			this.spinners[spinner] = status
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
		updateDefaultFontSettings() {
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
		isSavingDocument() {
			return this.spinners.saving_document
		},
		isLoadingWorkspace() {
			return this.spinners.loading_workspace
		},
    }
});
