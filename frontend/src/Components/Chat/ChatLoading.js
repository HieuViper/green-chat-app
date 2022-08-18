import React from 'react'

const ChatLoading = () => {
  return (
    <div>
      <div className="border border-green-700 shadow rounded-md p-3 max-w-sm w-full mx-auto mb-2">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-1 py-1 flex flex-col justify-between">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="border border-green-700 shadow rounded-md p-3 max-w-sm w-full mx-auto mb-2">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-1 py-1 flex flex-col justify-between">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="border border-green-700 shadow rounded-md p-3 max-w-sm w-full mx-auto mb-2">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-1 py-1 flex flex-col justify-between">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLoading