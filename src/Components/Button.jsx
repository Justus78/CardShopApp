import { Plus, X, Send, HelpCircle } from 'lucide-react'

// set up button types
const BUTTON_CONFIG = {
  add:      { icon: Plus, style: "inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors" },
  submit:   { icon: Send, style: "inline-flex items-center gap-2 px-5 py-2.5 bg-green-900/50 hover:bg-green-800 border border-green-600 text-green-300 text-sm font-semibold rounded-lg transition-colors" },
  cancel:   { icon: X,    style: "inline-flex items-center gap-2 px-5 py-2.5 bg-red-900/50 hover:bg-red-700 border border-red-900/60 text-red-400 text-sm font-semibold rounded-lg transition-colors ml-auto" },
  tutorial: { icon: HelpCircle, style: "animate-pulse-ring fixed top-50 left-15 z-40 inline-flex items-center gap-2 px-5 py-3 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-full shadow-lg transition-all hover:-translate-y-0.5"},
  none:     { icon: null, style: "inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors" },
}

const Button = ({ type = "none", text, onClickFunction }) => {

  //de-structure the button config
  const { icon: Icon, style } = BUTTON_CONFIG[type] ?? BUTTON_CONFIG.none

  return (
    <button className={style} onClick={onClickFunction}>
      {Icon && <Icon size={14} aria-hidden="true" />}
      {text}
    </button>
  )
}

export default Button