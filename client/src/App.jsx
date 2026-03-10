import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import HomePage from './pages/HomePage/HomePage';
import RestaurantsPage from './pages/RestaurantsPage/RestaurantsPage';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import AdminOrdersPage from './pages/AdminOrdersPage/AdminOrdersPage';
import AdminMenuPage from './pages/AdminMenuPage/AdminMenuPage';
import AdminStoreSettingsPage from './pages/AdminStoreSettingsPage/AdminStoreSettingsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HelpPage from './pages/HelpPage/HelpPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import TermsPage from './pages/TermsPage/TermsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurants/:id" element={<RestaurantPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<OrderHistoryPage />} />
      </Route>
    </Route>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="/admin/store" element={<AdminStoreSettingsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/404" element={<Navigate to="*" />} />
  </Routes>
);

export default App;
