import React from 'react'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import styled from 'styled-components'

const Editor = (props) => {
  return (
    <Wrapper>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={props.change}
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
  grid-column: 1 / 8;
  min-width: 400px;
  margin-left: 2em;
  margin-bottom: 2em;
  height: 66vh;
`