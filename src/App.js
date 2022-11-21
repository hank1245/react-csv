import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import image from "./assets/pinpoint.png";
import "./App.css";
import styled from "styled-components";

export default function App() {
  function savePDF() {
    //저장 영역 div id
    html2canvas(document.querySelector("#pdfArea"), {
      logging: true, // 디버그 목적 로그
      //proxy: "html2canvasproxy.php",
      letterRendering: 1,
      allowTaint: false, // cross-origin allow
      useCORS: true, // CORS 사용한 서버로부터 이미지 로드할 것인지 여부
      scale: 10, // 기본 96dpi에서 해상도를 두 배로 증가
    }).then(function (canvas) {
      // 캔버스를 이미지로 변환
      var imgData = canvas.toDataURL("image/png");

      var imgWidth = 210; // 이미지 가로 길이(mm) / A4 기준 210mm
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var margin = 0; // 출력 페이지 여백설정a
      var doc = new jsPDF("p", "mm", "a4");
      var position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);

      // 파일 저장
      doc.save("filename.pdf");
    });
  }

  return (
    <div id="capture" className="App">
      <div id="pdfArea">
        <Container>
          <div className="title">
            <div>리프, 이렇게 사용해주세요</div>
            <div>SeedN</div>
          </div>
          <div className="content">
            <div className="contentName">
              <div>설치도면</div>
              <div className="margin">안내사항</div>
            </div>
            <hr />
            <div className="contentDetail">
              <div className="left">
                <img src={image} alt="사진" />
              </div>
              <div className="right">
                <div className="status">
                  <p>
                    에어컨 제어나 온습도 센서에 이상이 생기면 허브를 먼저
                    확인해주세요. <br />
                    허브 불빛 색상과 깜빡임은 다음 증상을 의미합니다.
                  </p>
                  <p className="case">
                    흰색 불빛이 깜빡일 경우 :{" "}
                    <span>
                      매장에서 사용 중인 공유기 문제입니다.
                      <br /> 공유기의 전원선을 뽑은 뒤 약 5초 후 다시
                      연결해주세요.
                    </span>
                  </p>
                  <p className="case">
                    빨간 불빛이 깜빡일 경우 :{" "}
                    <span>
                      매장 내에 설치된 센서 및 컨트롤러
                      <br />
                      유무를 확인해주세요. 리프 APP에서 &#91;내 정보&#93; &#62;
                      &#91;알림&#93; 선택 후 <br />
                      센서 및 컨트롤러 배터리 알림 메세지를 확인해주세요.
                    </span>
                  </p>
                </div>
                <div className="error">
                  <div className="error_title">장애 대처 방법</div>
                  <div>
                    <p className="question">Q:에어컨이 즉시 제어되지 않아요</p>
                    <p className="answer">
                      A: 컨트롤러의 배터리 수명과 안정성을 위해 2분마다 신호를
                      보내는 방식을 <br />
                      채택했어요. 최대 2분만 기다려주세요
                    </p>
                  </div>
                  <div>
                    <p className="question">
                      Q: 1시간마다 에어컨이 자꾸 꺼져요
                    </p>
                    <p className="answer">
                      A: 리프 앱에서 에어컨을 종료로 설정해 두면 1시간마다 종료
                      명령이 동기화
                      <br />
                      되므로, 꼭 앱을 통해서만 에어컨을 제어해주세요
                    </p>
                  </div>
                  <div>
                    <p className="question">
                      Q: 필터 청소 후, 에어컨이 제어되지 않아요.
                    </p>
                    <p className="answer">
                      A: 컨트롤러의 설치 위치와 방향이 처음과 달리 부착된 경우
                      에어컨이 제외되지
                      <br />
                      않을 수 있습니다.청소에 앞서 올바른 컨트롤러 부착을 위해
                      컨트롤러가 부착된 <br />
                      사진을 남겨주세요
                    </p>
                  </div>
                  <div>
                    <p className="question">
                      Q: 와이파이 이름 또는 비밀번호 변경 후, 연결이 안돼요.
                    </p>
                    <p className="answer">
                      A: 와이파이 정보가 변경된 경우, 허브가 와이파이에 연결할
                      수 없습니다.
                      <br />
                      이전 와이파이 정보와 동일하게 재변경 해주시면 해결됩니다.
                      <br />
                      문제가 해결되지 않았다면 언제든 문의주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer_left">
              <span className="call">고객센터: 평일 09:30 ~ 17:30</span>
              <span className="contact">
                문의 | 카카오톡 채널 : 리프 Green AIoT 전화: 02-6052-1507 메일 :
                cs@seedn.co.kr
              </span>
            </div>
            <div className="footer_right">
              더 궁금하신 사항은 다음 QR 코드에
              <br /> 접속해 확인해보세요.
            </div>
          </div>
        </Container>
      </div>
      <button type="button" onClick={savePDF}>
        PDF 다운
      </button>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 900px;
  color: white;
  font-size: 1.5rem;
  width: 1200px;
  border: 2px solid black;
  .title {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    background-color: white;
    color: black;
    width: 100%;
    height: 100%;
    .contentName {
      padding: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .margin {
        margin-right: 450px;
      }
    }
    hr {
      margin: 0;
    }
    .contentDetail {
      display: flex;
      height: 90%;
    }
    .left {
      height: 100%;
      border-right: 1px solid black;
      flex-basis: 55%;
      overflow: hidden;
      img {
        width: 650px;
        height: 650px;
      }
    }
    .right {
      p {
        margin-bottom: 15px;
      }
      padding: 20px;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      .status {
        font-weight: 800;
        .case {
          font-size: 0.9rem;
          span {
            font-weight: 500;
            font-size: 0.8rem;
          }
        }
      }
      .error {
        border-top: 2px solid black;
        padding-top: 20px;
        .error_title {
          font-size: 1.1rem;
          font-weight: 800;
        }
        .question {
          font-weight: 800;
        }
        .answer {
          font-size: 0.8rem;
        }
      }
    }
  }
  .footer {
    border-top: 2px solid black;
    height: 120px;
    padding: 25px;
    background-color: white;
    color: black;
    font-size: 0.9rem;
    justify-content: space-between;
    display: flex;
    .footer_left {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .call {
        font-size: 1.1rem;
        font-weight: 800;
      }
    }
    .footer_right {
      padding-top: 5px;
      margin-right: 100px;
    }
  }
`;
