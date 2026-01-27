import { ExternalLink } from "lucide-react";

function DocumentButton({
  href,
  label,
  title,
  disabled = false,
  disabledLabel = "N/A",
  intensity = 1,
}) {
  const baseStyle = {
    background: `rgba(47,39,156,${0.1 + (intensity - 1) * 0.05})`,
    color: "#2F279C",
    borderColor: `rgba(47,39,156,${0.2 + (intensity - 1) * 0.05})`,
  };

  const hoverStyle = {
    background: `rgba(47,39,156,${0.15 + (intensity - 1) * 0.05})`,
  };

  if (disabled || !href) {
    return (
      <a
        href={undefined}
        aria-disabled="true"
        tabIndex={-1}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border opacity-50 cursor-not-allowed select-none"
        style={baseStyle}
        onClick={(e) => e.preventDefault()}
        title={title}
      >
        <ExternalLink className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer border"
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverStyle.background;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = baseStyle.background;
      }}
      title={title}
    >
      <ExternalLink className="w-3.5 h-3.5" />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

export default DocumentButton;
