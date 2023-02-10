import React from 'react'
import styled from 'styled-components/native'

const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ImageContainer = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  overflow: hidden;
`

const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
`

export const MkAvatar: React.FC<{ src: string }> = ({ src }) => {
  return (
    <AvatarContainer>
      <ImageContainer>
        <AvatarImg
          source={{
            uri: src,
          }}
        />
      </ImageContainer>
    </AvatarContainer>
  )
}
