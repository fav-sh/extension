import React from 'react'
import EditorView, { EditorViewProps } from './EditorView'
import MainView, { MainViewProps } from './MainView'
import useRouter from '../hooks/useRouter'

export default () => {
  const { route, navigate } = useRouter()

  const editorProps: EditorViewProps = {
    onCreate: () => navigate('main'),
    onCancel: () => navigate('main'),
  }

  const mainViewProps: MainViewProps = {
    onCreate: () => navigate('editor'),
  }

  switch (route) {
    case 'editor':
      return <EditorView {...editorProps} />
    case 'main':
    default:
      return <MainView {...mainViewProps} />
  }
}
