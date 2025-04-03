
import { useState } from 'react'
import { Copy, Shuffle } from 'lucide-react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { Nav } from './Nav'

const EMOJI_CATEGORIES = {
  faces: ['😀', '😂', '🥹', '😊', '😇', '🥰', '😍', '🤩', '😘', '😋'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
  food: ['🍎', '🍕', '🌮', '🍦', '🍪', '🍩', '🍗', '🥑', '🥕', '🍌'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖'],
}

function EmojiGenerator() {
  const [currentEmoji, setCurrentEmoji] = useState('😊')
  const [category, setCategory] = useState<keyof typeof EMOJI_CATEGORIES>('faces')
  const [recentEmojis, setRecentEmojis] = useState<string[]>([])

  const generateEmoji = () => {
    const emojis = EMOJI_CATEGORIES[category]
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    setCurrentEmoji(newEmoji)
    setRecentEmojis(prev => [newEmoji, ...prev.slice(0, 7)])
  }

  const copyToClipboard = async (emoji: string) => {
    await navigator.clipboard.writeText(emoji)
  }

  const handleCategoryChange = (newCategory: keyof typeof EMOJI_CATEGORIES) => {
    console.error(`Category selected: ${newCategory}`)
    setCategory(newCategory)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Emoji Generator</h1>
        
        {/* Main emoji display */}
        <div className="text-8xl text-center p-8 bg-gray-50 rounded-xl hover:scale-110 transition-transform cursor-pointer"
             onClick={() => copyToClipboard(currentEmoji)}>
          {currentEmoji}
        </div>

        {/* Category buttons */}
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(EMOJI_CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat as keyof typeof EMOJI_CATEGORIES)}
              className={`p-3 rounded-lg font-medium transition-all ${
                category === cat 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={generateEmoji}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Generate
          </button>
          <button
            onClick={() => copyToClipboard(currentEmoji)}
            className="bg-gray-100 text-gray-700 p-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copy
          </button>
        </div>

        {/* Recent emojis */}
        {recentEmojis.length > 0 && (
          <div className="border-t pt-4">
            <h2 className="text-sm font-medium text-gray-600 mb-2">Recent</h2>
            <div className="flex gap-2 flex-wrap">
              {recentEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => copyToClipboard(emoji)}
                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Routes>
        <Route path="/" element={<EmojiGenerator />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App