import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

// import closeImg from '../../assets/close.svg'
// import incomeImg from '../../assets/income.svg'
// import outcomeImg from '../../assets/outcome.svg'

import { useOngs } from '../../contexts/OngsContext'

import styles from './styles.module.scss'

Modal.setAppElement('#root')

type NewOngModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewOngModal({
  isOpen, onRequestClose
}: NewOngModalProps) {
  const {
    createOng,
  } = useOngs()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');


  async function handleCreateNewOng(e: FormEvent) {
    e.preventDefault()

    await createOng({
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    setName('')
    setEmail('')
    setWhatsapp('')
    setCity('')
    setUf('')

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        {/* <img src={closeImg} alt="Fechar modal" /> */}
      </button>
      <form
        className={styles.container}
        onSubmit={handleCreateNewOng}
      >
        <h2>Cadastrar ONG</h2>

        <input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="off"
        />

        <input
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="off"
        />

        <input
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          autoComplete="off"
        />

        <input
          placeholder="Cidade"
          value={city}
          onChange={e => setCity(e.target.value)}
          autoComplete="off"
        />

        <input
          placeholder="UF"
          value={uf}
          onChange={e => setUf(e.target.value)}
          autoComplete="off"
        />

        <button
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </Modal>
  )
}