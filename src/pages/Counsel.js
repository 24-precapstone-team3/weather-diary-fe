import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; //useHistory 훅 추가
import './Counsel.css'; // 스타일 파일 import
import imgDoctor from "../images/img_doctor.png";
import Button from '../components/common/Button';
import Swal from 'sweetalert2';
import PageTransition from '../components/common/PageTransition';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';
import { DiaryStateContext } from '../contexts/DiaryContext';
import { provideCounsel, saveCounsel } from '../utils';
import Loading from '../components/common/Loading';


// 모달 컴포넌트 정의
const Modal = ({ isOpen, children }) => {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - modalRef.current.getBoundingClientRect().left,
            y: e.clientY - modalRef.current.getBoundingClientRect().top,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const modalElem = modalRef.current;
        modalElem.style.position = 'absolute';
        modalElem.style.left = `${e.clientX - offset.x}px`;
        modalElem.style.top = `${e.clientY - offset.y}px`;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (!isOpen) return null; // 모달이 열리지 않은 경우 null 반환

    // 마우스 이벤트를 document에 추가하여 모달 밖에서도 드래그 가능하게 설정
    return (
        <div
            className="modal-overlay"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="modal-content"
                ref={modalRef}
                onMouseDown={handleMouseDown}
            >
                {children}
            </div>
        </div>
    );
};

const Counsel = () => {
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const [isCounseling, setIsCounseling] = useState(true); // 상담 진행 상태
    const [displayText, setDisplayText] = useState(''); // 표시할 텍스트
    const [counselFeedback, setCounselFeedback] = useState(''); // 심리 상담 피드백 메시지
    const [displayFeedback, setdisplayFeedback] = useState(''); // 표시할 심리 상담 피드백
    const fullText = "심리 상담 피드백!"; // 전체 텍스트
    const navigate = useNavigate();
    const location = useLocation();
    const newDiary = location.state?.newDiary || null;
    const entry = newDiary?.content || ""; // 일기 작성 화면에서 넘어온 일기 텍스트

    // 전달된 일기 심리 상담 진행, 완료 시 모달 열기
    useEffect(() => {
        const performCounsel = async () => {
            if (!newDiary) {
                Swal.fire({
                    title: "심리 상담 오류",
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
                const feedback = await provideCounsel(entry);
                setCounselFeedback(feedback.counseling);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "심리 상담 오류",
                    text: "심리 상담 중 오류가 발생했습니다",
                    icon: "error",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline'
                    },
                    willClose: () => navigate("/", { replace: true })
                });
            } finally {
                setIsCounseling(false);
                setIsOpen(true);
            }
        }

        performCounsel();
    }, [newDiary]);

    useEffect(() => {
        if (isOpen) {
            const displayTextSequentially = async () => {
                for (const char of fullText) {
                    setDisplayText((prev) => prev + char);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }

                await new Promise((resolve) => setTimeout(resolve, 500));

                for (const char of counselFeedback) {
                    setdisplayFeedback((prev) => prev + char);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }
            };
    
            displayTextSequentially();
    
            return () => {
                setDisplayText('');
                setdisplayFeedback('');
            };
        }
    }, [isOpen, fullText, counselFeedback]);
    

    // 저장 핸들러
    const handleSave = () => {
        saveCounsel(newDiary.diary_id, counselFeedback);

        Swal.fire({
            title: "심리 상담 저장",
            text: "저장되었습니다!",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: 'no-focus-outline'
            },
            willClose: () => {
                navigate("/", { replace: true });
            }
        });
    };

    // 모달 닫기 핸들러
    const handleClosePopup = async () => {
        const result = await Swal.fire({
            title: "심리 상담 저장 안됨",
            text: "저장하기 않고 닫으시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "닫기",
            cancelButtonText: "취소",
            customClass: {
                confirmButton: 'no-focus-outline',
                closeButton: 'no-focus-outline',
            },
        })
        
        if (result.isConfirmed) {
            navigate("/");
        } else {
            setIsOpen(true);
        }
    }

    if (!newDiary || isCounseling) {
        return <Loading />
    } else {
        return (
            <div className="counsel-container">
                {/* 모달 창 */}
                <Modal isOpen={isOpen} onClose={handleClosePopup}>
                    <PageTransition>
                    <div className="counsel-all">
                        <div className="counsel-header">
                            <img src={imgDoctor} alt="Doctor" className="image-doctor" />
                        </div>
                        <div className="feedback-message">
                            <p className="text">{displayText}</p>
                            <p className="feedback">{displayFeedback}</p>
                        </div>
                    </div>
                    <div className="counsel-button-container">
                        <Button text={"저 장"} onClick={handleSave} />
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

export default Counsel;