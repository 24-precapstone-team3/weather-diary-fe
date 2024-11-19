import { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Diary from './pages/Diary';
import New from './pages/New';
import Analize from './pages/Analize';
import Counsel from './pages/Counsel';
import useAuthUser from './hooks/useAuthUser';
import Loading from './components/common/Loading';
import Swal from 'sweetalert2';
import { DiaryDispatchContext, DiaryProvider, DiaryStateContext } from './contexts/DiaryContext';
import { TagProvider } from './contexts/TagContext';

function App() {
  const { currentUser, isDataLoaded } = useAuthUser();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const ProtectedRoute = ({ element }) => {
    if (!currentUser) {
      Swal.fire({
        title: "로그인",
        text: "로그인이 필요한 서비스입니다",
        icon: "warning",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: 'no-focus-outline'
        },
      });
      return <Navigate to="/" />;
    }
    return element;
  };

  if (!isDataLoaded) {
    return <Loading />;
  } else {
    return (
      <DiaryProvider>
        <TagProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/diary" element={<ProtectedRoute element={<Diary />} />} />
              <Route path="/new" element={<ProtectedRoute element={<New />} />} />
              <Route path="/analize" element={<ProtectedRoute element={<Analize />} />} />
              <Route path="/counsel" element={<ProtectedRoute element={<Counsel />} />} />
            </Routes>
          </div>
        </TagProvider>
      </DiaryProvider>
    );
  }
}

export default App;