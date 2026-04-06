import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ADECommandCenter from './components/ADECommandCenter'
import ActiveProjects from './components/ActiveProjects'
import FinancialOperations from './components/FinancialOperations'
import ServiceOperations from './components/ServiceOperations'
import ComplianceLicensing from './components/ComplianceLicensing'
import FieldOperations from './components/FieldOperations'
import SalesMarketing from './components/SalesMarketing'
import ReportsAnalytics from './components/ReportsAnalytics'
import SettingsIntegrations from './components/SettingsIntegrations'

export type PageId =
  | 'dashboard'
  | 'ade-command'
  | 'active-projects'
  | 'service-ops'
  | 'financial-ops'
  | 'compliance'
  | 'field-ops'
  | 'sales-marketing'
  | 'reports'
  | 'settings'

export default function App() {
  const [page, setPage] = useState<PageId>('dashboard')
  const [adeOpen, setAdeOpen] = useState<string | null>(null)

  const navigate = (p: PageId) => {
    setPage(p)
    setAdeOpen(null)
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={navigate} />
      case 'ade-command': return <ADECommandCenter openAde={adeOpen} setOpenAde={setAdeOpen} />
      case 'active-projects': return <ActiveProjects />
      case 'service-ops': return <ServiceOperations />
      case 'financial-ops': return <FinancialOperations />
      case 'compliance': return <ComplianceLicensing />
      case 'field-ops': return <FieldOperations />
      case 'sales-marketing': return <SalesMarketing />
      case 'reports': return <ReportsAnalytics />
      case 'settings': return <SettingsIntegrations />
      default: return <Dashboard onNavigate={navigate} />
    }
  }

  return (
    <Layout currentPage={page} onNavigate={navigate} openAde={adeOpen} setOpenAde={setAdeOpen}>
      {renderPage()}
    </Layout>
  )
}

