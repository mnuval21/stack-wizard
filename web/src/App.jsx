import TerminalChrome from './components/TerminalChrome';
import WizardShell from './components/WizardShell';
import { useWizard } from './hooks/useWizard';
import './styles/terminal.css';
import './styles/wizard.css';
import './App.css';

function App() {
  const wizard = useWizard();

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-title-icon">🤖</span> OpenClaw
        </h1>
        <p className="app-subtitle">AI Stack Wizard</p>
      </header>

      <main className="app-main">
        <TerminalChrome>
          <WizardShell wizard={wizard} />
        </TerminalChrome>
      </main>

      <footer className="app-footer">
        <p>
          Open source · Zero tracking · No data stored ·{' '}
          <a href="" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
