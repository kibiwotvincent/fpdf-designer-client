import { defineStore } from 'pinia'
import createHttp from '@/axios.js'

export const useDocumentStore = defineStore({
    id: 'document',
    state: () => ({
        document: {
					'name' : '',
					'draggables' : [], 
					'active_draggable' : {},
					'page_settings' : {},
					'id' : '',
				},
		setup: JSON.parse(localStorage.getItem('setup')),
		spinners: {
			'saving_document' : false,
			'loading_workspace' : true,
			'reseting_workspace' : false,
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
			await http.post(process.env.VUE_APP_API_URL+'/api/workspace/'+this.document.id+'/save', {'name': this.document.name, 'page_settings' : this.document.page_settings, 'draggables': this.document.draggables})
		},
		async rename(documentID, name) {
			const http = createHttp()
			return await http.post(process.env.VUE_APP_API_URL+'/api/documents/'+documentID+'/rename', {'name': name})
		},
		async delete(documentID) {
			const http = createHttp()
			return await http.post(process.env.VUE_APP_API_URL+'/api/documents/'+documentID+'/delete')
		},
		reset() {
			this.document.draggables = []
			this.document.active_draggable = {}
		},
		resetActiveDraggable() {
			this.document.active_draggable = {}
		},
		updateDocument(item, itemValue) {
			this.document[item] = itemValue
		},
		addDraggable(draggable, copy) {
      if(copy) {
        draggable.left = parseInt(draggable.left + 4)
        draggable.top = parseInt(draggable.top + 10)
      }
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
			this.updateDefaultFontSettings()
			this.document.page_settings = pageSettings
		},
		setDraggables(draggables) {
			this.document.draggables = draggables
		},
		setDocumentName(name) {
			this.document.name = name
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
			const defaults = JSON.parse(localStorage.getItem('defaults'))
			defaults.text.font_size = this.document.page_settings.font_size
			defaults.text.font_color = this.document.page_settings.font_color
			defaults.text.font_family = this.document.page_settings.font_family
			localStorage.setItem('defaults', JSON.stringify(defaults))
		}
	},
	getters: {
		doc() {
			return this.document
		},
		documentName() {
			return this.document.name
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
		isResetingWorkspace() {
			return this.spinners.reseting_workspace
		},
    }
});
