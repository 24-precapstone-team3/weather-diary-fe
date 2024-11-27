import { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Diary from './pages/Diary';
import New from './pages/New';
import Counsel from './pages/Counsel';
import useAuthUser from './hooks/useAuthUser';
import Loading from './components/common/Loading';
import Swal from 'sweetalert2';
import { DiaryProvider } from './contexts/DiaryContext';
import { TagProvider } from './contexts/TagContext';
import Analysis from './pages/Analysis';

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
              <Route path="/diary/:diary_id" element={<ProtectedRoute element={<Diary />} />} />
              <Route path="/new" element={<ProtectedRoute element={<New />} />} />
              <Route path="/analysis" element={<ProtectedRoute element={<Analysis />} />} />
              <Route path="/counsel" element={<ProtectedRoute element={<Counsel />} />} />
            </Routes>
          </div>
        </TagProvider>
      </DiaryProvider>
    );
  }
}

export default App;