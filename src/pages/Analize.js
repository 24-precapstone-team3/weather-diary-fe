import React, { useState } from 'react';
import './Analize.css'; // 스타일 파일 import
import imgAnalysis from "../images/img_analysis.png";

// 해시태그 컴포넌트 정의
const Hashtag = ({ isActive, onClick, text }) => {
    return (
        <div
            className={`Hashtag ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

// 모달 컴포넌트 정의
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // 모달이 열리지 않은 경우 null 반환

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children} {/* 모달 안의 내용 */}
            </div>
        </div>
    );
};

const Analize = () => {
    const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
    const [activeHashtags, setActiveHashtags] = useState([]); // 활성화된 해시태그 상태

    // 모달 열기 핸들러
    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    // 모달 닫기 핸들러
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    // 해시태그 클릭 핸들러
    const handleHashtagClick = (text) => {
        setActiveHashtags((prev) => {
            // 이미 선택된 해시태그가 있을 경우 제거
            if (prev.includes(text)) {
                return prev.filter((hashtag) => hashtag !== text);
            }
            // 최대 3개까지 선택 가능
            if (prev.length < 3) {
                return [...prev, text];
            }
            return prev; // 3개 이상은 추가하지 않음
        });
    };

    return (
        <div className="analyze-container">
            {/* 모달 창 */}
            <Modal isOpen={isOpen} onClose={handleClosePopup}>
            <img src={imgAnalysis} alt="Analysis" className="image-analysis" />
                <div className="analyze-all">
                    <div className="analyze-header">
                    </div>
                    <div className="analyze-message">
                        <p>감정 분석... 어쩌구 저쩌구 이ㅏㅓ리나ㅓㅇ러ㅣㄴ아ㅓ리ㅏ넝러낭리ㅏㅓ니아ㅓ리나어리ㅏ
                            ㅣ나어리ㅏㅓ니아러ㅣ아ㅓ리ㅏㄴ어ㅏ러니아ㅓ리아ㅓ리ㅏ너이라넝ㄹ아ㅓㄹ
                            니어리ㅏㅇ너랴더ㅣ나ㅓㅣ아러니아ㅓ리ㅏㄴ어리ㅏ넝랴더ㅏ너ㅣ추
                            이러댜ㅓ리나ㅣㅏㅍ
                            감정 분석... 어쩌구 저쩌구 이ㅏㅓ리나ㅓㅇ러ㅣㄴ아ㅓ리ㅏ넝러낭리ㅏㅓ니아ㅓ리나어리ㅏ
                            ㅣ나어리ㅏㅓ니아러ㅣ아ㅓ리ㅏㄴ어ㅏ러니아ㅓ리아ㅓ리ㅏ너이라넝ㄹ아ㅓㄹ
                            니어리ㅏㅇ너랴더ㅣ나ㅓㅣ아러니아ㅓ리ㅏㄴ어리ㅏ넝랴더ㅏ너ㅣ추
                            이러댜ㅓ리나ㅣㅏㅍ
                            감정 분석... 어쩌구 저쩌구 이ㅏㅓ리나ㅓㅇ러ㅣㄴ아ㅓ리ㅏ넝러낭리ㅏㅓ니아ㅓ리나어리ㅏ
                            ㅣ나어리ㅏㅓ니아러ㅣ아ㅓ리ㅏㄴ어ㅏ러니아ㅓ리아ㅓ리ㅏ너이라넝ㄹ아ㅓㄹ
                            니어리ㅏㅇ너랴더ㅣ나ㅓㅣ아러니아ㅓ리ㅏㄴ어리ㅏ넝랴더ㅏ너ㅣ추
                            이러댜ㅓ리나ㅣㅏㅍ
                            감정 분석... 어쩌구 저쩌구 이ㅏㅓ리나ㅓㅇ러ㅣㄴ아ㅓ리ㅏ넝러낭리ㅏㅓ니아ㅓ리나어리ㅏ
                            ㅣ나어리ㅏㅓ니아러ㅣ아ㅓ리ㅏㄴ어ㅏ러니아ㅓ리아ㅓ리ㅏ너이라넝ㄹ아ㅓㄹ
                            니어리ㅏㅇ너랴더ㅣ나ㅓㅣ아러니아ㅓ리ㅏㄴ어리ㅏ넝랴더ㅏ너ㅣ추
                            이러댜ㅓ리나ㅣㅏㅍ
                        </p>
                    </div>
                    <div className="hashtag-container">
                        <div className="hashtag-message">
                            <p>너의 일기를 분석한 키워드야. 저장하고 싶은 키워드를 최대 3개만 선택해줘.</p>
                        </div>
                        {['# 행복', '# 슬픔', '# 분노', '# 불안', '#사랑', '# 평화'].map((hashtag) => (
                            <Hashtag
                                key={hashtag}
                                text={hashtag}
                                isActive={activeHashtags.includes(hashtag)}
                                onClick={() => handleHashtagClick(hashtag)}
                            />
                        ))}
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={handleClosePopup} className="consult-button">심리상담</button>
                    <button onClick={handleClosePopup} className="save-button">저 장</button>
                    <button onClick={handleClosePopup} className="close-button">닫 기</button>
                </div>
            </Modal>
        </div>
    );
};

export default Analize;