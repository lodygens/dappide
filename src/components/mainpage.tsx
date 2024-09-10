/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/VnwzvU28Pyq
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useGithubConnection } from "@/utils/githubActions";
import { useState, useEffect } from 'react';
import { useChat } from "ai/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AiSettingsPage from './aisettingspage';
import IntroPage from './intro-page';


export default function MainPage() {

  const [aiPrompt, setAiPrompt] = useState('');
  const [codeArea, setCodeArea] = useState('');
  const [explanation, setExplanation] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { isConnected, handleGithubConnect } = useGithubConnection();
  const { messages, isLoading, append } = useChat();

  const handleSubmit = async () => {
    await append({
      role: "user",
      content: aiPrompt,
    })
    setAiPrompt('');
  };

  useEffect(() => {
    // Vérifier le dernier message pour le champ "code"
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      try {
        const content = JSON.parse(lastMessage.content);
        if (content.code) {
          setCodeArea(content.code);
        }
        if (content.explanation) {
          setExplanation(content.explanation);
        }
    } catch (error) {
        console.error("Erreur lors du parsing du JSON:", error);
      }
    }
  }, [messages]);
  
  return (
    <div className="flex flex-col h-screen bg-[#1c1c1c] font-['VT323'] text-[#00ff00]">
    {showSettings && <AiSettingsPage onClose={() => setShowSettings(false)} />}
    
    <header className="flex items-center justify-between px-4 py-2 border-b border-[#00ff00]">
      <div className="text-lg font-bold">iExec IDE</div>
            <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MinimizeIcon className="w-4 h-4" />
            <span className="sr-only">Minimize</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MaximizeIcon className="w-4 h-4" />
            <span className="sr-only">Maximize</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-[200px_1fr_300px] gap-4 p-4 overflow-auto h-full">
        <nav className="border border-[#00ff00] rounded-md p-2 flex flex-col gap-2 ">
          <Button variant="ghost" className="justify-start" onClick={() => setShowIntro(true)}>
            <FileIcon className="w-4 h-4 mr-2" />
            Intro
          </Button>
          {showIntro && <IntroPage onClose={() => setShowIntro(false)} />}
          <Button variant="ghost" className="justify-start" onClick={() => setShowSettings(true)}>
            <SettingsIcon className="w-4 h-4 mr-2" />
            AI Settings
          </Button>

          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={handleGithubConnect}
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            {isConnected ? "Connected to GitHub" : "Connect to GitHub"}
            
          </Button>
          <Button variant="ghost" className="justify-start">
            <WalletIcon className="w-4 h-4 mr-2" />
            Open Wallet
          </Button>
        </nav>
        <div className="border border-[#00ff00] rounded-md p-2 flex flex-col h-full">
        <div className=" items-center justify-between">
            <div className="text-lg font-bold">main.js</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <SaveIcon className="w-4 h-4" />
                <span className="sr-only">Save</span>
              </Button>
              <Button variant="ghost" size="icon">
                <PlayIcon className="w-4 h-4" />
                <span className="sr-only">Run</span>
              </Button>
              <Button variant="ghost" size="icon">
                <GithubIcon className="w-4 h-4" />
                <span className="sr-only">Commit to GitHub</span>
              </Button>
            </div>
          </div>
          <div className="h-[70%] overflow-auto mb-2">
            <SyntaxHighlighter
            language="javascript"
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: '#1c1c1c',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              className="h-full"
            >
              {codeArea}
            </SyntaxHighlighter>
          </div>
          <div className="border-t border-[#00ff00] pt-2 flex items-center justify-between">
            <div>
              <TerminalIcon className="w-4 h-4 mr-2 inline-block" />
              <span>Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronUpIcon className="w-4 h-4" />
                <span className="sr-only">Scroll up</span>
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronDownIcon className="w-4 h-4" />
                <span className="sr-only">Scroll down</span>
              </Button>
            </div>
          </div>
          <div className="bg-[#1c1c1c] text-[#00ff00] font-['VT323'] resize-none flex-1 h-[30%] overflow-auto">
          <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        </div>
        <div className="border border-[#00ff00] rounded-md p-2 flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">AI Assistant</div>
          </div>
          <Textarea
            className="bg-[#1c1c1c] text-[#00ff00] font-['VT323'] resize-none h-[100px]"
            placeholder="Ask the AI assistant a question..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />

          <Button 
              variant="ghost" 
              className="justify-start" 
              disabled={isLoading}
              onClick={handleSubmit}
          >

            <SendIcon className="w-4 h-4 mr-2" />
            Submit
          </Button>
          <Textarea
            className="bg-[#1c1c1c] text-[#00ff00] font-['VT323'] p-2 overflow-auto h-[200px] resize-none"
            value={explanation}
            readOnly
          />
          {isLoading && <div>AI is thinking...</div>}
          </div>
        </div>  
        <footer className="mt-auto border-t border-[#00ff00] p-4 text-xs text-center">
        <p>© iExec Blockchain Technologies, 2024 - Written by Oleg Lodygensky. Licensed under Apache License 2.0.</p>
        <p className="mt-2">
          Disclaimer: This software is provided "as is", without warranty of any kind.
          Use at your own risk.
        </p>
      </footer>

      </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function ChevronUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}


function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function MaximizeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}


function MinimizeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}


function SaveIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function TerminalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}


function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}
