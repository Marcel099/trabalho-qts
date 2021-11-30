import { useState } from 'react';

import { OngsProvider } from './contexts/OngsContext';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewOngModal } from './components/NewOngModal';

import './styles/global.scss';

export function App() {
  const [isNewOngModalOpen, setIsNewOngModalOpen] = useState(false)

  function handleOpenNewOngModal() {
    setIsNewOngModalOpen(true)
  }

  function handleCloseNewOngModal() {
    setIsNewOngModalOpen(false)
  }

  return (
    <OngsProvider>
      <Header
        onOpenNewOngModal={handleOpenNewOngModal}
      />
      <Dashboard />

      <NewOngModal
        isOpen={isNewOngModalOpen}
        onRequestClose={handleCloseNewOngModal}
      />
    </OngsProvider>
  );
}
