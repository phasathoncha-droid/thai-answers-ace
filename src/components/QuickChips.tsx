import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Building, FileText, Monitor } from 'lucide-react';

const quickChips = [
  { label: 'สินเชื่อ', query: 'สินเชื่อบุคคล วงเงิน เงื่อนไข', icon: CreditCard },
  { label: 'ประกัน', query: 'ประกันชีวิตคุ้มครองสินเชื่อ', icon: Shield },
  { label: 'หลักประกัน', query: 'หลักประกัน LTV การประเมิน', icon: Building },
  { label: 'เอกสารที่ใช้', query: 'เอกสารประกอบการขอสินเชื่อ', icon: FileText },
  { label: 'IT/ระบบ', query: 'ระบบ LOS CRM วิธีใช้', icon: Monitor },
];

export function QuickChips() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {quickChips.map(({ label, query, icon: Icon }) => (
        <Badge
          key={label}
          variant="secondary"
          className="cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground hover:shadow-card flex items-center gap-2"
          onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Badge>
      ))}
    </div>
  );
}
