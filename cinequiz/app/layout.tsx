import './globals.css';
import Link from 'next/link';
export default function Layout({children}:{children:React.ReactNode}){return <><header style={{borderBottom:'1px solid #292c36',padding:'16px 24px'}}><div style={{maxWidth:1000,margin:'auto',display:'flex',justifyContent:'space-between'}}><Link href="/" style={{fontWeight:900,fontSize:22}}>🎬 CineQuiz</Link><nav style={{display:'flex',gap:16}}><Link href="/join">Rejoindre</Link><Link href="/login">Connexion</Link></nav></div></header>{children}</>}
