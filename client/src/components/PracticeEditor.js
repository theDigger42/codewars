import React from "react";
import {split as SplitEditor} from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/theme/chaos";
import "brace/theme/merbivore";
import styled from "styled-components";
import { duelTyping } from '../socket/api'

const diffOnLoad = editor => {
  window.addEventListener('resize', () => {
  editor.resize();
 });
};

const PracticeEditor = props => {
  return (
    <Wrapper>
      <SplitEditor
        mode="javascript"
        theme="merbivore"
        onLoad={diffOnLoad}
        splits={2}
        orientation="beside"
        onChange={e => {
          props.change(e)
          duelTyping(e)
        }}
        value={props.input}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        cursorStart={2}
        showPrintMargin={true}
        highlightActiveLine={true}
        width="100%"
        height="100%"
        setOptions={{
          showLineNumbers: true,
          tabSize: 2
        }}
      />
    </Wrapper>
  );
};

export default PracticeEditor;

const Wrapper = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;
  margin-right: 1rem;
  margin-left: 1rem;
  height: 50vh;
`;
