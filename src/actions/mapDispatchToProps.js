import { bindActionCreators } from 'redux'

import { addText, clearAll, clearText } from './inputText'

import { openModal, closeModal } from './modal'

import { signup, login, logout, setCurrentUser } from './auth'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ 
    openModal,
    closeModal,
    addText,
    clearText,
    clearAll,
    signup,
    login,
    logout,
    setCurrentUser
  }, dispatch)
)

export default mapDispatchToProps