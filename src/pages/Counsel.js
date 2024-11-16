import React, { useState, useEffect } from 'react';
import './Counsel.css'; // 스타일 파일 import
import imgDoctor from "../images/img_doctor.png";
import Button from '../components/common/Button';
import Swal from 'sweetalert2';
import PageTransition from '../components/common/PageTransition';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';

// 모달 컴포넌트 정의
const Modal = ({ isOpen, children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ top: 100, left: 550 }); // 기본 위치 설정

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                left: e.clientX - offset.x,
                top: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // 마우스 이벤트를 document에 추가하여 모달 밖에서도 드래그 가능하게 설정
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (!isOpen) return null; // 모달이 열리지 않은 경우 null 반환

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{ top: position.top, left: position.left, position: 'absolute' }}
                onMouseDown={handleMouseDown}
            >
                {children} {/* 모달 안의 내용 */}
            </div>
        </div>
    );
};

const Counsel = () => {
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const [displayText, setDisplayText] = useState(''); // 표시할 텍스트
    const fullText = '심리 상담 피드백!'; // 전체 텍스트

    useEffect(() => {
        setIsOpen(true); // 수정된 부분: 컴포넌트가 마운트될 때 모달을 자동으로 열기
    }, []);

    // 모달 닫기 핸들러
    const handleClosePopup = () => {
        setIsOpen(false);
    };

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
            <CalendarHeader />
            <CalendarBackground />
        </div>
    );
};

export default Counsel;