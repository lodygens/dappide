import { useState } from 'react';

export const useGithubConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleGithubConnect = () => {
    // Logique de connexion à GitHub
    console.log("Connecting to GitHub...");
    // Simulons une connexion réussie après 1 seconde
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  return { isConnected, handleGithubConnect };
};
