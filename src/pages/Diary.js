import React, { useState, useEffect, useRef } from 'react';
import './Diary.css'; // CSS 파일 추가
import imgBook from "../images/img_book.png";
import imgSample from "../images/img_sample.png";
import imgDoctor from "../images/img_doctor.png";
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [modalPosition, setModalPosition] = useState({ top: 100, left: 100 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setModalPosition({
                    top: e.clientY - offset.y,
                    left: e.clientX - offset.x,
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - modalRef.current.getBoundingClientRect().left,
            y: e.clientY - modalRef.current.getBoundingClientRect().top,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}
                ref={modalRef} 
                style={{ top: modalPosition.top, left: modalPosition.left, position: 'absolute' }} // 위치 설정
                onMouseDown={handleMouseDown} // 드래그 기능 추가
            >
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Diary = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        handleOpenModal();
    }, []);

    return (
        <div className="container">
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalWidth={modalWidth}>
                    <div className='modal-content-wrapper'>
                    <div className="diary-all">
                    <img src={imgBook} alt="book" className="image-book" />
                        <div className="header">
                            <div className="date">2024.10.22.화</div>
                            <div className='weather-emotion'>
                                <div className="weather">날씨: 맑음</div>
                                <div className="emotion">기분: 행복</div>
                            </div>
                        </div>
                        <img src={imgSample} alt="upload" className="image-sample" />
                        <div className="analysis-content">분석된 일기 내용...
                        </div>
                        <div className="hashtags">
                            <span className="hashtag1" style={{ backgroundColor: '#FCC3CC' }}># 달리기</span>
                            <span className="hashtag2" style={{ backgroundColor: '#DBBEFC' }}># 달리기</span>
                            <span className="hashtag3" style={{ backgroundColor: '#52ACFF' }}># 달리기</span>
                        </div>
                    </div>
                        <div className="feedback-all">
                            <img src={imgDoctor} alt="doctor" className="image-doctor" />
                            <div className="feedback-message">심리 상담 피드백!</div>
                        </div>
                    </div>
                    <div className="diary-button-container">
                        <Button text={"심리 상담"} onClick={handleExpandModal}/>
                        <Button text={"수 정"} />
                        <Button text={"닫 기"} type={"light"} onClick={handleCloseModal} />
                    </div>
                </Modal>
                <CalendarHeader />
                <CalendarBackground />
        </div>
    );
};

export default Diary;