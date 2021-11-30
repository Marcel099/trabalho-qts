import { useOngs } from "../../contexts/OngsContext";

import styles from "./styles.module.scss";

export function OngsTable() {
  const {
    ongs
  } = useOngs()
    
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>WhatsApp</th>
            <th>Cidade</th>
            <th>UF</th>
          </tr>
        </thead>
        <tbody>
          {ongs.map(ong => (
            <tr key={ong.id}>
              <td>{ong.name}</td>
              <td>{ong.email}</td>
              <td>{ong.whatsapp}</td>
              <td>{ong.city}</td>
              <td>{ong.uf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}