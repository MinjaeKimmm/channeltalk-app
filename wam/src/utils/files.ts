

export type CardName = "dialogue" | "heartsping" | "jongwon" | "kind" | "mom" | "professional" | "sarcastic" | "seongjae" | "wooakgood"
export type CardType = "tone" | "character"

export const cardNames: CardName[] = ["dialogue", "kind", "mom", "sarcastic", "professional", "heartsping", "jongwon", "seongjae", "wooakgood"]

export const typeNames = ["backChat", "friendly", "parents", "sarcastic", "professional", "hachuPing", "paikJongWon", "ahnSungJae", "woowakGood"]

export const getApiInput = (index: number) => {
  if (index < 5) {
    return ["tone", typeNames[index]]
  } else {
    return ["character", typeNames[index]]
  }

}

export const cards: Record<CardName, { type: CardType, title: string }> = {
  dialogue: {
    type: "tone",
    title: "뒷담화 대화"
  },
  heartsping: {
    type: "character",
    title: "하츄핑"
  },
  jongwon: {
    type: "character",
    title: "백종원"
  },
  kind: {
    type: "tone",
    title: "친절한"
  },
  mom: {
    type: "tone",
    title: "부모님 잔소리"
  },
  professional: {
    type: "tone",
    title: "프로페셔널한"
  },
  sarcastic: {
    type: "tone",
    title: "비꼬는"
  },
  seongjae: {
    type: "character",
    title: "안성재"
  },
  wooakgood: {
    type: "character",
    title: "우왁굳"
  },
}

export const getCardDescription = (type: CardType): string => {
  if (type === "tone") {
    return "말투로"
  } else return "처럼 말하기"
}

export const getCardImgUrl = (name: CardName): string => `src/assets/${name}.png`