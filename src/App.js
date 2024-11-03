import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Diary from './pages/Diary';
import New from './pages/New';
import Analize from './pages/Analize';
import Counsel from './pages/Counsel';
import { auth } from './firebase';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isdataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }

      setIsDataLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isdataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>;
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Calendar /> } />
          <Route path={"/diary/:id"} element={currentUser ? <Diary /> : <Navigate to={"/"} />} />
          <Route path={"/new"} element={currentUser ? <New /> : <Navigate to={"/"} />} />
          <Route path={"/analize"} element={currentUser ? <Analize /> : <Navigate to={"/"} />} />
          <Route path={"/counsel"} element={currentUser ? <Counsel /> : <Navigate to={"/"} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
