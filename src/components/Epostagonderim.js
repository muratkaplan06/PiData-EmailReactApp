// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// function Epostagonderim() {
//   const [kisiler, setKisiler] = useState([])
//   const [filtre, setFiltre] = useState({ cinsiyet: '', yasMin: '', yasMax: '' })
//   const [eposta, setEposta] = useState({ konu: '', icerik: '', gonderen: '' })

//   useEffect(() => {
//     // Kişi listesini ve diğer gerekli verileri almak için API isteği yapılabilir
//     fetchKisiler()
//   }, [])

//   const fetchKisiler = async () => {
//     try {
//       const response = await axios.get(
//         'https://localhost:7012/api/Kisi/Kisiler',
//       )
//       setKisiler(response.data)
//     } catch (error) {
//       console.error('Error fetching kisiler:', error)
//     }
//   }

//   const handleFiltrele = () => {
//     // Filtreleme seçeneklerine göre kişi listesini güncellemek için API isteği yapılabilir
//   }

//   const handleEpostaGonder = () => {
//     // E-posta göndermek için API isteği yapılabilir
//   }

//   return (
//     <div>
//       <h1>E-posta Gönderimi</h1>
//       <div>
//         <h2>Kişiler</h2>
//         {/* Kişi listesi */}
//         <p>Toplam kişi sayısı: {kisiler.length}</p>
//         <ul>
//           <li>Ad Soyad</li>
//           <li>Yaş</li>
//           <li>Cinsiyet</li>
//         </ul>
//         <ul>
//           {kisiler.map((kisi) => (
//             <li key={kisi.id}>
//               {kisi.ad} {kisi.soyad}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div></div>
//       <div>
//         <h2>Filtreleme</h2>
//         {/* Filtreleme seçenekleri */}
//         <input type="text" placeholder="Cinsiyet" />
//         <input type="number" placeholder="Yaş Min" />
//         <input type="number" placeholder="Yaş Max" />
//         <button onClick={handleFiltrele}>Filtrele</button>
//       </div>
//       <div>
//         <h2>E-posta Gönderimi</h2>
//         {/* E-posta gönderme formu */}
//         <input type="text" placeholder="Konu" />
//         <textarea placeholder="İçerik"></textarea>
//         <input type="email" placeholder="Gönderen E-posta Adresi" />
//         <button onClick={handleEpostaGonder}>Gönder</button>
//       </div>
//     </div>
//   )
// }

// export default Epostagonderim
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

function Epostagonderim() {
  const [kisiler, setKisiler] = useState([])

  useEffect(() => {
    fetchKisiler()
  }, [])

  const fetchKisiler = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7012/api/Kisi/Kisiler',
      )
      setKisiler(response.data)
    } catch (error) {
      console.error('Error fetching kisiler:', error)
    }
  }
  const handleFiltrele = () => {
    //     // Filtreleme seçeneklerine göre kişi listesini güncellemek için API isteği yapılabilir
  }

  const handleEpostaGonder = () => {
    //     // E-posta göndermek için API isteği yapılabilir
  }

  return (
    <div>
      <h1>E-posta Gönderimi</h1>
      <div>
        <h2>Kişiler</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>Soyad</TableCell>
                <TableCell>Yaş</TableCell>
                <TableCell>Cinsiyet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kisiler.map((kisi) => (
                <TableRow key={kisi.id}>
                  <TableCell>{kisi.ad}</TableCell>
                  <TableCell>{kisi.soyad}</TableCell>
                  <TableCell>{kisi.dogumtarihi}</TableCell>
                  <TableCell>{kisi.cinsiyet}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <h2>Filtreleme</h2>
        {/* Filtreleme seçenekleri */}
        <input type="text" placeholder="Cinsiyet" />
        <input type="number" placeholder="Yaş Min" />
        <input type="number" placeholder="Yaş Max" />
        <button onClick={handleFiltrele}>Filtrele</button>
      </div>
      <div>
        <h2>E-posta Gönderimi</h2>
        {/* E-posta gönderme formu */}
        <input type="text" placeholder="Konu" />
        <textarea placeholder="İçerik"></textarea>
        <input type="email" placeholder="Gönderen E-posta Adresi" />
        <button onClick={handleEpostaGonder}>Gönder</button>
      </div>
    </div>
  )
}

export default Epostagonderim
