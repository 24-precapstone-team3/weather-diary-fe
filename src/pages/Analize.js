import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analize.css'; // 스타일 파일 import
import imgAnalysis from "../images/img_analysis.png";
import Button from '../components/common/Button';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';
import PageTransition from '../components/common/PageTransition';
import Swal from 'sweetalert2';
import { DiaryStateContext } from "../contexts/DiaryContext";

// 해시태그 컴포넌트 정의
const Hashtag = ({ isActive, onClick, text }) => {
    return (
        <div
            className={`Hashtag ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

// 모달 컴포넌트 정의
const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null); // 모달 DOM 요소를 참조하기 위한 ref
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // 드래그할 때의 오프셋

    const handleMouseDown = (e) => {
        setIsDragging(true); // 드래그 시작
        setOffset({
            x: e.clientX - modalRef.current.getBoundingClientRect().left, // 현재 마우스 위치와 모달 위치의 차이 계산
            y: e.clientY - modalRef.current.getBoundingClientRect().top,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // 드래그 중이 아닐 때는 아무 작업도 하지 않음
        const modalElem = modalRef.current;
        modalElem.style.position = 'absolute'; // 절대 위치로 설정
        modalElem.style.left = `${e.clientX - offset.x}px`; // 새로운 위치 계산
        modalElem.style.top = `${e.clientY - offset.y}px`;
    };

    const handleMouseUp = () => {
        setIsDragging(false); // 드래그 종료
    };

    // 마우스 이동 및 버튼 떼기 이벤트를 window에 추가
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove); // 마우스 이동 시 위치 업데이트
        window.addEventListener('mouseup', handleMouseUp); // 마우스 버튼 떼기 시 드래그 종료
        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // 컴포넌트 언마운트 시 이벤트 리스너 정리
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]); // isDragging 변화에 따라 최신 상태 반영

    if (!isOpen) return null; // 모달이 열리지 않은 경우 null 반환

    return (
        <div className="modal-overlay">
            <div className="modal-content"
             ref={modalRef}
             onMouseDown={handleMouseDown}
             >
                {children} {/* 모달 안의 내용 */}
            </div>
        </div>
    );
};

const Analize = () => {
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const [activeHashtags, setActiveHashtags] = useState([]); // 활성화된 해시태그 상태
    const [displayedMessage, setDisplayedMessage] = useState(''); // 표시할 메시지
    const [displayedHashtags, setDisplayedHashtags] = useState([]); // 표시할 해시태그
    const [hashtagMessage, setHashtagMessage] = useState(''); // 해시태그 메시지
    const navigate = useNavigate(); //useHistory 훅 사용
    const location = useLocation(); // 전달된 데이터 가져오기
    const {entry, hashtags} = useContext(DiaryStateContext);


    // 컴포넌트 마운트 시 모달 열기
    useEffect(() => {
        setIsOpen(true); // 컴포넌트가 마운트될 때 모달을 열도록 설정
    }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행되도록 함

    // 한 글자씩 표시하기 위한 함수
    useEffect(() => {
        if(typeof entry === 'string'){
            const messageArray = entry.split(''); // 일기 내용을 한 글자씩 나누기
            let displayString = '';
            let index = 0;

            const showMessage = () => {
                if (index < messageArray.length) {
                    displayString += messageArray[index];
                    setDisplayedMessage(displayString); // 이전 문자에 추가
                    index++;
                    setTimeout(showMessage, 50); // 100ms마다 다음 글자 추가
                } else {
                    // 모든 글자가 표시된 후 해시태그 메시지를 표시
                    displayHashtagMessage();
                }
            };

            showMessage();
        } else {
            setDisplayedMessage('');
        }
    }, [entry]);

    // 해시태그 메시지 한 글자씩 표시
    const displayHashtagMessage = () =>{
        const message = "너의 일기를 분석한 키워드야. 저장하고 싶은 키워드를 최대 3개만 선택해줘."; // 해시태그 메시지 내용
        const messageArray = message.split(''); // 메시지를 한 글자씩 나누기
        let displayString = '';
        let index = 0;

        const showHashtagMessage = () => {
            if (index < messageArray.length) {
                displayString += messageArray[index];
                setHashtagMessage(displayString);
                index++;
                setTimeout(showHashtagMessage, 50); // 50ms마다 다음 글자 추가
            } else {
                // 모든 해시태그 메시지가 표시된 후 해시태그를 표시
                displayHashtags();
            }
        };

        showHashtagMessage(); // 해시태그 메시지 표시 시작
    };
        

    // 해시태그를 한 글자씩 표시하는 함수
    const displayHashtags = async () => {
        const hashtagsList = hashtags || ['# 행복', '# 슬픔', '# 분노', '# 불안', '# 사랑', '# 평화']; // 해시태그 6개
        for (let i = 0; i < hashtagsList.length; i++) {
            setDisplayedHashtags((prev) => [...prev, hashtagsList[i]]);
            await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms 대기
        }
    };

    const handleSave = () => {
        localStorage.setItem('analizeText', displayedMessage); // displayText를 로컬 스토리지에 저장
        const hashtagsToSave = JSON.stringify(displayedHashtags);
        localStorage.setItem('savedHashtags', hashtagsToSave);
        Swal.fire({
            title: "일기 분석 저장",
            text: "저장되었습니다!",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: 'no-focus-outline'
            },
        });
    }

    // 모달 닫기 핸들러
    const handleClosePopup = () => {
        setIsOpen(false);
        Swal.fire({
            title: "저장 안됨",
            text: "저장하기 않고 닫으시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "닫기",
            cancelButtonText: "이전",
            customClass: {
                confirmButton: 'no-focus-outline',
                closeButton: 'no-focus-outline'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // "닫기" 버튼 클릭 시 calendar.js로 이동
                navigate('/');
            } else if (result.isDismissed) {
                // "이전" 버튼 클릭 시 현재 모달을 닫고 글쓰기 화면으로 돌아감
                setIsOpen(true); // 모달을 다시 열어줌
            }
        });

    };

    // 해시태그 클릭 핸들러
    const handleHashtagClick = (text) => {
        setActiveHashtags((prev) => {
            // 이미 선택된 해시태그가 있을 경우 제거
            if (prev.includes(text)) {
                return prev.filter((hashtag) => hashtag !== text);
            }
            // 최대 3개까지 선택 가능
            if (prev.length < 3) {
                return [...prev, text];
            }
            return prev; // 3개 이상은 추가하지 않음
        });
    };

    // 심리상담 버튼 클릭 핸들러
    const handleCounselClick = () => {
        navigate('/Counsel'); // Counsel.js로 이동
    };

    return (
        <div className="analyze-container">
            {/* 모달 창 */}
            <Modal isOpen={isOpen} onClose={handleClosePopup}>
            <PageTransition>
            <img src={imgAnalysis} alt="Analysis" className="image-analysis" />
                <div className="analyze-all">
                    <div className="analyze-message">
                        <p>{displayedMessage}</p>
                    </div>
                    <div className="hashtag-container">
                        <div className="hashtag-message">
                            <p>{hashtagMessage}</p>
                        </div>
                        {displayedHashtags.map((hashtag, index) => (
                            <Hashtag
                                key={index}
                                text={hashtag}
                                isActive={activeHashtags.includes(hashtag)}
                                onClick={() => handleHashtagClick(hashtag)}
                            />
                        ))}
                    </div>
                </div>
                <div className="analize-button-container">
                    <Button text={"심리상담"} onClick={handleCounselClick} />
                    <Button text={"저 장"} onClick={handleSave} />
                    <Button text={"닫 기"} type={"light"} onClick={handleClosePopup} />
                </div>
                </PageTransition>
            </Modal>
            <CalendarHeader />
            <CalendarBackground />
        </div>
    );
};

export default Analize;