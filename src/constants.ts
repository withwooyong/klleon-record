// 아바타 정보 타입
export interface AvatarInfo {
  id: string;
  name: string;
  imageUrl: string;
}

// SDK 키 (환경변수에서 가져오기)
export const SDK_KEY = process.env.REACT_APP_KLLEON_SDK_KEY || "";

// 아바타 목록
export const AVATAR_LIST: AvatarInfo[] = [
  { id: "33584001-7b41-43c5-961b-da59b8d2591d", name: "오드리(퀴즈)", imageUrl: "https://english.yanadoocdn.com/upload/yanadoo/new/aiContents/image_sectionb_thumbnail_01.webp" },
  { id: "d8728de9-63f9-4fce-88ed-f02f423a1f54", name: "오드리(대화)", imageUrl: "https://english.yanadoocdn.com/upload/yanadoo/new/aiContents/image_sectionb_thumbnail_01.webp" },
  { id: "b6249514-444c-11ef-b707-0a8637d613d3", name: "카페 매니저 로라", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_043.png" },
  { id: "b61ccb8b-444c-11ef-b707-0a8637d613d3", name: "쇼호스트 소피아", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_040.png" },
  { id: "b61fcec4-444c-11ef-b707-0a8637d613d3", name: "쇼호스트 브랜든", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_041.png" },
  { id: "b6223b0b-444c-11ef-b707-0a8637d613d3", name: "카페 매니저 연진", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_042.png" },
  { id: "b6223b0b-444c-11ef-b707-0a8637d613d3", name: "카페 매니저 인혁", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_044.png" },
  { id: "b6293581-444c-11ef-b707-0a8637d613d3", name: "안내데스크 브랜든", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_045.png" },
  { id: "b62b7fea-444c-11ef-b707-0a8637d613d3", name: "안내데스크 소피아", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_046.png" },
  { id: "b62e6acb-444c-11ef-b707-0a8637d613d3", name: "서 있는 아나운서 에밀리", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_047.png" },
  { id: "b630c9f9-444c-11ef-b707-0a8637d613d3", name: "앉아 있는 아나운서 에밀리", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_048.png" },
  { id: "b6331ca9-444c-11ef-b707-0a8637d613d3", name: "서 있는 아나운서 데이비드", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_049.png" },
  { id: "b6357978-444c-11ef-b707-0a8637d613d3", name: "앉아 있는 아나운서 데이비드", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_050.png" },
  { id: "87a0ab12-0090-11ef-8ee1-0abbf354c5cc", name: "대학생 혜나 실외", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_001.png" },
  { id: "a53e7088-0090-11ef-8ee1-0abbf354c5cc", name: "대학생 혜나 실내", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_002.png" },
  { id: "a5485975-0090-11ef-8ee1-0abbf354c5cc", name: "대학생 태준 실외", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_003.png" },
  { id: "a5527add-0090-11ef-8ee1-0abbf354c5cc", name: "대학생 태준 실내", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_004.png" },
  { id: "a55bf757-0090-11ef-8ee1-0abbf354c5cc", name: "대학생 엘라", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_005.png" },
  { id: "a56767cb-0090-11ef-8ee1-0abbf354c5cc", name: "중고등 선생님 하은", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_006.png" },
  { id: "a5731c53-0090-11ef-8ee1-0abbf354c5cc", name: "영어 선생님 브라이언", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_007.png" },
  { id: "a57d4b8e-0090-11ef-8ee1-0abbf354c5cc", name: "중고등 선생님 지호", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_008.png" },
  { id: "a588091f-0090-11ef-8ee1-0abbf354c5cc", name: "중고등 선생님 제시카", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_009.png" },
  { id: "a591b271-0090-11ef-8ee1-0abbf354c5cc", name: "고객센터 상담사 주원", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_010.png" },
  { id: "a59d2321-0090-11ef-8ee1-0abbf354c5cc", name: "대학교수 정호", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_011.png" },
  { id: "a5a7e3d2-0090-11ef-8ee1-0abbf354c5cc", name: "고객센터 상담사 지민", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_012.png" },
  { id: "a5b25281-0090-11ef-8ee1-0abbf354c5cc", name: "여행 가이드 제임스", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_013.png" },
  { id: "a5bbf141-0090-11ef-8ee1-0abbf354c5cc", name: "보험설계사 준수", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_014.png" },
  { id: "a5c6df24-0090-11ef-8ee1-0abbf354c5cc", name: "안내데스크 직원 서현", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_015.png" },
  { id: "a5d15d0b-0090-11ef-8ee1-0abbf354c5cc", name: "애널리스트 영진", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_016.png" },
  { id: "a5de0514-0090-11ef-8ee1-0abbf354c5cc", name: "스타트업 마케터 클레나", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_017.png" },
  { id: "a5e9b1d9-0090-11ef-8ee1-0abbf354c5cc", name: "화이트해커 스모그", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_018.png" },
  { id: "a5f39c2c-0090-11ef-8ee1-0abbf354c5cc", name: "점술가 마고트", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_019.png" },
  { id: "a5fe629d-0090-11ef-8ee1-0abbf354c5cc", name: "관광 가이드 한나", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_020.png" },
  { id: "a60856bd-0090-11ef-8ee1-0abbf354c5cc", name: "한식 홍보대사 수연", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_021.png" },
  { id: "a6124155-0090-11ef-8ee1-0abbf354c5cc", name: "영어 선생님 수지", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/sdk.klleon.io/klleon_studio/Thumbnail_Img_022.png" },
];
