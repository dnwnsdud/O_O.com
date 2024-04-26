import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export default () => (
  <>
    <Container maxW={"50%"}>
      <Text fontSize="sm">이용약관</Text>
      <Box
        border="1px"
        width={"100%"}
        height={"10rem"}
        overflow={"auto"}
        paddingLeft={"10px"}
        fontSize="xs"
      >
        <Text color={"red"} as="b">
          [중요]가입후 이메일 주소로 인증 이메일이 발송됩니다.
        </Text>
        <br />
        <Text color={"red"} as="b">
          [중요]악용 및 투표 조작을 막기 위해 중복으로 아이디 2개 이상 사용할
          경우, 모든 아이디가 차단될 수 있습니다.
        </Text>
        <br />
        <Text as="b">제1조 (목적)</Text>
        <Text>
          본 약관은 O_O(이하 "회사"라 합니다)가 제공하는 O_O 및 O_O 관련 제반
          서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사의 회원과의 관리,
          의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </Text>
        <Text as="b">제 2조 (회원의 정의)</Text>
        <OrderedList>
          <ListItem>
            회원이란 회사가 제공하는 서비스에 접속하여 본 약관에 따라 회사의
            이용절차에 동의하고 회사가 제공하는 서비스를 이용하는 이용자를
            말합니다.
          </ListItem>
        </OrderedList>
        <Text as="b">제 3조 (회원 가입)</Text>
        <OrderedList>
          <ListItem>
            회원이 되고자 하는 자는 회사가 정한 가입 양식에 따라 회원정보를
            기입하고 "동의", "확인" 등의 버튼을 누르는 방법으로 회원 가입을
            신청합니다.
          </ListItem>
          <ListItem>
            회사는 제1항과 같이 회원으로 기입할 것을 신청한 자가 다음 각 호에
            해당하지 않는 한 신청한 자를 회원으로 등록합니다.
          </ListItem>
          <OrderedList>
            <ListItem>등록 내용에 허위, 기재누락, 오기가 있는 경우</ListItem>
            <ListItem>
              제6조 제2항에 해당하는 회원 자격 제한 및 정지, 상실을 한 경험이
              있었던 경우
            </ListItem>
            <ListItem>
              기타 회원으로 등록하는 것이 회사의 서비스 운영 및 기술상 현저히
              지장이 있다고 판단되는 경우
            </ListItem>
          </OrderedList>
          <ListItem>
            회원가입계약의 성립시기는 회사의 승낙이 가입신청자에게 도달한
            시점으로 합니다.
          </ListItem>
          <ListItem>
            회원은 제1항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시
            변경사항을 정정하여 기재하여야 합니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제4조 (서비스의 제공 및 변경)</Text>
        <OrderedList>
          <ListItem>회사는 회원에게 아래와 같은 서비스를 제공합니다.</ListItem>
          <OrderedList>
            <ListItem>커뮤니티 서비스 (게시판, 채팅 등)</ListItem>
            <ListItem>검색 서비스</ListItem>
            <ListItem>
              기타 회사가 자체 개발하거나 다른 회사와의 협력계약 등을 통해
              회원들에게 제공할 일체의 서비스
            </ListItem>
          </OrderedList>
          <ListItem>
            회사는 서비스의 내용 및 제공일자를 제7조 제2항에서 정한 방법으로
            회원에게 통지하고, 제1항에 정한 서비스를 변경하여 제공할 수
            있습니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제5조 (서비스의 중단)</Text>
        <OrderedList>
          <ListItem>
            회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절
            등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
            있고, 새로운 서비스로의 교체, 기타 회사가 적절하다고 판단하는 사유에
            기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.
          </ListItem>
          <ListItem>
            제1항에 의한 서비스 중단의 경우에 회사는 제7조 제2항에서 정한
            방법으로 회원에게 통지합니다. 다만, 회사가 통제할 수 없는 사유로
            인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는 디스크 장애,
            시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지
            아니합니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제6조 (회원 탈퇴 및 자격 상실 등)</Text>
        <OrderedList>
          <ListItem>
            회원은 회사에 언제든지 자신의 회원 등록 말소(회원 탈퇴)를 요청할 수
            있으며 회사는 위 요청을 받은 즉시 해당 회원의 회원 등록 말소를 위한
            절차를 밟습니다.
          </ListItem>
          <ListItem>
            탈퇴할 경우, 커뮤니티 서비스, 기타 공용 게시판 등에 등록된 게시물은
            자동 삭제되지 않습니다.
          </ListItem>
          <ListItem>
            ③ 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원의 회원자격을
            적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
          </ListItem>
          <OrderedList>
            <ListItem>가입 신청 시에 허위 내용을 등록한 경우</ListItem>
            <ListItem>
              다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등
              전자거래질서를 위협하는 경우
            </ListItem>
            <ListItem>
              서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는
              행위를 하는 경우
            </ListItem>
          </OrderedList>
          <ListItem>
            회사가 회원의 회원자격을 상실시키기로 결정한 경우에는 회원등록을
            말소합니다.
          </ListItem>
          <ListItem>
            이용자가 본 약관에 의해서 회원 가입 후 서비스를 이용하는 도중,
            연속하여 1년 동안 서비스를 이용하기 위해 로그인 기록이 없는 경우,
            회사는 회원의 회원자격을 상실시킬 수 있습니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제7조 (회원에 대한 통지)</Text>
        <OrderedList>
          <ListItem>
            회사가 특정 회원에게 서비스에 관한 통지를 하는 경우 회원정보에
            등록된 메일주소를 사용할 수 있습니다.
          </ListItem>
          <ListItem>
            회사가 불특정다수 회원에 대한 통지를 하는 경우 7일 이상 공지사항
            게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제8조 (회원의 개인정보)</Text>
        <Text>
          회사는 서비스를 제공하기 위하여 관련 법령의 규정에 따라 회원으로부터
          필요한 개인정보를 수집합니다. (개인정보에 대한 개별 항목은
          개인정보취급방침에서 고지)
        </Text>
        <Text as="b">제9조 (회사의 의무)</Text>
        <OrderedList>
          <ListItem>
            회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지
            않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
            제공하기 위해서 노력합니다.
          </ListItem>
          <ListItem>
            회사는 회원이 안전하고 편리하게 서비스를 이용할 수 있도록 시스템을
            구축합니다.
          </ListItem>
          <ListItem>
            회사는 회원이 서비스를 이용함에 있어 회원에게 손해를 배상할 책임이
            없습니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제10조 (회원의 ID 및 비밀번호에 대한 의무)</Text>
        <OrderedList>
          <ListItem>
            회사가 관계법령, "개인정보보호정책"에 의해서 그 책임을 지는 경우를
            제외하고, 자신의 ID와 비밀번호에 관한 관리책임은 각 회원에게
            있습니다.
          </ListItem>
          <ListItem>
            회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
          </ListItem>
          <ListItem>
            회원은 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을
            인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는
            그에 따라야 합니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제11조 (회원의 의무)</Text>
        <OrderedList>
          <ListItem>회원은 다음 각 호의 행위를 하여서는 안됩니다.</ListItem>
          <OrderedList>
            <ListItem>
              회원가입신청 또는 변경시 허위내용을 등록하는 행위
            </ListItem>
            <ListItem>
              회사 및 제3자의 지적재산권을 침해하거나 회사의 권리와 업무 또는
              제3자의 권리와 활동를 방해하는 행위
            </ListItem>
            <ListItem>다른 회원의 ID를 도용하는 행위</ListItem>
            <ListItem>
              관련 법령에 의하여 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램
              등)의 게시 또는 전송하는 행위
            </ListItem>
            <ListItem>
              회사의 직원 또는 서비스의 관리자를 가장하거나 타인의 명의를
              도용하여 정보를 게시, 전송하는 행위
            </ListItem>
            <ListItem>
              컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해,
              파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드,
              파일, 프로그램을 포함하고 있는 자료를 게시하거나 전송하는 행위
            </ListItem>
            <ListItem>스토킹(stalking) 등 다른 회원을 괴롭히는 행위</ListItem>
            <ListItem>
              다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
            </ListItem>
            <ListItem>
              불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나
              음란물을 게시하는 행위
            </ListItem>
            <ListItem>ID를 2개 이상 사용하는 행위</ListItem>
            <ListItem>추천 및 조회수 조작하는 행위</ListItem>
            <ListItem>게시판 글이나 댓글 도배</ListItem>
            <ListItem>채팅방 도배</ListItem>
            <ListItem>기타 상식적인 "악성" 영업방해 행위</ListItem>
            <ListItem>
              회사가 제공하는 관련 서비스에 게시된 공지사항 규정을 위반하는 행위
            </ListItem>
            <ListItem>서버나 회선에 무리를 줄 수 있는 행위</ListItem>
            <ListItem>
              사람의 직접적인 행동이 아닌 자동화된 프로그램이나 봇을 통해 로그인
              및 로그인된 사용자가 하는 기능들을 이용하는 행위 또는 사이트
              내용을 추출해서 광고를 제거해서 다시 제공하는 행위
            </ListItem>
          </OrderedList>
          <ListItem>
            제1항에 해당하는 행위를 한 회원이 있을 경우 회사는 본 약관 제6조
            제2, 3항에서 정한 바에 따라 회원의 회원자격을 적절한 방법으로 제한
            및 정지, 상실시킬 수 있습니다.
          </ListItem>
          <ListItem>
            회원은 그 귀책사유로 인하여 회사나 다른 회원이 입은 손해를 배상할
            책임이 있습니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제12조 (공개게시물의 삭제 또는 이용제한)</Text>
        <OrderedList>
          <ListItem>
            회원의 공개게시물의 내용이 다음 각 호에 해당하는 경우 회사는 해당
            공개게시물에 회원에게 사전 통지 없이 해당 공개게시물을 삭제 또는
            변경할 수 있고, 해당 회원의 회원 자격을 제한, 정지 또는 상실시킬 수
            있습니다.{" "}
          </ListItem>
          <OrderedList>
            <ListItem>
              다른 회원 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는
              내용
            </ListItem>
            <ListItem>
              음란물, 욕설 등 공서양속에 위반되는 내용의 정보, 문장, 도형 등을
              유포하는 내용
            </ListItem>
            <ListItem>범죄행위와 관련이 있다고 판단되는 내용</ListItem>
            <ListItem>
              다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용
            </ListItem>
            <ListItem>
              종교적, 정치적 분쟁을 야기하는 내용으로서, 이러한 분쟁으로 인하여
              회사의 업무가 방해되거나 방해되리라고 판단되는 경우
            </ListItem>
            <ListItem>
              타인의 개인정보, 사생활을 침해하거나 명예를 손상시키는 경우
            </ListItem>
            <ListItem>
              동일한 내용을 중복하여 다수 게시하는 등 게시의 목적에 어긋나는
              경우
            </ListItem>
            <ListItem>
              불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우
            </ListItem>
            <ListItem>반복적인 내용이나 무의미한 도배성 행위</ListItem>
            <ListItem>기타 상식적인 "악성" 영업방해 행위</ListItem>
          </OrderedList>
          <ListItem>
            회원의 공개게시물로 인한 법률상 이익 침해를 근거로, 다른 회원 또는
            제3자가 회원 또는 회사를 대상으로 하여 민형사상의 법적 조치(예:고소,
            가처분신청, 손해배상청구소송)를 취하는 동시에 법적 조치와 관련된
            게시물의 삭제를 요청해오는 경우, 회사는 동 법적 조치의 결과(예:
            검찰의 기소, 법원의 가처분결정, 손해배상판결)가 있을 때까지 관련
            게시물에 대한 접근을 잠정적으로 제한할 수 있습니다.
          </ListItem>
          <ListItem>
            회사는 서비스 악용 방지를 위해 일부 게시물에 대해 수정 및 삭제 가능
            여부를 제한할 수 있습니다.{" "}
          </ListItem>
        </OrderedList>

        <Text as="b">제13조 (저작권의 귀속 및 게시물의 이용)</Text>
        <OrderedList>
          <ListItem>
            회사가 작성한 저작물에 대한 저작권, 기타 지적재산권은 회사에
            귀속합니다.
          </ListItem>
          <ListItem>
            회원은 회사가 제공하는 서비스를 이용함으로써 얻은 정보를 회사의
            사전승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여
            영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
          </ListItem>
          <ListItem>
            회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게
            귀속됩니다. 단, 회사는 서비스의 운영, 전시, 전송, 배포, 홍보의
            목적으로 회원의 별도의 허락 없이 무상으로 저작권법에 규정하는 공정한
            관행에 합치되게 합리적인 범위 내에서 다음과 같이 회원이 등록한
            게시물을 사용할 수 있습니다.
          </ListItem>
          <OrderedList>
            <ListItem>
              서비스 내에서 회원 게시물의 복제, 수정, 개조, 전시, 전송, 배포 및
              저작물성을 해치지 않는 범위 내에서의 편집 저작물 작성
            </ListItem>
            <ListItem>
              미디어, 통신사 등 서비스 제휴 파트너에게 회원의 게시물 내용을
              제공, 전시 혹은 홍보하게 하는 것. 단, 이 경우 회사는 별도의 동의
              없이 회원의 이용자ID 외에 회원의 개인정보를 제공하지 않습니다.
            </ListItem>
            <ListItem>
              회사는 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우,
              전화, 팩스, 전자우편 등의 방법을 통해 사전에 회원의 동의를 얻어야
              합니다.
            </ListItem>
            <ListItem>
              회사는 법적인 제한이 있는 글이 아니라면 사용자의 게시물을 삭제할
              의무가 없습니다.
            </ListItem>
          </OrderedList>
        </OrderedList>

        <Text as="b">제14조 (광고게재 및 광고주와의 거래)</Text>
        <OrderedList>
          <ListItem>
            회사가 회원에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는
            광고게재를 통한 수익으로부터 나옵니다. 회원은 회원이 등록한 게시물의
            내용을 활용한 광고게재 및 기타 서비스상에 노출되는 광고게재에 대해
            동의합니다.
          </ListItem>
          <ListItem>
            회사는 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에
            회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에
            대해 책임을 지지 않습니다
          </ListItem>
          <ListItem>
            회사는 서비스 악용 방지를 위해 일부 게시물에 대해 수정 및 삭제 가능
            여부를 제한할 수 있습니다.{" "}
          </ListItem>
        </OrderedList>

        <Text as="b">제15조 (약관의 개정)</Text>
        <OrderedList>
          <ListItem>
            회사는 약관의규제등에관한법률, 전자거래기본법, 전자서명법,
            정보통신망이용촉진등에관한법률 등 관련법을 위배하지 않는 범위에서 본
            약관을 개정할 수 있습니다.
          </ListItem>
          <ListItem>
            다만, 개정 내용이 회원에게 불리할 경우에는 적용일자 5일 이전부터
            적용일자 전일까지 공지합니다.{" "}
          </ListItem>
          <ListItem>
            회원은 변경된 약관에 대해 거부할 권리가 있습니다. 회원은 변경된
            약관이 공지된 후 14일 이내에 거부의사를 표명할 수 있습니다. 회원이
            거부하는 경우 회사는 당해 회원과의 계약을 해지할 수 있습니다. 만약
            회원이 변경된 약관이 공지된 후 14일 이내에 거부의사를 표시하지 않는
            경우에는 동의하는 것으로 간주합니다.
          </ListItem>
        </OrderedList>

        <Text as="b">제16조 (재판관할)</Text>
        <Text>
          회사와 회원간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국
          법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할을 가지는
          대한민국의 법원에 제기합니다. 부칙 (2015년 10월 3일 공고)
        </Text>
      </Box>
      <Checkbox mb="2rem" size="sm" colorScheme="blue">
        <Flex as="b">
          <Text color={"blue"}>[필수]</Text>
          <Text>이용약관에 동의 합니다.</Text>
        </Flex>
      </Checkbox>

      <Text fontSize="sm">개인정보 수집 이용 동의</Text>
      <Box
        border="1px"
        width={"100%"}
        height={"10rem"}
        overflow={"auto"}
        paddingLeft={"10px"}
        fontSize="xs"
      >
        <Text as="b">O_O 개인정보 처리방침</Text>
        <Text>
          정보통신망 이용촉진 등에 관한 법률 등 관련 법률에 의한 개인정보
          보호규정 및 정보통신부가 제정한 개인정보지침을 준수하고 있습니다.
        </Text>
        <OrderedList>
          <ListItem as="b">개인정보의 수집 항목</ListItem>
          <UnorderedList>
            <ListItem>
              원활한 서비스 이용과 고객과의 소통을 위해 수집합니다.
            </ListItem>
            <ListItem>[공통] 필수항목: 아이디, 비밀번호, 이메일</ListItem>
            <ListItem>
              [공통] 자동수집항목: IP 주소, 접속 기록, 쿠키, 브라우저 종류 및
              헤더값, 등
            </ListItem>
            <ListItem>
              앱 수집 항목: 앱 수집 항목: 구글 광고 ID, Device ID(안드로이드는
              Google Advertiser ID/GAID, iOS는 ID for Advertisers/IDFA), 단말기
              정보(모델명, OS버전, 고유식별번호)
            </ListItem>
            <ListItem>
              앱이나 웹 푸시 알림을 사용할 경우: 기기별 고유 식별자
            </ListItem>
          </UnorderedList>

          <ListItem as="b">개인정보의 수집 방법</ListItem>
          <Text>회원 가입 시에 필수항목 기재를 요청합니다.</Text>

          <ListItem as="b">개인정보의 수집 이용 목적</ListItem>
          <UnorderedList>
            <ListItem>
              아이디, 비밀번호, 이메일: 회원 가입시에 사용자확인, 중복가입 방지,
              부정 이용 방지를 위한 목적으로 사용합니다.
            </ListItem>
            <ListItem>
              이용자의 IP 주소, 접속 기록, 쿠키, 브라우저 종류 및 헤더값, 등:
              보안, 불량회원의 부정 이용방지와 비인가 사용방지, 통계학적 분석에
              사용합니다.
            </ListItem>
            <ListItem>
              구글 광고 ID, Device ID, 단말기 정보(모델명, OS버전,
              고유식별번호): 광고 효율화를 위해 사용합니다.
            </ListItem>
            <ListItem>
              기기별 고유 식별자: 푸시 알림을 위해 사용합니다.
            </ListItem>
          </UnorderedList>
          <Text>
            개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만,
            동의를 거부할 경우 회원가입, 회원 서비스, 로그인 서비스가 제한될 수
            있습니다.
          </Text>
        </OrderedList>
      </Box>

      <Stack>
        <Checkbox size="sm" colorScheme="blue">
          <Flex>
            <Text color={"blue"} as="b">
              [필수]
            </Text>
            <Text as="b">개인정보처리방침에 동의 합니다.</Text>
          </Flex>
        </Checkbox>
        <Checkbox size="sm" colorScheme="blue">
          <Flex as="b">
            <Text color={"blue"}>[필수]</Text>
            <Text>14세 이상 본인입니다.</Text>
          </Flex>
        </Checkbox>
        <Button border={"2px"} width={"10%"}>
          다음
        </Button>
      </Stack>
    </Container>
  </>
);
