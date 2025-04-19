// components/ui/RiskBadge.tsx
export default function RiskBadge({ score }: { score: number }) {
    const getStatus = () => {
      if (score > 70) return { color: 'bg-red-500', label: 'High Risk' };
      if (score > 30) return { color: 'bg-yellow-500', label: 'Medium' };
      return { color: 'bg-green-500', label: 'Low' };
    };
  
    const { color, label } = getStatus();
  
    return (
      <span className={`${color} text-white px-2 py-1 rounded-full text-xs`}>
        {label} ({score}%)
      </span>
    );
  }