import React, { useState } from 'react'
import { SquarePen, SquareCheck, SquareX, Trash } from 'lucide-react';


const Content = ({todo, setTodo}) => {
  const [editID, setEditID] = useState(null)
  const [editName, setEditname] = useState("")
  const [dragId, setDragId] = useState(null)

  const hdlEdit = (items) => {
    setEditID(items.id)
    setEditname(items.name)
  }

  const hdlDel = (id) => {
    setTodo((prev) => prev.filter((prev)=>prev.id != id))
  }

  const hdlSave = (id) => {
    setTodo(
      todo.map((items)=>{ 
        if (items.id === id) {
          return {...items, name:editName}
        }
        return items
      })
    )

    setEditID(null)
    setEditname("")
  }

  const hdlCancel = () => {
    setEditID(null)
    setEditname("")
  }

  const hdlDragStart = (id) => {
    setDragId(id)
  }

  const hdlDrop = (targetId) => {
    if (!dragId || dragId === targetId) return

    setTodo((prev)=>{
      const oldIndex = prev.findIndex((item) => item.id === dragId)
      const newIndex = prev.findIndex((item) => item.id === targetId)

      if (oldIndex === -1 || newIndex === -1) return prev

      const update = [...prev]
      const [move] = update.splice(oldIndex, 1)
      update.splice(newIndex, 0, move)

      return update
    })

    setDragId(null)
  }

  return (
    <div name="content" className='mt-6'>
      {
        todo.map((items)=>{
          const editing = items.id === editID
          return (
            <div key={items.id} 
            draggable
            onDragStart={() => hdlDragStart(items.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => hdlDrop(items.id)}
            className="flex items-center py-4 gap-4" 
            >

              <input type="checkbox" 
                className='mr-4 w-5 h-5 appearance-none border-2 rounded-full border-violet-950 checked:bg-violet-950'
              />

              <div name="txt" className='flex-1'>
                { editing
                  ? <input 
                      type="text"
                      onChange={(e)=>setEditname(e.target.value)}
                      value={editName}
                      autoFocus
                      className='w-full focus:outline-none focus:ring-2 focus:ring-violet-950 rounded-xl font-semibold -ml-1 pl-1'
                    />
                  : <span className='text-violet-950'>{items.name}</span>
                }
              </div>

              <div name="button" className='flex gap-3'>
                { editing
                  ? <>
                      <SquareCheck size={24} onClick={()=>hdlSave(items.id)} className='text-green-500 hover:text-green-700 hover:scale-105'/>
                      <SquareX size={24} onClick={()=>hdlCancel()} className='text-red-500 hover:text-red-700 hover:scale-105'/>  
                    </>
                  : <>
                      <SquarePen size={24} onClick={()=>hdlEdit(items)} className='hover:text-violet-700 hover:scale-105'/>
                      <Trash size={24} onClick={()=>hdlDel(items.id)} className='hover:text-red-700 hover:scale-105'/>
                    </>
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Content
