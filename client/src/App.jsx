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
import AuthPage from './pages/AuthPage/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import PartnerLandingPage from './pages/PartnerLandingPage/PartnerLandingPage';
import PartnerAuthPage from './pages/PartnerAuthPage/PartnerAuthPage';
import PartnerOnboardingPage from './pages/PartnerOnboardingPage/PartnerOnboardingPage';
import GuestOrderConfirmationPage from './pages/GuestOrderConfirmationPage/GuestOrderConfirmationPage';
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
      <Route path="/checkout/guest-confirmation" element={<GuestOrderConfirmationPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/partner" element={<PartnerLandingPage />} />
      <Route path="/partner/auth" element={<PartnerAuthPage />} />
      <Route path="/partner/onboarding" element={<PartnerOnboardingPage />} />
      <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
      <Route path="/register" element={<Navigate to="/auth?mode=register" replace />} />
      <Route path="/partner/login" element={<Navigate to="/partner/auth" replace />} />
      <Route path="/partner/register" element={<Navigate to="/partner/onboarding" replace />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<OrderHistoryPage />} />
      </Route>
    </Route>
    <Route path="/admin/login" element={<Navigate to="/partner/auth" replace />} />
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="/admin/store" element={<AdminStoreSettingsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
