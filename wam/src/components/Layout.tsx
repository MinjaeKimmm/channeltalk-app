import { colors } from '@wam/utils/styles'
import React from 'react'
import styled from 'styled-components'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return <LayoutWrappr>{props.children}</LayoutWrappr>
}

const LayoutWrappr = styled.div`
  width: 490px;
  height: 760px;

  box-sizing: border-box;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-color: ${colors.black};
`
