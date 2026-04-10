import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/domwit-landing.jsx'
import Search from './pages/domwit-search.jsx'
import Listing from './pages/domwit-listing.jsx'
import Auth from './pages/domwit-auth.jsx'
import CreateListing from './pages/domwit-create-listing.jsx'
import Landlord from './pages/domwit-landlord.jsx'
import Tenant from './pages/domwit-tenant.jsx'
import Chat from './pages/domwit-chat.jsx'
import Notifications from './pages/domwit-notifications.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/landlord" element={<Landlord />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
