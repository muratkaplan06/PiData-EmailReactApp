import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

function Raporlama() {
  const [epostaDetaylar, setEpostaDetaylar] = useState([])

  useEffect(() => {
    fetchEpostaDetaylar()
  }, [])

  const fetchEpostaDetaylar = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7012/api/EpostagonderimDetay/EpostagonderimDetaylarWithIncludes',
      )
      setEpostaDetaylar(response.data)
    } catch (error) {
      console.error('Error fetching eposta detaylar:', error)
    }
  }

  return (
    <div>
      <h1>E-posta Gönderim Detayları</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tarih</TableCell>
              <TableCell>Gönderen E-posta Adresi</TableCell>
              <TableCell>Konu</TableCell>
              <TableCell>İçerik</TableCell>
              <TableCell>İletim Durumu</TableCell>
              <TableCell>Kişi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {epostaDetaylar.map((detay) => (
              <TableRow key={detay.epostaGonderimId}>
                <TableCell>{detay.gonderimTarihi}</TableCell>
                <TableCell>
                  {detay.epostaGonderim.gonderenEpostaAdresi}
                </TableCell>
                <TableCell>{detay.epostaGonderim.konusu}</TableCell>
                <TableCell>{detay.epostaGonderim.icerigi}</TableCell>
                <TableCell>
                  {detay.gonderimDurumu ? 'Başarılı' : 'Başarısız'}
                </TableCell>
                <TableCell>
                  {detay.kisi.ad} {detay.kisi.soyad} ({detay.kisi.eposta})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Raporlama
