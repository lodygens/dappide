'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Brain, Database, Link, Cpu } from 'lucide-react'

interface IntroPageProps {
  onClose: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onClose }) => {
  const [text, setText] = useState('')
  const fullText = `
    Bienvenue sur iExec AI-Powered dApp IDE

    Révolutionnez le développement d'applications
    décentralisées avec l'IA et iExec.

    Caractéristiques innovantes :
    * Assistant IA intégré pour un codage intelligent
    * Compilation et déploiement optimisés pour iExec
    * Intégration transparente avec le SDK iExec
    * Outils de débogage avancés pour dApps

    Explorez le potentiel illimité du Web3 :
    - Calcul décentralisé
    - Confidentialité des données
    - Marchés de ressources informatiques
    - Monétisation des algorithmes

    Créez l'avenir de l'informatique décentralisée.

    Êtes-vous prêt à repousser les limites de l'innovation ?
  `

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.substring(0, i))
      i++
      if (i > fullText.length) clearInterval(typing)
    }, 30)

    return () => clearInterval(typing)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#1c1c1c] flex flex-col items-center justify-center z-50">
    <div className="bg-[#1c1c1c] border border-[#00ff00] rounded-md p-6 w-3/4 max-w-5xl">
      <pre className="whitespace-pre-wrap text-center">{text}</pre>
    </div>
    <div className="mt-8 flex justify-center gap-4">
      <Button 
          variant="outline" 
          className="border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33] hover:text-black"
          onClick={onClose}
      >
        Commencer à Innover
      </Button>
        <Button 
          variant="outline" 
          className="border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33] hover:text-black"
          onClick={() => window.open('https://docs.iex.ec', '_blank')}
        >
          Documentation
        </Button>
        <Button 
          variant="outline" 
          className="border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33] hover:text-black"
          onClick={() => window.open('https://iex.ec/faq', '_blank')}
        >
          FAQ
        </Button>
      </div>
      <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
        <Brain className="w-32 h-32 animate-pulse text-[#33ff33]" />
        <Database className="w-32 h-32 animate-bounce text-[#33ff33]" />
        <Link className="w-32 h-32 animate-spin text-[#33ff33]" style={{ animationDuration: '10s' }} />
        <Cpu className="w-32 h-32 animate-pulse text-[#33ff33]" />
      </div>
    </div>
  )
}

export default IntroPage;