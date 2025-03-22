'use client'

export function PreviewBanner() {
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-yellow-800">
          プレビューモードで表示中です
        </p>
        <button
          className="bg-yellow-200 px-4 py-2 rounded-md"
          onClick={() => {
            window.location.href = '/api/exit-preview'
          }}
        >
          プレビューを終了
        </button>
      </div>
    </div>
  )
} 