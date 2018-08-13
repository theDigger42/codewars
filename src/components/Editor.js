import React from 'react'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/chaos';
import 'brace/theme/merbivore';
import styled from 'styled-components'

const Editor = (props) => {
  return (
    <Wrapper>
      <AceEditor
        mode="javascript"
        theme="merbivore"
        onChange={e => props.change('solution', e)}
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
  )
}

export default Editor

const Wrapper = styled.div`
  grid-column: 1 / 9;
  min-width: 45vw;
  margin-left: 2em;
  margin-bottom: 2em;
  height: 68vh;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.9);
`