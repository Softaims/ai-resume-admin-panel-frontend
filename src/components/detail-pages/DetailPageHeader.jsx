import BackButton from './BackButton'

function DetailPageHeader({ title, subtitle, onBack }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <BackButton onClick={onBack} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export default DetailPageHeader

