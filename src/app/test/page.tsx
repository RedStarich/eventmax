import React from 'react'
import { supabase } from '../config/supabase';

export default function page() {
    const setNewView = async () => {
        const { data, error } = await supabase
        .from('views')
        .insert({ name: "john" })
        if (data) console.log(data)
        if (error) console.log(error)
        
    }

    setNewView();
  return (
    <div>page</div>
  )
}
