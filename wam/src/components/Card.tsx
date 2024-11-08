import {
  cardNames,
  cards,
  getCardDescription,
  getCardImgUrl,
} from '@wam/utils/files'
import { colors } from '@wam/utils/styles'
import styled from 'styled-components'
import Text from './Text'
import { Activity, VenetianMask } from 'lucide-react'

export default function Card({ index }: { index: number }) {
  const name = cardNames[index]
  return (
    <CardWrapper>
      <AssetWrapper>
        <IconWrapper>
          {cards[name].type === 'tone' ? (
            <Activity
              size={22}
              color={colors.highlight}
            />
          ) : (
            <VenetianMask
              size={22}
              color={colors.highlight}
            />
          )}
        </IconWrapper>
        <img
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
          src={getCardImgUrl(name)}
        />
      </AssetWrapper>

      <TitleWrapper>
        <Text
          type="Body"
          label={cards[name].title}
          color="highlight"
        />
        <Text
          type="Body"
          label={getCardDescription(cards[name].type)}
          color="white"
        />
      </TitleWrapper>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 300px;
  height: 400px;

  box-sizing: border-box;
  padding: 20px 0px 28px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 12px;

  background-color: ${colors.darkgray};
`

const AssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;

  background-color: ${colors.black};
`

const TitleWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
