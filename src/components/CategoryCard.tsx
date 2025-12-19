import { Category } from '@/data/types';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Shield, 
  BarChart3, 
  Target, 
  Users, 
  Settings, 
  Megaphone, 
  Banknote, 
  ClipboardList, 
  Lightbulb 
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'package': Package,
  'shield': Shield,
  'bar-chart-3': BarChart3,
  'target': Target,
  'users': Users,
  'settings': Settings,
  'megaphone': Megaphone,
  'banknote': Banknote,
  'clipboard-list': ClipboardList,
  'lightbulb': Lightbulb,
};

const iconColors: Record<string, string> = {
  'package': 'text-amber-600',
  'shield': 'text-blue-500',
  'bar-chart-3': 'text-green-500',
  'target': 'text-pink-500',
  'users': 'text-purple-500',
  'settings': 'text-gray-500',
  'megaphone': 'text-red-500',
  'banknote': 'text-yellow-500',
  'clipboard-list': 'text-orange-500',
  'lightbulb': 'text-yellow-400',
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const IconComponent = iconMap[category.icon] || Package;
  const iconColor = iconColors[category.icon] || 'text-primary';

  return (
    <Link to={`/topics/category/${category.id}`}>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 bg-card border border-border hover:bg-muted/50 hover:shadow-md hover:border-primary/30 min-w-[120px] h-[110px] cursor-pointer">
        <IconComponent className={`w-8 h-8 mb-2 ${iconColor}`} />
        <span className="text-sm font-medium text-foreground text-center leading-tight">
          {category.name_th}
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          {category.document_count} เอกสาร
        </span>
      </div>
    </Link>
  );
};
