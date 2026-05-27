import { useState, useEffect } from 'react'

export default function App() {
  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [ativos, setAtivos] = useState([])

  // Carrega ativos salvos quando abre o app
  useEffect(() => {
    const ativosSalvos = localStorage.getItem('ativos-b3')
    if (ativosSalvos) {
      setAtivos(JSON.parse(ativosSalvos))
    }
  }, [])

  const fazerLogin = () => {
    if (email && senha) {
      setLogado(true)
    } else {
      alert('Preenche email e senha')
    }
  }

  const loginGovBr = () => {
    // Aqui depois entra a integração real do gov.br
    setLogado(true)
  }

  const importarNotaNuInvest = () => {
    // Mock: simulando leitura de PDF
    // Depois a gente troca pelo parser real da nota
    const novosAtivos = [
      { ticker: 'PETR4', qtde: 100, pm: 28.50, custoTotal: 2850, pl: 120.50, plPercent: 4.22 },
      { ticker: 'VALE3', qtde: 50, pm: 65.20, custoTotal: 3260, pl: -80.00, plPercent: -2.45 },
      { ticker: 'ITUB4', qtde: 200, pm: 24.80, custoTotal: 4960, pl: 240.00, plPercent: 4.84 }
    ]
    setAtivos(novosAtivos)
    localStorage.setItem('ativos-b3', JSON.stringify(novosAtivos))
  }

  const totalInvestido = ativos.reduce((acc, a) => acc + a.custoTotal, 0)
  const totalPL = ativos.reduce((acc, a) => acc + a.pl, 0)

  if (!logado) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <h1 style={styles.titulo}>Carteira B3</h1>
          <p style={styles.subtitulo}>Controle seu PM offline</p>
          
          <input 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />
          <input 
            placeholder="Senha" 
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={styles.input}
          />
          <button onClick={fazerLogin} style={styles.btnPrimario}>
            Entrar
          </button>
          <button onClick={loginGovBr} style={styles.btnGovBr}>
            Entrar com gov.br
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>Minha Carteira</h1>
        <button 
          onClick={() => setLogado(false)} 
          style={styles.btnSair}
        >
          Sair
        </button>
      </div>

      <div style={styles.resumo}>
        <div style={styles.cardResumo}>
          <span style={styles.labelResumo}>Total investido</span>
          <span style={styles.valorResumo}>R$ {totalInvestido.toLocaleString('pt