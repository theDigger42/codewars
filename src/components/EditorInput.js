import React from 'react'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/chaos';
import 'brace/theme/merbivore';
import styled from 'styled-components'

const EditorInput = (props) => {
  return (
    <Wrapper>
      <AceEditor
        mode="javascript"
        theme="merbivore"
        onChange={e => props.change('submition_solution', e)}
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

export default EditorInput

const Wrapper = styled.div`
  grid-column: 1 / 3;
  width: 80%;
  height: 60vh;
  margin-left: 1em;
`