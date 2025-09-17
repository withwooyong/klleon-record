import { useEffect, useRef, useState, CSSProperties } from "react";
import { SDK_KEY, AVATAR_LIST, AvatarInfo } from "./constants";
import "./custom.css";

// 타입 정의
type Status = "VIDEO_CAN_PLAY" | "VIDEO_LOADING" | "VIDEO_ERROR" | "CHAT_READY" | "CHAT_ERROR";

interface ChatData {
  chat_type: string;
  message: string;
  timestamp: number;
  [key: string]: any;
}

// KlleonChat SDK 타입 정의
interface KlleonChatSDK {
  init: (config: { sdk_key: string; avatar_id: string; log_level?: string }) => Promise<void>;
  onStatusEvent: (callback: (status: Status) => void) => void;
  onChatEvent: (callback: (chatData: ChatData) => void) => void;
  echo: (text: string) => void;
  destroy: () => void;
}

// Window 객체에 KlleonChat 추가
declare global {
  interface Window {
    KlleonChat: KlleonChatSDK;
  }

  // HTMLVideoElement에 captureStream 메서드 추가
  interface HTMLVideoElement {
    captureStream?: () => MediaStream;
    mozCaptureStream?: () => MediaStream;
  }
}

interface AvatarProps {
  videoStyle?: CSSProperties;
  volume?: number;
}

interface ChatProps {
  delay?: number;
  type?: "voice" | "text";
  isShowCount?: boolean;
}

