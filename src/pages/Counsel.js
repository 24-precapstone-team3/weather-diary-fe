import React, { useState, useEffect } from 'react';
import './Counsel.css'; // 스타일 파일 import
import imgDoctor from "../images/img_doctor.png";

// 모달 컴포넌트 정의
const Modal = ({ isOpen, children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ top: 100, left: 100 }); // 기본 위치 설정

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

    // 모달 열기 핸들러
    const handleOpenPopup = () => {
        setIsOpen(true);
        setDisplayText(''); // 모달 열 때 텍스트 초기화
    };

    // 모달 닫기 핸들러
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    // 글자 하나씩 표시하는 효과
    useEffect(() => {
        if (isOpen) {
            let index = 0;
            const interval = setInterval(() => {
                // 인덱스가 범위를 초과하지 않으면 글자를 추가
                if (index < fullText.length) {
                    setDisplayText((prev) => prev + fullText.charAt(index)); // charAt() 사용
                    index++; // 인덱스 증가
                } else {
                    clearInterval(interval); // 모든 글자를 표시한 후 정지
                }
            }, 50); // 글자가 나타나는 간격 (50ms로 설정)

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
        }
    }, [isOpen]);

    // 저장 핸들러
    const handleSave = () => {
        localStorage.setItem('feedbackText', displayText); // displayText를 로컬 스토리지에 저장
        alert('저장되었습니다!'); // 저장 완료 알림
    };

    return (
        <div className="counsel-container">
            <button onClick={handleOpenPopup} className="feedback-button">피드백 보기</button>

            {/* 모달 창 */}
            <Modal isOpen={isOpen} onClose={handleClosePopup}>
                <div className="counsel-all">
                    <div className="counsel-header">
                        <img src={imgDoctor} alt="Doctor" className="image-doctor" />
                    </div>
                    <div className="feedback-message">
                        <p>{displayText}</p> {/* 표시할 텍스트 */}
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={handleSave} className="save-button">저 장</button>
                    <button onClick={handleClosePopup} className="close-button">닫 기</button>
                </div>
            </Modal>
        </div>
    );
};

export default Counsel;