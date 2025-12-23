import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context';
import { store } from './store';
import App from './App';

// Quill editor styles
import 'react-quill-new/dist/quill.snow.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
);
