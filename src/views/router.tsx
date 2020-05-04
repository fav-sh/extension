import React from 'react'
import EditorView, { EditorViewProps } from '~/views/EditorView'
import MainView, { MainViewProps } from '~/views/MainView'
import TagsView, { TagsViewProps } from '~/views/TagsView'
import useRouter from '~/hooks/useRouter'

export default () => {
  const { route, navigate } = useRouter()

  const editorProps: EditorViewProps = {
    onCreate: () => navigate('main'),
    onCancel: () => navigate('main'),
  }

  const mainViewProps: MainViewProps = {
    onCreate: () => navigate('editor'),
    onTags: () => navigate('tags'),
  }

  const tagsViewProps: TagsViewProps = {
    onBack: () => navigate('main'),
  }

  switch (route) {
    case 'editor':
      return <EditorView {...editorProps} />
    case 'tags':
      return <TagsView {...tagsViewProps} />
    case 'main':
    default:
      return <MainView {...mainViewProps} />
  }
}
