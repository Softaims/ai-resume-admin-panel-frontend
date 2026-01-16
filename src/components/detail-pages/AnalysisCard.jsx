import { Calendar, FileText, Briefcase } from 'lucide-react'
import DetailField from './DetailField'
import DocumentButton from './DocumentButton'
import ResumeAnalysisScore from './ResumeAnalysisScore'
import MatchRateWidget from './MatchRateWidget'

function AnalysisCard({ analysis, type = 'resume' }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = () => {
    if (type === 'resume') {
      const isOptimized = analysis.optimizedGenerated
      return (
        <div className="col-span-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</p>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-transparent border ${
            isOptimized
              ? ' text-green-700 border-green-700'
              : ' text-red-700 border-red-700'
          }`}>
            {isOptimized ? 'Optimized' : 'Not Optimized'}
          </span>
        </div>
      )
    }
    return null
  }

  const getDocumentButtons = () => {
    if (type === 'resume') {
      return (
        <div className="col-span-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documents</p>
          <div className="flex items-center gap-3">
            <DocumentButton
              href={analysis.originalLink}
              label="Original"
              title="View Original Resume"
              intensity={1}
            />
            <DocumentButton
              href={analysis.optimizedLink}
              label="Optimized"
              title="View Optimized Resume"
              disabled={!analysis.optimizedGenerated}
              intensity={2}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-span-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documents</p>
          <div className="flex items-center gap-2 flex-wrap">
            <DocumentButton
              href={analysis.originalResumeLink}
              label="Original"
              title="View Original Resume"
              intensity={1}
            />
            <DocumentButton
              href={analysis.jobAnalyzedResumeLink}
              label="Analyzed"
              title="View Analyzed Resume"
              intensity={2}
            />
            <DocumentButton
              href={analysis.coverLetterLink}
              label="Cover Letter"
              title="View Cover Letter"
              disabledLabel="No Letter"
              intensity={3}
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-12 gap-6 mb-4">
        <DetailField
          icon={Calendar}
          label="Date Created"
          value={formatDate(analysis.dateCreated)}
          colSpan={2}
        />
        <DetailField
          icon={FileText}
          label="Name"
          value={analysis.fileName || 'N/A'}
          colSpan={type === 'resume' ? 5 : 3}
        />
        {type === 'job' && (
          <DetailField
            icon={Briefcase}
            label="Job Title"
            value={analysis.jobTitle}
            colSpan={3}
          />
        )}
        {getStatusBadge()}
        {getDocumentButtons()}
      </div>
      
      {/* Score Widgets */}
      {type === 'resume' && (
        <ResumeAnalysisScore
          overallScore={analysis.overallScore}
          atsCompatibility={analysis.atsCompatibility}
          keywordOptimization={analysis.keywordOptimization}
          achievementFocus={analysis.achievementFocus}
        />
      )}
      
      {type === 'job' && (
        <MatchRateWidget matchRate={analysis.matchRate} />
      )}
    </div>
  )
}

export default AnalysisCard

