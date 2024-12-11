import { ThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import { theme } from '../styles/theme';
import { CssBaseline } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orpheus',
  description: 'A journey through memory, music, and digital transcendence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
} 