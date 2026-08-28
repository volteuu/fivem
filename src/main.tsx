import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  fontFamily: 'Manrope, system-ui, sans-serif',
  colors: {
    brand: [
      '#eefcfd',
      '#dcf7fb',
      '#b3eff6',
      '#88e6f1',
      '#66dfec',
      '#4ddbe9',
      '#3cd8e8',
      '#2bc0cf',
      '#1eabb8',
      '#0094a1',
    ],
  },
  primaryColor: 'brand',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
