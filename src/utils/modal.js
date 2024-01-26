import { useDocumentModalStore } from '@/stores'

export const launchModal = (modalName) => { 
   const modalStore = useDocumentModalStore()
   modalStore.show(modalName)
}

/*check if modal is currently launched*/
export const modalIsActive = (modalName) => { 
   const modalStore = useDocumentModalStore()
   return modalStore.name === modalName
}

export const closeModal = (delay = 0, form = {}) => { 
    const modalStore = useDocumentModalStore()
    //delay closing of modal for 1 second
    setTimeout(function() {
        modalStore.close()
        //reset form if form object has been passed
        if(typeof form.reset !== 'undefined') {
            form.reset()
        }
    }, delay)
   
}