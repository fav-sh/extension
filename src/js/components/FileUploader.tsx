import React, { ChangeEvent } from 'react'

type Props = {
  onFile: (content: any) => void
}

export const FileUploader = (props: Props) => {
  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.onloadend = () => {
        const content = fileReader.result
        props.onFile(content)
      }

      fileReader.readAsText(file)
    }
  }

  return (
    <>
      <input
        type="file"
        onChange={handleFiles}
        accept=".json"
        multiple={false}
      />
    </>
  )
}
