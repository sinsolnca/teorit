import { useTheme } from '@hooks/useTheme'
import { Icon } from './Icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost p-2 rounded-lg transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Icon name="moon" size={20} /> : <Icon name="sun" size={20} />}
    </button>
  )
}