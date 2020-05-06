import styled from 'styled-components'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent || 'flex-start'};
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`
