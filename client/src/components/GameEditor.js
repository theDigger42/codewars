import React from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/theme/chaos";
import "brace/theme/merbivore";
import styled from "styled-components";

const GameEditor = props => {
  return (
    <Wrapper>
      <AceEditor
        mode="javascript"
        theme="merbivore"
        onChange={e => props.change("solution", e)}
        value={props.input}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
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

export default GameEditor;

const Wrapper = styled.div`
  grid-column: 1 / 9;
  min-width: 50vw;
  margin-left: 2em;
  margin-bottom: 2em;
  height: 74vh;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.9);
`;
