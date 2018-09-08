import React from "react";
import AceEditor from "react-ace";
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
      <PlayerEditor>
        <AceEditor
          mode="javascript"
          theme="merbivore"
          onLoad={diffOnLoad}
          name="UNIQUE_ID_OF_DIV"
          value={props.input}
          onChange={e => {
            props.change("solution", e)
            duelTyping(e)
          }}
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
      </PlayerEditor>
      <OpponentEditor>
        <AceEditor
          mode="javascript"
          theme="merbivore"
          onLoad={diffOnLoad}
          readOnly
          value={props.opponent}
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
      </OpponentEditor>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const PlayerEditor = styled.div`
  grid-column: 1;
`
const OpponentEditor = styled.div`
  grid-column: 2;
`
