import React, { useState } from 'react';
import './App.css';
import { AppContainer } from './styles'
import { Column } from './Column';
import { AddNewItem } from "./AddNewItem"
import { useAppState } from './AppStateContext'
import { CustomDragLayer } from './CustomDragLayer'
function App() {

  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      { state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} id={list.id} index={i} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })}
        dark />
    </AppContainer >
  );
}

export default App;
