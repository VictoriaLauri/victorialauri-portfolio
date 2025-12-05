import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout, ScrollToTop } from '@/components/layout'
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  ProjectDetailPage,
  NewsPage,
  EventsPage,
  ContactPage,
} from '@/pages'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
