'use client'

import { logoutAction } from '@/data/action/auth-action'
import { LogOutIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const LogoutButton = () => {
  return (
    <Button onClick={() => logoutAction()} ><LogOutIcon size={16} className='mr-2'/>Выйти</Button>
  )
}

export default LogoutButton