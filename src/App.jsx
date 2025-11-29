import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Etudiant from './pages/Etudiant';
import Evenement from './pages/Evenement';
import Budget from './pages/Budget';
import Apropos from './pages/Apropos';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text overflow-x-hidden">
      <Navbar />
      <main className="pt-24">{/* leave space for fixed navbar */}
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/etudiant" element={<Etudiant />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
