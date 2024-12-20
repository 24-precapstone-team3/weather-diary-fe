import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analysis.css'; // 스타일 파일 import
import imgAnalysis from "../images/img_analysis.png";
import Button from '../components/common/Button';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';
import PageTransition from '../components/common/PageTransition';
import Swal from 'sweetalert2';
import Hashtag from '../components/common/Hashtag';
import { TagDispatchContext } from '../contexts/TagContext';
import Loading from '../components/common/Loading';
import { analyzeDiary, processHashtags } from '../utils';

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

const Analysis = () => {
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const [isAnalyzing, setIsAnalyzing] = useState(true); // 분석 진행 상태
    const [displayedMessage, setDisplayedMessage] = useState(''); // 표시할 메시지
    const [hashtagMessage, setHashtagMessage] = useState(''); // 해시태그 메시지
    const [isHashtagsVisible, setIsHashtagsVisible] = useState(false); // 해시태그 출력 트리거
    const [generatedHashtags, setGeneratedHashtags] = useState([]); // 분석을 통해 생성된 해시태그
    const [displayedHashtags, setDisplayedHashtags] = useState([]); // 표시할 해시태그
    const [activeHashtags, setActiveHashtags] = useState([]); // 활성화된 해시태그 상태
    const { onCreateTag } = useContext(TagDispatchContext);
    const navigate = useNavigate();
    const location = useLocation();
    const newDiary = location.state?.newDiary || null;
    const entry = newDiary?.content || ""; // 일기 작성 화면에서 넘어온 일기 텍스트

    // 전달된 일기 분석 진행, 완료 시 모달 열기
    useEffect(() => {
        const performAnalysis = async () => {
            if (!newDiary) {
                Swal.fire({
                    title: "일기 분석 오류",
                    text: "일기가 존재하지 않습니다",
                    icon: "error",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline'
                    },
                    willClose: () => navigate("/", { replace: true })
                });
                return;
            }

            try {
                const { mood, hashTag } = await analyzeDiary(entry);
                const hashtagsArray = processHashtags(hashTag);
                setGeneratedHashtags(hashtagsArray);
                console.log("분석 결과:", { mood, hashTag });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "일기 분석 오류",
                    text: "일기 분석 중 오류가 발생했습니다",
                    icon: "error",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline'
                    },
                    willClose: () => navigate("/", { replace: true })
                });
            } finally {
                setIsAnalyzing(false); // 분석 완료
                setIsOpen(true); // 모달 열기
            }
        };

        performAnalysis(); 
    }, [newDiary]);

    useEffect(() => {
        const displayHashtags = async () => {
            // 생성된 해시태그 배열을 1개씩 표시
            for (const hashtag of generatedHashtags) {
                setDisplayedHashtags((prev) => [...prev, hashtag]);
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        };

        // 해시태그가 있을 때만 실행
        if (isHashtagsVisible && generatedHashtags.length > 0) {
            displayHashtags();
        }
    }, [isHashtagsVisible, generatedHashtags]);

    // 일기 내용 한 글자씩 표시
    useEffect(() => {
        if (typeof entry === "string") {
            const messageArray = entry.split("");
            let displayString = '';
            let index = 0;

            const showMessage = () => {
                if (index < messageArray.length) {
                    displayString += messageArray[index];
                    setDisplayedMessage(displayString);
                    index++;
                    setTimeout(showMessage, 50);
                } else {
                    // 모든 글자가 표시된 후 해시태그 메시지 표시
                    displayHashtagMessage();
                }
            };

            showMessage();
        } else {
            setDisplayedMessage("");
        }
    }, [entry]);

    // 해시태그 메시지 한 글자씩 표시
    const displayHashtagMessage = () =>{
        const message = "너의 일기를 분석한 키워드야. 저장하고 싶은 키워드를 최대 3개만 선택해줘.";
        const messageArray = message.split("");
        let displayString = "";
        let index = 0;

        const showHashtagMessage = () => {
            if (index < messageArray.length) {
                displayString += messageArray[index];
                setHashtagMessage(displayString);
                index++;
                setTimeout(showHashtagMessage, 50);
            } else {
                setIsHashtagsVisible(true);
            }
        };

        showHashtagMessage();
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

    const isActivedHashtagsExist = () => {
        if (activeHashtags <= 0) {
            Swal.fire({
                title: "해시태그 선택",
                text: "최소 1개를 선택해주세요",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            return false;
        } else {
            return true;
        }
    }

    // 해시태그 저장
    const handleSave = () => {
        console.log(activeHashtags);
        onCreateTag(activeHashtags, newDiary.diary_id);
    }

    // 저장 후 심리 상담 페이지로 이동
    const handleCounselClick = () => {
        if (!isActivedHashtagsExist()) {
            return;
        }
        handleSave();
        navigate("/counsel", { state: { newDiary } });
    };

    // 심리 상담을 하지 않고 태시태그만 저장
    const handleSaveOnly = async () => {
        if (!isActivedHashtagsExist()) {
            return;
        }
        
        const result = await Swal.fire({
            title: "심리 상담 미완료",
            text: "심리 상담을 하지 않고 저장할까요?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "저장",
            cancelButtonText: "취소",
            customClass: {
                confirmButton: 'no-focus-outline',
                closeButton: 'no-focus-outline'
            },
        })

        if (result.isConfirmed) {
            handleSave();
            Swal.fire({
                title: "일기 분석 저장",
                text: "저장되었습니다!",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
                willClose: () => navigate("/", { replace: true })
            });
        }
    }

    // 모달 닫기 핸들러
    const handleClosePopup = async () => {
        setIsOpen(false);
        const result = await Swal.fire({
            title: "해시태그 저장 안됨",
            text: "저장하기 않고 닫으시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "닫기",
            cancelButtonText: "취소",
            customClass: {
                confirmButton: 'no-focus-outline',
                closeButton: 'no-focus-outline'
            },
        })
        
        if (result.isConfirmed) {
            navigate("/");
        } else {
            setIsOpen(true);
        }

    };

    if (!newDiary || isAnalyzing) {
        return <Loading />
    } else {
        return (
            <div className="analysis-container">
                {/* 모달 창 */}
                <Modal isOpen={isOpen} onClose={handleClosePopup}>
                <PageTransition>
                <img src={imgAnalysis} alt="Analysis" className="image-analysis" />
                    <div className="analysis-all">
                        <div className="analysis-message">
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
                    <div className="analysis-button-container">
                        <Button text={"심리상담"} onClick={handleCounselClick} />
                        <Button text={"저 장"} onClick={handleSaveOnly} />
                        <Button text={"닫 기"} type={"light"} onClick={handleClosePopup} />
                    </div>
                    </PageTransition>
                </Modal>
                <CalendarHeader />
                <CalendarBackground />
            </div>
        );
    }
};

export default Analysis;