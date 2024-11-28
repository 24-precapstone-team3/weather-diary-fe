import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './New.css';
import imgPencil from "../images/img_pencil.png";
import imgFile from "../images/img_file.png";
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import CalendarBackground from '../components/calendar/CalendarBackground';
import CalendarHeader from '../components/calendar/CalendarHeader';
import { DiaryDispatchContext } from '../contexts/DiaryContext';
import Swal from 'sweetalert2';
import Loading from '../components/common/Loading';
import { getFormattedDate, uploadPhoto } from '../utils';

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
    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date || null;

    useEffect(() => {
        if (!date) {
            Swal.fire({
                title: "일기 작성 오류",
                text: "유효하지 않은 날짜입니다",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
                willClose: () => {
                    navigate("/", { replace: true });
                }
            });
            return;
        }

        // 일기 작성 모달 열기
        setIsOpen(true);
    }, [date]);

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

    // 일기 및 사진 저장 로직
    const handleSave = async () => {
        console.log('일기 내용: ', entry);
        console.log('업로드된 파일: ', file);
        
        // 반환값(새로운 일기 객체) 활용을 위해 await 사용
        try {
            const newDiary = await onCreate(entry, getFormattedDate(date), "seoul");

            if (file) {
                uploadPhoto(file, newDiary.diary_id);
            }

            return newDiary;
        } catch (error) {
            console.log(error);
            // 임시 데이터 반환
            return {
                diary_id: "temp",
                content: `일기 저장 오류\n${entry}`,
                date: getFormattedDate(date),
                city: "seoul"
            };
        }
    };

    // 일기분석 버튼 클릭
    const handleAnalyze = async () => {
        // 일기 본문을 작성하지 않은 경우
        if (entry.trim() === '') {
            Swal.fire({
                title: "일기 작성",
                text: "일기를 작성하지 않으셨습니다",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            return;
        }

        try {
            const newDiary = await handleSave();
            console.log(newDiary);
            navigate('/analysis', { state: { newDiary } }); // 일기 분석 페이지로 이동
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "오류",
                text: "일기 저장 중 오류가 발생했습니다",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
        }
    };

    const handleClosePopup = () => {
        if (entry.trim() !== '' || file) {
            // 작성창에 텍스트가 있거나 선택된 사진이 있을 때
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
        } else {
            // 작성창에 텍스트가 없을 때
            navigate("/"); // 바로 calendar.js로 이동
        }
    };

    if (!date) {
        return <Loading />
    } else {
        return (
            <div className="new-container">
                {/* 모달 창 */}
                <Modal isOpen={isOpen} onClose={handleClosePopup} >
                    <PageTransition>
                        <div className="new-all">
                            <div className="new-header">
                                <img src={imgPencil} alt="Pencil" className="image-pencil" />
                                <div className="date_wrapper">
                                    {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.`}
                                    <span>{["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}</span>
                                </div>
                            </div>
                            <textarea 
                                value={entry} 
                                onChange={handleEntryChange} 
                                className="new-textarea" 
                                placeholder="일기를 작성하세요..."
                            />
                            {/* 이미지 미리보기 */}
                            {filePreview && (
                                    <img src={filePreview} alt="File Preview" className="file-preview" />
                            )}
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
                            </label>
                        </div>
            
                        <div className="new-button-container"> 
                            <Button text={"일기분석"} onClick={handleAnalyze} /> 
                            <Button text={"닫  기"} type={"light"} onClick={handleClosePopup} />
                        </div>
                    </PageTransition>
                </Modal>
                <CalendarHeader />
                <CalendarBackground />
            </div>
        );
    }
};

export default New;