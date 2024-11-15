import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //useHistory 훅 추가
import './Counsel.css'; // 스타일 파일 import
import imgDoctor from "../images/img_doctor.png";
import Button from '../components/common/Button';
import Swal from 'sweetalert2';
import PageTransition from '../components/common/PageTransition';
import { DiaryStateContext } from '../contexts/DiaryContext';


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
    const [displayText, setDisplayText] = useState(''); // 표시할 텍스트
    const fullText = '심리 상담 피드백!'; // 전체 텍스트
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(true); // 수정된 부분: 컴포넌트가 마운트될 때 모달을 자동으로 열기
    }, []);

    

    useEffect(() => {
        if (isOpen) {
            let index = 0;

            const displayNextCharacter = () => {
                if (index < fullText.length) {
                    setDisplayText((prev) => prev + fullText.charAt(index));
                    index++;
                    setTimeout(displayNextCharacter, 50);
                }
            };

            displayNextCharacter();

            return () => {
                setDisplayText('');
            };
        }
    }, [isOpen]);
    

    // 저장 핸들러
    const handleSave = () => {
        localStorage.setItem('feedbackText', displayText); // displayText를 로컬 스토리지에 저장
        Swal.fire({
            title: "심리 상담 저장",
            text: "저장되었습니다!",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: 'no-focus-outline'
            },
        });
    };

    // 모달 닫기 핸들러
    const handleClosePopup = () => {
        if (isSaved) {
            setIsOpen(false); // 저장된 경우 모달을 닫음
        } else {
            Swal.fire({
                title: "저장 안됨",
                text: "저장하기 않고 닫으시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "닫기",
                cancelButtonText: "이전",
                customClass: {
                    confirmButton: 'no-focus-outline',
                    closeButton: 'no-focus-outline',
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
        }
    };

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
                        <p>{displayText}</p> {/* 표시할 텍스트 */}
                    </div>
                </div>
                <div className="counsel-button-container">
                    <Button text={"저 장"} onClick={handleSave} />
                    <Button text={"닫 기"} type={"light"} onClick={handleClosePopup} />
                </div>
            </PageTransition>
            </Modal>
        </div>
    );
};

export default Counsel;