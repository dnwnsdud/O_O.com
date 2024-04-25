import { Box, Stack, Text, OrderedList, ListItem, Heading } from "@chakra-ui/react"

export default () => <>

  <Box bg="#f7f7f8">
    <Stack
      w={"65%"}
      m={"auto"}
      direction={"column"}
      justifyContent={"center"}
    >
      <Stack
        height={"80%"}
        direction={"column"}
        justifyContent={"space-around"}
        borderRadius={"10px"}
        bg={"white"}
        boxShadow={"base"}
        p={10}
        my="10"
      >
        <Heading textAlign={"Center"} paddingBottom="20px">개인정보처리방침</Heading>
        <Box border='1px solid #dedee3' width={"100%"} height={"1500px"} overflow={"auto"} paddingLeft={"10px"} padding="20px">
          <Text fontWeight={"bold"}>1. 개인정보의 수집 항목</Text>
          <Text>원활한 서비스 이용과 고객과의 소통을 위해 수집합니다.
            • [공통] 필수항목: 아이디, 비밀번호, 이메일
            • [공통] 자동수집항목: IP 주소, 접속 기록, 쿠키, 브라우저 종류 및 헤더값, 등
            • 앱 수집 항목: 앱 수집 항목: 구글 광고 ID, Device ID(안드로이드는 Google Advertiser ID/GAID, iOS는 ID for Advertisers/IDFA), 단말기 정보(모델명, OS버전, 고유식별번호)
            • 앱이나 웹 푸시 알림을 사용할 경우: 기기별 고유 식별자</Text>
          <Text fontWeight={"bold"}>2. 개인정보의 수집 방법</Text>
          <Text>
            회원 가입 시에 필수항목 기재를 요청합니다.
          </Text>
          <Text fontWeight={"bold"}>3. 개인정보의 수집 이용 목적</Text>
          <Box>
            <Text paddingLeft={"10px"}>
              • 아이디, 비밀번호, 이메일: 회원 가입시에 사용자확인, 중복가입 방지, 부정 이용 방지를 위한 목적으로 사용합니다.
            </Text>
            <Text paddingLeft={"10px"}>• 이용자의 IP 주소, 접속 기록, 쿠키, 브라우저 종류 및 헤더값, 등: 보안, 불량회원의 부정 이용방지와 비인가 사용방지, 통계학적 분석에 사용합니다.</Text>
            <Text paddingLeft={"10px"}>• 구글 광고 ID, Device ID, 단말기 정보(모델명, OS버전, 고유식별번호): 광고 효율화를 위해 사용합니다.</Text>
            <Text paddingLeft={"10px"}>• 기기별 고유 식별자: 푸시 알림을 위해 사용합니다.
            </Text>
          </Box>
          <Text fontWeight={"bold"}>4. 개인정보 공유 및 제공</Text>
          <Text>
            회원의 동의가 있거나 법률의 규정 또는 수사목적으로 법령에 정해진 절차와 방법에 따른 수사기관의 요구에 의한 경우를 제외하고, 어떠한 경우에도 본 방침을 넘어 이용자의 개인정보를 이용하거나 외부에 공개하지 않습니다.
            대한민국 경찰서에서 통신자료제공 요청이 온 경우에는 개인정보를 경찰서에 제공합니다.
          </Text>

          <Text fontWeight={"bold"}>5. 개인정보의 위탁</Text>
          <Text>회원의 동의 없이 개인정보를 외부에 위탁하지 않습니다.</Text>

          <Text fontWeight={"bold"}>6. 개인정보의 보유 및 이용기간</Text>
          <Box>
            <Text paddingLeft={"10px"}>
              - 가입 회원정보는 탈퇴할 시 3년간 보관 후 파기됩니다. 이 때 개인정보를 별도로 분리하여 별도로 저장 및 관리합니다.
            </Text>
            <Text paddingLeft={"10px"}>- 단, 게시물 및 댓글의 내용은 사이트 폐쇄 시까지 보관합니다.</Text>
            <Text paddingLeft={"10px"}>- 악성 사용자의 재가입을 막기 위하여 휴대폰 및 본인 인증, 이메일에 따른 DI(Duplication Information, 중복확인정보)값으로 사용자 가입 제한을 할 수 있으며, 이 DI값도 탈퇴 후 3년이 지나면 삭제하나 다만, 성인물 유포, 선량한 질서 위반, 강행법규 위반으로 차단되는 등의 중대한 사유가 있는 경우 삭제 기간이 연장될 수 있습니다.</Text>
          </Box>

          <Text fontWeight={"bold"}>7. 개인정보의 파기절차 및 방법</Text>
          <Box>
            <Text paddingLeft={"10px"}>• 파기절차: 가입 회원정보는 탈퇴 후 3년간 보관한 후, 어떠한 용도로도 열람 또는 이용할 수 없도록 파기 처리합니다.</Text>
            <Text paddingLeft={"10px"}>• 파기 방법: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</Text>
          </Box>

          <Text fontWeight={"bold"}>8. 이용자 및 법정대리인의 권리와 그 행사방법</Text>
          <Text>
            이용자는 언제든지 "내 정보" , "회원 정보 수정"에서 자신의 개인정보를 조회하거나 수정ㆍ삭제할 수 있으며, 자신의 개인정보에 대한 열람을 요청할 수 있습니다.
            이용자는 언제든지 개인정보 처리의 정지를 요청할 수 있으며, 법률에 특별한 규정이 있는 등의 경우에는 처리정지 요청을 거부할 수 있습니다.
            이용자는 언제든지 "탈퇴" 등을 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.
            만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정 및 삭제, 처리정지, 수집 및 이용 동의를 철회할 권리를 가집니다.
            이용자 및 법정대리인의 권리는 "회원정보" 페이지 등에서 직접 처리하거나, "문의" 및 이메일을 통해 요청할 수 있습니다.
          </Text>
          <Text fontWeight={"bold"}>9. 쿠키(Cookie)의 설치, 운영 및 거부, 앱 광고 식별자 거부</Text>
          <Box>
            <Text paddingLeft={"10px"}>• 쿠키: 웹 사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에 보내는 정보 파일로 사용자의 컴퓨터 하드디스크에 저장되기도 합니다.</Text>
            <Text paddingLeft={"10px"}>• 쿠키 등의 사용 목적: 사이트 로그인을 위한 아이디 식별 및 사이트 설정 기능이 담겨져 있어서 최적화된 정보 제공을 위해 사용합니다.</Text>
            <Text paddingLeft={"10px"}>• 쿠키 삭제 및 거부 방법: 웹 브라우저 설정에서 삭제 및 거부할 수 있습니다.</Text>
            <Text paddingLeft={"10px"}>• 앱 광고 식별자 수집 항목에 대해 안드로이드 및 iOS 설정을 통해 사용자가 선택적으로 거부할 수 있습니다.</Text>
          </Box>

          <Text fontWeight={"bold"}>10. 개인정보의 기술적/관리적 보호 대책</Text>
          <Box>
            <Text>이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.</Text>
            <Text paddingLeft={"10px"}>• 비밀번호 암호화</Text>
            <Text>회원 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.</Text>
            <Text paddingLeft={"10px"}>• 해킹 등에 대비한 대책</Text>
            <Text>해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.</Text>
          </Box>

          <Text fontWeight={"bold"}>11. 로그 분석</Text>
          <Text>회사는 외부 서비스를 이용해서 로그 분석을 할 수 있습니다. 그런 경우 특정 개인을 개별 식별할 수 없는 형태로 로그 분석을 하고 있습니다.</Text>

          <Text>12. 개인정보 관리 책임자</Text>
          <Box>
            <Text paddingLeft={"10px"}>- 개인정보 보호업무 부서: 에펨코리아 개인정보 보호팀</Text>
            <Text paddingLeft={"10px"}>- 연락처 및 이메일 : aaaa@aaaa.com</Text>
          </Box>

          <Text fontWeight={"bold"}>13. 고지의 의무</Text>
          <Text>이 개인정보 취급방침이 법령, 정책 또는 보안기술의 변경에 따라 내용이 추가, 삭제 및 수정될 경우에는 변경사항의 시행일의 7일전부터 사이트에 공고할 것입니다.</Text>
          <Box>
            <Text paddingLeft={"10px"}>• 공고일자: 2024년 4월 10일</Text>
            <Text paddingLeft={"10px"}>• 시행일자: 2024년 4월 24일</Text>
          </Box>
        </Box>
      </Stack>
    </Stack>
  </Box>
</>