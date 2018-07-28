import React from 'react'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const Editor = (props) => {
    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={props.change}
            value={props.input}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            fontSize={16}
            cursorStart={2}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            height={500}
            width={600}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
            }}
        />
    )
}

export default Editor