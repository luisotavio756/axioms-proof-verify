import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';
import { FormulasProvider } from './formulas';

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <ThemeProvider>
      <FormulasProvider>{children}</FormulasProvider>
    </ThemeProvider>
  </ToastProvider>
);

export default AppProvider;
