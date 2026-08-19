import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@hooks/useTheme'
import { Layout } from '@components/Layout'
import { HomePage } from '@pages/HomePage'
import { SubjectPage } from '@pages/SubjectPage'
import { TopicPage } from '@pages/TopicPage'
import { SearchPage } from '@pages/SearchPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="subject/:subjectSlug" element={<SubjectPage />} />
        <Route path="topic/:subjectSlug/:topicSlug" element={<TopicPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  )
}