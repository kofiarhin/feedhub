import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import HomePage from '../pages/HomePage/HomePage';
import RestaurantsPage from '../pages/RestaurantsPage/RestaurantsPage';
import RestaurantPage from '../pages/RestaurantPage/RestaurantPage';
import CartPage from '../pages/CartPage/CartPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import OrderHistoryPage from '../pages/OrderHistoryPage/OrderHistoryPage';
import AdminDashboardPage from '../pages/AdminDashboardPage/AdminDashboardPage';
import AdminOrdersPage from '../pages/AdminOrdersPage/AdminOrdersPage';
import AdminMenuPage from '../pages/AdminMenuPage/AdminMenuPage';
import AdminStoreSettingsPage from '../pages/AdminStoreSettingsPage/AdminStoreSettingsPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import HelpPage from '../pages/HelpPage/HelpPage';
import PrivacyPage from '../pages/PrivacyPage/PrivacyPage';
import TermsPage from '../pages/TermsPage/TermsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path='/' element={<HomePage />} />
      <Route path='/restaurants' element={<RestaurantsPage />} />
      <Route path='/restaurants/:id' element={<RestaurantPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/orders' element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
      <Route path='/admin' element={<ProtectedRoute><AdminRoute><AdminDashboardPage /></AdminRoute></ProtectedRoute>} />
      <Route path='/admin/orders' element={<ProtectedRoute><AdminRoute><AdminOrdersPage /></AdminRoute></ProtectedRoute>} />
      <Route path='/admin/menu' element={<ProtectedRoute><AdminRoute><AdminMenuPage /></AdminRoute></ProtectedRoute>} />
      <Route path='/admin/settings' element={<ProtectedRoute><AdminRoute><AdminStoreSettingsPage /></AdminRoute></ProtectedRoute>} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/help' element={<HelpPage />} />
      <Route path='/privacy' element={<PrivacyPage />} />
      <Route path='/terms' element={<TermsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
