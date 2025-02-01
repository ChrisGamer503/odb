import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Input from './components/componentsForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="account">Formulario Jugador</TabsTrigger>
            <TabsTrigger value="password">Formulario Orientador</TabsTrigger>
        </TabsList>
      <TabsContent value="account">Poner componente uno <Input type={"text"} pl/> </TabsContent>
      <TabsContent value="password">Poner componente dos</TabsContent>
  </Tabs>
    </>
  )
}

export default App
