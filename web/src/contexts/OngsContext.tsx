import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type Ong = {
  id: string
  name: string
	email: string
	whatsapp: string
	city: string
	uf: string
}

type OngInput = Pick<Ong, 'name' | 'email' | 'whatsapp' | 'city' | 'uf'>


type OngsContextData = {
  ongs: Ong[]
  createOng: (ong: OngInput) => Promise<void>
}

const OngsContext = createContext<OngsContextData>(
  // forçando aceitar um tipo que ainda não é válido
  {} as OngsContextData
);


type OngsProviderProps = {
  children: ReactNode
}

export function OngsProvider({children}: OngsProviderProps) {
  const [ongs, setOngs] = useState<Ong[]>([])

  useEffect(()  => {
    api.get('/ongs')
      .then(response => setOngs(response.data))
  }, [])

  async function createOng(ongInput: OngInput) {
    const response = await api.post('/ongs', {
      ...ongInput,
      createdAt: new Date(),
    })

    const { id } = response.data

    setOngs([...ongs, {id, ...ongInput}])
  }

  return (
    <OngsContext.Provider value={{
      ongs,
      createOng
    }}>
      {children}
    </OngsContext.Provider>
  )
}

export function useOngs() {
  const context = useContext(OngsContext)

  return context
}