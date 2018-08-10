import { bindActionCreators } from 'redux'

import { addText, clearAll, clearText } from './inputText'

import { openModal, closeModal } from './modal'

import { signup, login, logout, setCurrentUser } from './auth'

import { submit, getPrompt, clearPrompt, changeRoom, setComplete } from './prompt'

import { getLeaderboard, onScoreboardChange, clearScoreboard } from './score'

import { setOnline, getOnlineUser } from './online'

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
    onScoreboardChange,
    changeRoom,
    setComplete,
    clearScoreboard,
    setOnline,
    getOnlineUser
  }, dispatch)
)

export default mapDispatchToProps