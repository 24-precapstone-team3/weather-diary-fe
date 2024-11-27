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
<<<<<<< HEAD
import { DiaryStateContext } from '../contexts/DiaryContext';
=======
import Loading from '../components/common/Loading';
import { getCounselByDiaryId, getFormattedDate } from '../utils';
>>>>>>> donghyeon
import Swal from 'sweetalert2';

// Modal 컴포넌트는 생략
const Modal = ({ isOpen, onClose, children, modalWidth }) => {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isOpen) {
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
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                style={{
                    top: modalPosition.top,
                    left: modalPosition.left,
                    position: 'absolute',
                    width: modalWidth,
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
<<<<<<< HEAD
    const [entry, setEntry] = useState('');
    const { date, weather, emotion, analysisContent, imgSample, feedbackMessage } = useContext(DiaryStateContext);
=======
>>>>>>> donghyeon
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [modalWidth, setModalWidth] = useState('400px'); //모달 확장
<<<<<<< HEAD
    const [feedbackVisible, setFeedbackVisible] = useState(false);
=======
    const [feedbackVisible, setFeedbackVisible] = useState(false); 
    const [hashtags, setHashtags] = useState([]);
    const [counselFeedback, setCounselFeedback] = useState(''); // 심리 상담 피드백 메시지
>>>>>>> donghyeon
    const navigate = useNavigate();
    const location = useLocation();
    const diary = location.state?.diary || null;

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

    const handleDelete = () => {
        if (entry.trim() === '') {
            Swal.fire({
                title: "일기 삭제",
                text: "일기를 정말 삭제하시겠습니까?",
                icon: "warning",
                confirmButtonText: "삭제",
                cancelButtonText: "닫기",
                showCancelButton: true,
                customClass: {
                    confirmButton: 'no-focus-outline',
                    cancelButton: 'no-focus-outline'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // 삭제 로직을 여기에 추가합니다.
                } else if (result.isDismissed) {
                    setIsModalOpen(true);
                }
            });
            return;
        }
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

<<<<<<< HEAD
    return (
        <div className="container">
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalWidth={modalWidth}>
                <PageTransition>
                    <div className='modal-content-wrapper'>
                        <div className="diary-all">
                            <img src={imgBook} alt="book" className="image-book" />
                            <div className="header">
                                <div className="date">2024.10.22.화{date}</div>
                                <div className='weather-emotion'>
                                    <div className="weather">날씨: 맑음{weather}</div>
                                    <div className="emotion">기분: 행복{emotion}</div>
                                </div>
                            </div>
                            <img src={imgSample} alt="upload" className="image-sample" />
                            <div className="analysis-content">분석된 일기 내용...{analysisContent}</div>
=======
            try {
                const feedback = await getCounselByDiaryId(diary.diary_id);
                setCounselFeedback(feedback);

                
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
        const { dateForDisplay, dayOfWeek } = getFormattedDate(diary.date);
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
                            <img src={imgSample} alt="upload" className="image-sample" />
                            <div className="analysis-content">
                                {diary.content}
                            </div>
>>>>>>> donghyeon
                            <div className="hashtags">
                                <span className="hashtag1" style={{ backgroundColor: '#FCC3CC' }}># 달리기</span>
                                <span className="hashtag2" style={{ backgroundColor: '#DBBEFC' }}># 달리기</span>
                                <span className="hashtag3" style={{ backgroundColor: '#52ACFF' }}># 달리기</span>
                            </div>
                        </div>
                        {feedbackVisible && (
                            <div className="feedback-all">
                                <img src={imgDoctor} alt="doctor" className="image-doctor" />
<<<<<<< HEAD
                                <div className="feedback-message">심리 상담 피드백!{feedbackMessage}</div>
                            </div>
                        )}
                    </div>
                    <div className="diary-button-container">
                        <Button text={"심리상담"} onClick={handleExpandModal}/>
                        <Button text={"삭 제"} className="red-button" onClick={handleDelete} />
                        <Button text={"수 정"} onClick={handleEdit} />
                        <Button text={"닫 기"} type={"light"} onClick={handleCloseModal} />
                    </div>
                </PageTransition>
            </Modal>
            <CalendarHeader />
            <CalendarBackground />
        </div>
    );
=======
                                <div className="feedback-message">
                                    <p className="text">심리 상담 피드백!</p>
                                    <p className="feedback">{counselFeedback}</p>
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
>>>>>>> donghyeon
};

export default Diary;