import React, { useState } from 'react';
import './Diary.css'; // CSS 파일 추가
import imgBook from "../images/img_book.png";
import imgFile from "../images/img_file.png";
import imgDoctor from "../images/img_doctor.png";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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

    return (
        <div className="container">
            <button className="view-button" onClick={handleOpenModal}>일기 보기</button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <div className="diary-all">
                        <div className="header">
                            <img src={imgBook} alt="book" className="image-book" />
                            <div className="date">2024.10.22.화</div>
                            <div className='weather-emotion'></div>
                            <div className="weather">날씨: 맑음</div>
                            <div className="emotion">기분: 행복</div>
                        </div>
                        <img src={imgFile} alt="upload" className="image-upload" />
                        <div className="analysis-content">분석된 일기 내용...
                        lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
                                lskdjflksjdlkfjsldkjfksdjflksdjlfkjsdlkfjlskdjflksjdlfkjs
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
                        <div className="button-container">
                            <button className="counsel-button">심리 상담</button>
                            <button className="edit-button">수 정</button>
                            <button className="close-button" onClick={handleCloseModal}>닫 기</button>
                        </div>
                </Modal>
            
        </div>
    );
};

export default Diary;