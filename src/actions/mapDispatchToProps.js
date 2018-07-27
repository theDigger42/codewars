import { bindActionCreators } from 'redux'

import { addText, clearAll, clearText } from './inputText'

import { openModal, closeModal } from './modal'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ 
    openModal,
    closeModal,
    addText,
    clearText,
    clearAll
  }, dispatch)
)

export default mapDispatchToProps