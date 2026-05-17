import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import ListagemUCs from './pages/ListagemUCs.jsx';
import DetalheUC from './pages/DetalheUC.jsx';
import NovaComunicacao from './pages/NovaComunicacao.jsx';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ListagemUCs />} />
          <Route path="/unidades/:id" element={<DetalheUC />} />
          <Route path="/unidades/:id/nova-comunicacao" element={<NovaComunicacao />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}