import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { MfmRenderer } from '../components/mfm/MfmRenderer'

const content = `
이 인스턴스의 기반이 되는 Misskey에서는 MFM<small>(**M**arkup language **F**or **M**isskey)</small>을 이용하여 글자에 특수한 효과를 줄 수 있습니다.
이 페이지에서는 Misskey에서 사용할 수 있는 MFM 문법에 대해 다룹니다.


이 문서는 최신 업데이트로 인해 사라진 \`/mfm-cheat-sheet\`를 임시로 대체하는 문서입니다.


**굵게**
⮤ \`**굵게**\` 또는 \`__bold__\`

<i>이텔릭체</i>
⮤ \`<i>이텔릭체</i>\`

<small>작은글자&반투명</small>
⮤ \`<small>작은글자&반투명</small>\`

~~취소선~~
⮤ \`~~취소선~~\`

<center>가운데 정렬</center>
  \`<center>가운데 정렬</center>\` ↗️

$[fg.color=0af 글자색] $[bg.color=c3f8 배경색]
⮤ \`$[fg.color=0af 글자색] $[bg.color=c3f8 배경색]\`

><small>HEX 컬러코드 3~6글자. rgb 또는 rgba 또는 rrggbb</small>
><small>컬러 코드에 대한 감이 잘 안 오시면 ?[여기를 둘러보세요.](https://colorhunt.co/) # 뒤에 있는 문자열이 바로 컬러 코드랍니다.</small>
><small>라이트/다크 테마를 고려하여 중첩 사용을 권장합니다.</small>

$[blur 흐리게]
⮤ \`$[blur 흐리게]\`

$[rotate.deg=30 회전]
⮤ \`$[rotate.deg=30 회전]\`

$[rainbow 무지개 :sunrise_over_pudding:]
⮤ \`$[rainbow 무지개 :sunrise_over_pudding:]\`

$[sparkle 반짝반짝]
⮤ \`$[sparkle 반짝반짝]\`

$[flip 좌우반전] $[flip.v 상하반전] $[flip.h,v 둘다반전]
⮤ \`$[flip 좌우반전] $[flip.v 상하반전] $[flip.h,v 둘다반전]\`

$[position.y=-0.5 위로]$[position.y=0.5 아래로]$[position.x=-0.5 옆으로]
⮤ \`$[position.y=-0.5 위로]$[position.y=0.5 아래로]$[position.x=-0.5 옆으로]\`
보통 이런 식으로 사용해요 -> :lapy_lapy3:$[position.x=-2.5,y=-0.3 :patting_hand:]

$[scale.x=1,y=0.5 글자크기] $[scale.x=0.5,y=1 글자크기]
⮤ \`$[scale.x=1,y=0.5 글자크기] $[scale.x=0.5,y=1 글자크기]\` (각각 0-5까지 지정 가능)

$[font.monospace 고정폭 글꼴 Aistyle01237]
(비교용: 가변폭 글꼴 Aistyle01237)
⮤ \`$[font.monospace 고정폭 글꼴 Aistyle01237]\`

<plain>모든 **효과** $[blur 비활성화]</plain>
⮤ \`<plain>모든 **효과** $[blur 비활성화]</plain>\`


> ℹ️ 거의 모든 애니메이션은 \`speed=1s\` 를 붙여 속도를 지정할 수 있습니다.
> $[spin.speed=5s 🍮] $[spin.y,left,speed=5s  🍮]


$[tada 짠!] = \`$[tada 짠!]\`
$[jelly 젤리] = \`$[jelly 젤리]\`
$[jump 점프] = \`$[jump 점프]\`
$[bounce 바운스] = \`$[bounce 바운스]\`
$[shake 부들부들] = \`$[shake 부들부들]\`
$[twitch 파들파들] = \`$[twitch 파들파들]\`


$[spin :kr_uaaa:] $[spin.left :kr_uaaa:] $[spin.alternate :kr_uaaa:]
$[spin.x :kr_uaaa:] $[spin.x,left :kr_uaaa:] $[spin.x,alternate :kr_uaaa:]
$[spin.y :kr_uaaa:] $[spin.y,left :kr_uaaa:] $[spin.y,alternate :kr_uaaa:]
\`\`\`
$[spin   시계방향]  $[spin.left   반시계방향]  $[spin.alternate 왔다갔다]
$[spin.x 넘어간다]  $[spin.x,left 쓰러진다]    $[spin.x,alternate 앞뒤로]
$[spin.y 오른쪽]    $[spin.y,left 왼쪽]        $[spin.y,alternate 왔다갔다]
\`\`\`


> Misskey를 찾아주셔서 감사합니다! Misskey는 지구에서 태어난 분산형 마이크로블로깅 서비스입니다. Misskey는 연합우주(분산형 SNS의 집합체) 상에 존재하는 다른 SNS와도 소통할 수 있답니다!
⮤ \`> 내용\`


아무 노래 Search
⮤ \`검색어 Search\` 또는 \`검색어 検索\` 또는 \`검색어 [Search]\` 또는 \`검색어 [検索]\`


[Misskey 소개 홈페이지](http://join.misskey.page)
[Misskey.lapy](http://k.lapy.link)
⮤ \`[하이퍼링크](http://url.goes.here)\`
> URL에 유니코드 문자가 들어가 있을 경우, 그 부분을 ?[퍼센트 인코딩](https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%84%BC%ED%8A%B8_%EC%9D%B8%EC%BD%94%EB%94%A9)으로 입력하거나 \`<http...>\`의 꼴로 입력해 주어야 인식해요. 퍼센트 인코딩을 이용하시는 것을 권장드려요.
> 하이퍼링크에 대한 미리보기가 아래와 같이 맨 마지막에 표시되는데, 대괄호 앞에 ?을 붙이면 글 하단에 링크 미리보기가 뜨지 않게 할 수 있어요.\`
>('퍼센트 인코딩'에 적용되어 있어요.)


\`\`\`
\`~\` = 코드블록
\`\`\`(엔터)~(엔터)\`\`\` = 행단위 코드
이 블록 안에 가로로 긴 글이 있을 때엔 좌우 스크롤바가 생겨요. 바로 이러케에에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엥에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엥에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엑용케여기까지읽으셨네에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엥에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엥에에에에에ㅔ엥레에ㅔ에에에에에ㅔ에에ㅔ에엥
\`\`\`



감이 잘 오지 않으신다고요? 직접 타이핑하면서 감을 잡으시는 건 어떠신가요?
노트 작성 창을 열고, 본문 미리보기 아이콘을 눌러 어떻게 보이는 지 실시간으로 확인할 수 있어요!


로그인하지 않은 상태라면, [이 페이지](https://k.lapy.link/@lapy/pages/a)에서도 연습하실 수 있답니다.


$[scale.x=0,y=0 
**$[x2 ⚠️ 혹시 여기까지 다 읽으셨나요!?]**
이 페이지는 더 이상 업데이트되지 않아요! 위에서 설명한 문법 대부분은, 최신 Misskey에서 정상적으로 동작하지 않습니다.


대신 각 인스턴스에서 제공하는 MFM Cheat Sheet(MFM 도움말)을 이용하세요.
<small>?[🥝 Misskey.lapy](https://k.lapy.link/mfm-cheat-sheet) · ?[:madostone: Madostone](https://madost.one/mfm-cheat-sheet) · ?[:kokonect_icon: Kokonect](https://kokonect.link/mfm-cheat-sheet)</small>
]
`

export const MfmTest: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <MfmRenderer content={content.trim()} emojis={{}} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
})
