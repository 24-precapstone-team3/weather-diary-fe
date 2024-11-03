import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; //useHistory 훅 추가
import './New.css';
import imgPencil from "../images/img_pencil.png";
import imgFile from "../images/img_file.png";

const Modal = ({ isOpen, children, onClose }) => {
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

    if (!isOpen) return null;

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

const New = () => {
    const [entry, setEntry] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // 이미지 미리보기를 위한 상태 추가
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const navigate = useNavigate(); //useHistory 훅 사용

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // 이미지 미리보기 설정
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result); // 미리보기 URL 설정
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleEntryChange = (e) => {
        setEntry(e.target.value);
    };

    const handleSave = () => {
        console.log('일기 내용:', entry);
        console.log('업로드된 파일:', file);
        // 여기서 실제로 저장 로직 추가
    };

    const handleAnalyze = () => {
        handleSave(); // 저장 후 분석 기능 수행
        console.log('일기 분석 시작'); // 분석 로직 추가
        navigate('/Analize'); // 일기 분석 페이지로 이동
    };

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setFilePreview(null); // 팝업 닫을 때 미리보기 초기화
    };

    return (
        <div className="new-container">
            <button onClick={handleOpenPopup} className="date-button">날짜 선택</button>

            {/* 모달 창 */}
            <Modal isOpen={isOpen} onClose={handleClosePopup} >
                <div className="new-all">
                    <div className="new-header">
                        <img src={imgPencil} alt="Pencil" className="image-pencil" />
                        <span>2024.10.22. 화</span>
                    </div>
                    <textarea 
                        value={entry} 
                        onChange={handleEntryChange} 
                        className="new-textarea" 
                        placeholder="일기를 작성하세요..."
                    />
                    <label htmlFor="file-upload" className="upload-label">
                        <img src={imgFile} alt="Upload" className="image-file" /> 
                        Click to upload {/* 클릭 시 파일 선택 */}
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            className="file-input" 
                            id="file-upload"
                            style={{ display: 'none' }} // 숨김 처리
                        />
                        {/* 이미지 미리보기 */}
                        {filePreview && (
                            <img src={filePreview} alt="File Preview" className="file-preview" />
                        )}
                    </label>
                </div>
    
                <div className="button-container"> 
                    <button onClick={handleAnalyze} className="analysis-button">일기분석</button> 
                    <button onClick={handleClosePopup} className="close-button">닫  기</button>
                </div>
            </Modal>
        </div>
    );
};

export default New;