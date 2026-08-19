import {
  BookOpen, BookText, FunctionSquare, Triangle, Search, Sun, Moon,
  Menu, X, ChevronRight, ChevronDown, Home, ExternalLink, GitBranch,
  ArrowLeft, Download, Printer, Sun as SunIcon, Moon as MoonIcon
} from 'lucide-react'

export const Icons = {
  algebra: FunctionSquare,
  geometry: Triangle,
  russian: BookText,
  literature: BookOpen,
  default: BookOpen,
  search: Search,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  home: Home,
  github: GitBranch,
  externalLink: ExternalLink,
  back: ArrowLeft,
  download: Download,
  printer: Printer,
  sunFill: SunIcon,
  moonFill: MoonIcon,
}

export function Icon({ name, size = 20, className = '', ...props }: { name: keyof typeof Icons; size?: number; className?: string }) {
  const Component = Icons[name] || Icons.default
  return <Component size={size} className={className} {...props} />
}