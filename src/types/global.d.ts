// global.d.ts
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onstart?: (event: Event) => void;
    onend?: (event: Event) => void;
    onerror?: (event: Event) => void;
    onresult?: (event: any) => void;
  }
  
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }
  