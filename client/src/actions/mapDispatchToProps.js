import { bindActionCreators } from "redux";

import { addText, clearAll, clearText } from "./inputText";

import { openModal, closeModal } from "./modal";

import { signup, login, logout, setCurrentUser } from "./auth";

import { getDuelPrompt, addDuelSolution, playerTyping, resetConsoleResults, setConsoleResults } from './duel'

import {
  submit,
  getPrompt,
  clearPrompt,
  changeRoom,
  setComplete,
  userSubmition,
  addSolution,
  onTimerChange,
  resetTimer
} from "./prompt";

import {
  getDailyLeaderboard,
  getLeaderboard,
  onScoreboardChange,
  clearScoreboard
} from "./score";

import { setOnline, getOnlineUser } from "./online";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
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
      getDailyLeaderboard,
      getLeaderboard,
      getPrompt,
      clearPrompt,
      onScoreboardChange,
      changeRoom,
      setComplete,
      clearScoreboard,
      setOnline,
      getOnlineUser,
      userSubmition,
      addSolution,
      onTimerChange,
      resetTimer,
      getDuelPrompt,
      addDuelSolution,
      playerTyping,
      resetConsoleResults,
      setConsoleResults
    },
    dispatch
  );

export default mapDispatchToProps;
