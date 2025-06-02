import AppProviders from '@/providers';
import AppRoutes from './Routes';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