function App() {
  const [echoText, setEchoText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sdkError, setSdkError] = useState("");
  const [avatarStatus, setAvatarStatus] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarInfo | null>(null);
  const [showAvatarSelection, setShowAvatarSelection] = useState(true);
  const [avatarSize, setAvatarSize] = useState<"pc" | "mobile" | "tablet">("pc");

  const avatarContainerRef = useRef<HTMLElement & AvatarProps>(null);
  const chatContainerRef = useRef<HTMLElement & ChatProps>(null);

  useEffect(() => {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.videoStyle = {
        borderRadius: "24px",
        objectFit: "cover",
        width: "100%",
        height: "100%",
      };
      avatarContainerRef.current.volume = 100;
      console.log("Avatar container ref 설정됨:", avatarContainerRef.current);
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.delay = 10;
      chatContainerRef.current.type = "text";
      chatContainerRef.current.isShowCount = true;
      console.log("Chat container ref 설정됨:", chatContainerRef.current);
    }

    // 컴포넌트 언마운트 시 SDK 정리
    return () => {
      if (window.KlleonChat) {
        try {
          window.KlleonChat.destroy();
          console.log("컴포넌트 언마운트 시 SDK 정리 완료");
        } catch (error) {
          console.error("컴포넌트 언마운트 시 SDK 정리 중 오류:", error);
        }
      }
    };
  }, []);

  const handleAvatarSelect = (avatar: AvatarInfo) => {
    setSelectedAvatar(avatar);
    setShowAvatarSelection(false);
    startChat(avatar);
  };

  const startChat = async (avatar: AvatarInfo) => {
    // 이전 SDK 인스턴스가 있다면 정리
    if (window.KlleonChat) {
      try {
        window.KlleonChat.destroy();
        console.log("이전 SDK 인스턴스 정리 완료");
      } catch (error) {
        console.error("이전 SDK 정리 중 오류:", error);
      }
    }

    setSdkError("");
    setIsLoading(true);
    setAvatarStatus("SDK 초기화 중...");

    // SDK 로드 상태 확인
    if (!window.KlleonChat) {
      const errorMsg = "KlleonChat SDK가 로드되지 않았습니다. 페이지를 새로고침해주세요.";
      console.error(errorMsg);
      setSdkError(errorMsg);
      setIsLoading(false);
      setAvatarStatus("SDK 로드 실패");
      return;
    }

    // React가 리렌더링을 완료할 때까지 잠시 대기
    setTimeout(async () => {
      // 컨테이너 요소들이 DOM에 존재하는지 확인
      const avatarElement = document.querySelector("avatar-container");
      const chatElement = document.querySelector("chat-container");

      console.log("컨테이너 요소 검색 결과:", {
        avatarElement,
        chatElement,
        avatarContainerRef: avatarContainerRef.current,
        chatContainerRef: chatContainerRef.current,
      });

      if (!avatarElement) {
        const errorMsg = "Avatar container 요소를 찾을 수 없습니다.";
        console.error(errorMsg);
        setSdkError(errorMsg);
        setIsLoading(false);
        setAvatarStatus("컨테이너 없음");
        return;
      }

      if (!chatElement) {
        const errorMsg = "Chat container 요소를 찾을 수 없습니다.";
        console.error(errorMsg);
        setSdkError(errorMsg);
        setIsLoading(false);
        setAvatarStatus("채팅 컨테이너 없음");
        return;
      }

      const KlleonChat = window.KlleonChat;
      console.log("SDK 로드 확인됨. 초기화를 시도합니다...");
      console.log("초기화 설정:", {
        sdk_key: SDK_KEY,
        avatar_id: avatar.id,
        log_level: "debug",
      });

      try {
        // 이벤트 리스너 등록
        KlleonChat.onStatusEvent((status: Status) => {
          console.log(`SDK Status Event: ${status}`);
          setIsLoading(status !== "VIDEO_CAN_PLAY");
          setAvatarStatus(`상태: ${status}`);

          if (status === "VIDEO_CAN_PLAY") {
            console.log("아바타 비디오 재생 준비 완료!");
            setAvatarStatus("아바타 준비 완료");

            // 아바타 컨테이너 내부 요소 확인
            setTimeout(() => {
              const avatarContainer = document.querySelector("avatar-container") as HTMLElement;
              if (avatarContainer) {
                console.log("아바타 컨테이너 내부 요소들:", avatarContainer.children);
                console.log("아바타 컨테이너 스타일:", {
                  width: avatarContainer.style.width,
                  height: avatarContainer.style.height,
                  display: avatarContainer.style.display,
                  position: avatarContainer.style.position,
                });

                // 비디오 요소 확인
                const videoElement = avatarContainer.querySelector("video");
                if (videoElement) {
                  console.log("비디오 요소 확인됨:", videoElement);
                } else {
                  console.log("비디오 요소를 아직 찾을 수 없습니다.");
                }
              }
            }, 1000);
          } else if (status === "VIDEO_ERROR") {
            console.error("아바타 비디오 오류 발생!");
            setSdkError("아바타 비디오 로드 중 오류가 발생했습니다.");
            setAvatarStatus("비디오 오류");
          } else if (status === "VIDEO_LOADING") {
            setAvatarStatus("비디오 로딩 중...");
          }
        });

        KlleonChat.onChatEvent((chatData: ChatData) => {
          console.log("SDK Chat Event:", chatData);
        });

        // SDK 초기화
        await KlleonChat.init({
          sdk_key: SDK_KEY,
          avatar_id: avatar.id,
          log_level: "debug",
        });
        console.log("SDK 초기화 성공!");
        setAvatarStatus("SDK 초기화 완료");
      } catch (error) {
        const errorMsg = `SDK 초기화 실패: ${(error as Error).message || error}`;
        console.error(errorMsg);
        setSdkError(errorMsg);
        setIsLoading(false);
        setAvatarStatus("초기화 실패");
      }
    }, 100); // 100ms 대기
  };

  const handleEcho = () => {
    if (!window.KlleonChat) {
      console.error("KlleonChat SDK가 로드되지 않았습니다.");
      return;
    }
    if (echoText.trim() === "") {
      return; // 빈 텍스트는 전송하지 않음
    }
    window.KlleonChat.echo(echoText);
    setEchoText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터키 동작 방지
      handleEcho();
    }
  };

  const resetSelection = () => {
    // SDK 정리
    if (window.KlleonChat) {
      try {
        window.KlleonChat.destroy();
        console.log("SDK 정리 완료");
      } catch (error) {
        console.error("SDK 정리 중 오류:", error);
      }
    }

    // 모든 상태 초기화
    setSelectedAvatar(null);
    setShowAvatarSelection(true);
    setIsLoading(false);
    setSdkError("");
    setAvatarStatus("");
    setEchoText("");
    setAvatarSize("pc");

    // DOM 요소 직접 초기화
    const avatarElement = document.querySelector("avatar-container");
    const chatElement = document.querySelector("chat-container");

    if (avatarElement) {
      avatarElement.innerHTML = "";
      console.log("아바타 컨테이너 초기화 완료");
    }

    if (chatElement) {
      chatElement.innerHTML = "";
      console.log("채팅 컨테이너 초기화 완료");
    }

    // ref 초기화
    if (avatarContainerRef.current) {
      avatarContainerRef.current.innerHTML = "";
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.innerHTML = "";
    }

    // 추가적인 DOM 정리 (모바일 환경에서 확실한 초기화)
    setTimeout(() => {
      const allAvatarElements = document.querySelectorAll("avatar-container");
      const allChatElements = document.querySelectorAll("chat-container");

      allAvatarElements.forEach((element) => {
        element.innerHTML = "";
      });

      allChatElements.forEach((element) => {
        element.innerHTML = "";
      });

      console.log("추가 DOM 정리 완료");
    }, 100);

    console.log("아바타 선택 화면으로 돌아갑니다.");
  };

  if (showAvatarSelection) {
    return (
      <div className="avatar-selection" style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>아바타를 선택해주세요</h1>
        <div
          className="avatar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
          {AVATAR_LIST.map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-card"
              onClick={() => handleAvatarSelect(avatar)}
              style={{
                cursor: "pointer",
                border: "2px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                backgroundColor: "white",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                aspectRatio: "1/1",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#007bff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}>
              <div
                className="avatar-image"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                  marginBottom: "10px",
                  minHeight: "120px",
                }}>
                <img
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.backgroundColor = "#f0f0f0";
                    target.style.display = "flex";
                    target.style.alignItems = "center";
                    target.style.justifyContent = "center";
                    target.style.fontSize = "12px";
                    target.style.color = "#666";
                    target.textContent = "이미지 로드 실패";
                  }}
                />
              </div>
              <h3 style={{ margin: "0", fontSize: "13px", color: "#333", lineHeight: "1.3", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "500" }}>{avatar.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="base-react-example-page">
      <div
        className="header-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          flexWrap: "wrap",
          gap: "10px",
        }}>
        <div className="header-info">
          <h2 style={{ margin: "0", color: "#333", fontSize: "18px" }}>선택된 아바타: {selectedAvatar?.name}</h2>
        </div>
        <div className="header-controls" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <div className="avatar-size-selector" style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#666", marginRight: "5px" }}>크기:</span>
            <button
              onClick={() => setAvatarSize("pc")}
              className={`size-btn ${avatarSize === "pc" ? "active" : ""}`}
              style={{
                padding: "4px 8px",
                backgroundColor: avatarSize === "pc" ? "#007bff" : "#f8f9fa",
                color: avatarSize === "pc" ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s",
              }}>
              PC
            </button>
            <button
              onClick={() => setAvatarSize("tablet")}
              className={`size-btn ${avatarSize === "tablet" ? "active" : ""}`}
              style={{
                padding: "4px 8px",
                backgroundColor: avatarSize === "tablet" ? "#007bff" : "#f8f9fa",
                color: avatarSize === "tablet" ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s",
              }}>
              Tablet
            </button>
            <button
              onClick={() => setAvatarSize("mobile")}
              className={`size-btn ${avatarSize === "mobile" ? "active" : ""}`}
              style={{
                padding: "4px 8px",
                backgroundColor: avatarSize === "mobile" ? "#007bff" : "#f8f9fa",
                color: avatarSize === "mobile" ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s",
              }}>
              Mobile
            </button>
          </div>
          <button
            onClick={resetSelection}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}>
            아바타 다시 선택
          </button>
        </div>
      </div>

      {sdkError && (
        <div style={{ color: "red", padding: "10px", backgroundColor: "#ffe6e6", margin: "10px", borderRadius: "5px" }}>
          <strong>오류:</strong> {sdkError}
        </div>
      )}

      <div className="sdk-container">
        <div className={`avatar-container avatar-size-${avatarSize}`} style={{ flex: 1 }}>
          {isLoading && <span className="loading-text">Klleon Avatar Loading...</span>}
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{avatarStatus}</div>
          {/* @ts-ignore - 커스텀 요소 사용 */}
          <avatar-container ref={avatarContainerRef} class="avatar-container" />
        </div>

        <div className="chat-control-container">
          {/* @ts-ignore - 커스텀 요소 사용 */}
          <chat-container ref={chatContainerRef} class="chat-container" />
          <div className="chat-echo-container">
            <textarea
              value={echoText}
              onChange={(e) => setEchoText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력해 주세요"
              disabled={isLoading}
              className="echo-input"
              rows={3}
              style={{
                resize: "vertical",
                minHeight: "50px",
                maxHeight: "120px",
              }}
            />
            <button onClick={handleEcho} disabled={isLoading} className="echo-button">
              echo 전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
