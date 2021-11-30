// import logoImg from '../../assets/logo.svg'

import styles from './styles.module.scss'

type HeaderProps = {
  onOpenNewOngModal: () => void
}

export function Header({
  onOpenNewOngModal,
}: HeaderProps) {
  return (
    <header className={styles.container}>
      <section className={styles.content}>
        {/* <img src={logoImg} alt="dt money" /> */}
        <button type="button" onClick={onOpenNewOngModal}>
          Nova ONG
        </button>
      </section>
    </header>
  )
}
