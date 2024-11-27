import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Diary.css'; // CSS 파일 추가
import imgBook from "../images/img_book.png";
import imgSample from "../images/img_sample.png";
import imgDoctor from "../images/img_doctor.png";
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBackground from '../components/calendar/CalendarBackground';
import Loading from '../components/common/Loading';
import { getCounselByDiaryId, getDateForDisplay, getPhotoByDiaryId } from '../utils';
import Swal from 'sweetalert2';

const Modal = ({ isOpen, onClose, children, modalWidth }) => {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때 화면 중앙에 위치하도록 설정
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const modalHeight = modalRef.current ? modalRef.current.offsetHeight : 0;
            const modalWidth = modalRef.current ? modalRef.current.offsetWidth : 0;

            setModalPosition({
                top: (windowHeight - modalHeight) / 2,
                left: (windowWidth - modalWidth) / 2,
            });
        }
    }, [isOpen]);

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

    // 화면 크기 변경 시 모달 위치 업데이트
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const modalHeight = modalRef.current ? modalRef.current.offsetHeight : 0;
            const modalWidth = modalRef.current ? modalRef.current.offsetWidth : 0;

            setModalPosition({
                top: (windowHeight - modalHeight) / 2,
                left: (windowWidth - modalWidth) / 2,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}
                ref={modalRef} 
                style={{ 
                    top: modalPosition.top,
                    left: modalPosition.left,
                    position: 'absolute',
                    width: modalWidth 
                }} // 위치 설정
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
    const [isLoading, setIsLoading] = useState(true);
    const [modalWidth, setModalWidth] = useState('400px'); //모달 확장
    const [photoURL, setPhotoURL] = useState(""); // 사진 URL
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState(''); // 심리 상담 피드백 메시지
    const navigate = useNavigate();
    const location = useLocation();
    const diary = location.state?.diary || null;
    const diaryTags = location.state?.diaryTags || null;

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalWidth('400px'); //모달 확장 초기화
        setFeedbackVisible(false);
        navigate('/');
    };

    const handleExpandModal = () => {
        setModalWidth('800px'); //모달 확장
        setFeedbackVisible(true);
    };

    const handleEdit = () => {
        navigate('/new'); // 수정 버튼 클릭 시 new.js로 이동 추가
    };

    useEffect(() => {
        const fetchDiaryData = async () => {
            if (!diary) {
                Swal.fire({
                    title: "일기 조회",
                    text: "일기가 존재하지 않습니다",
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

            try {
                // 심리 상담 피드백 가져오기
                const feedbackData = await getCounselByDiaryId(diary.diary_id);
                if (feedbackData) {
                    setFeedbackMsg(feedbackData[0].feedback);
                }

                // 사진 URL 가져오기
                const photoData = await getPhotoByDiaryId(diary.diary_id);
                if (photoData) {
                    setPhotoURL(photoData[0].file_path);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "일기 조회",
                    text: "일기 조회 중 오류가 발생했습니다",
                    icon: "error",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline'
                    },
                    willClose: () => navigate("/", { replace: true })
                });
            } finally {
                setIsLoading(false);
                setIsModalOpen(true);
            }
        };

        fetchDiaryData();
    }, [diary]);

    if (!diary || isLoading) {
        return <Loading />
    } else {
        const { dateForDisplay, dayOfWeek } = getDateForDisplay(diary.date);
        return (
            <div className="container">
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalWidth={modalWidth}>
                    <PageTransition>
                        <div className='modal-content-wrapper'>
                        <div className="diary-all">
                        <img src={imgBook} alt="book" className="image-book" />
                            <div className="header">
                                <div className="date_wrapper">
                                    {dateForDisplay}
                                    <span>{dayOfWeek}</span>
                                </div>
                                <div className='weather-emotion'>
                                    <div className="weather">{`날씨: ${diary.weather}`}</div>
                                    <div className="emotion">{`기분: ${diary.emotion}`}</div>
                                </div>
                            </div>
                            <img src={photoURL || imgSample} alt="upload" className="image-sample" />
                            <div className="analysis-content">
                                {diary.content}
                            </div>
                            <div className="hashtags">
                                <span className="hashtag1" style={{ backgroundColor: "#fcc3cc" }}>{diaryTags[0]}</span>
                                <span className="hashtag2" style={{ backgroundColor: "#dbbefc" }}>{diaryTags[1]}</span>
                                <span className="hashtag3" style={{ backgroundColor: "#52acff" }}>{diaryTags[2]}</span>
                            </div>
                        </div>
                        {feedbackVisible && (
                            <div className="feedback-all">
                                <img src={imgDoctor} alt="doctor" className="image-doctor" />
                                <div className="feedback-message">
                                    <p className="text">심리 상담 피드백!</p>
                                    <p className="feedback">{feedbackMsg}</p>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className="diary-button-container">
                            <Button text={"심리 상담"} onClick={handleExpandModal}/>
                            <Button text={"수 정"} onClick={handleEdit}/>
                            <Button text={"닫 기"} type={"light"} onClick={handleCloseModal} />
                        </div>
                        </PageTransition>
                    </Modal>
                    <CalendarHeader />
                    <CalendarBackground />
            </div>
        );
    }
};

export default Diary;