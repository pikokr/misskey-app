import React from 'react'
import styled from 'styled-components/native'

const AvatarContainer = styled.View<{ size: number }>`
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const ImageContainer = styled.View<{ size: number }>`
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
`

export const MkAvatar: React.FC<{ src: string; size?: number }> = ({
  src,
  size = 36,
}) => {
  return (
    <AvatarContainer size={size}>
      <ImageContainer size={size}>
        <AvatarImg
          source={{
            uri: src,
          }}
        />
      </ImageContainer>
    </AvatarContainer>
  )
}
