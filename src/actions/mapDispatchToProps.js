import { bindActionCreators } from 'redux'

import { addText, clearAll, clearText } from './inputText'

import { openModal, closeModal } from './modal'

import { signup, login, logout, setCurrentUser } from './auth'

import { submit, getPrompt, clearPrompt } from './prompt'

import { getLeaderboard, onScoreboardChange } from './score'

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
    setCurrentUser,
    submit,
    getLeaderboard,
    getPrompt,
    clearPrompt,
    onScoreboardChange
  }, dispatch)
)

export default mapDispatchToProps