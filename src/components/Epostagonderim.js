import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material'

function Epostagonderim() {
  const [kisiler, setKisiler] = useState([])
  const [filtre, setFiltre] = useState({
    cinsiyet: '',
    yasMin: '',
    yasMax: '',
  })
  const [gonderenEmail, setGonderenEmail] = useState('')
  const [epostaAdresleri, setEpostaAdresleri] = useState([])
  const [epostaIcerik, setEpostaIcerik] = useState('')
  const [epostaKonu, setEpostaKonu] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    fetchKisiler()
    fetchEpostaAdresleri()
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

  const fetchEpostaAdresleri = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7012/api/EpostaAdresi/EpostaAdresleri',
      )
      setEpostaAdresleri(response.data)
    } catch (error) {
      console.error('Error fetching eposta adresleri:', error)
    }
  }

  const handleFiltrele = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7012/api/Kisi/KisilerwithFilter?cinsiyet=${filtre.cinsiyet}&yasMin=${filtre.yasMin}&yasMax=${filtre.yasMax}`,
      )
      setKisiler(response.data)
    } catch (error) {
      console.error('Error filtering kisiler:', error)
    }
  }

  const handleEpostaGonder = async () => {
    try {
      const epostaBilgileri = {
        konu: 'E-posta Konusu',
        icerik: epostaIcerik,
        gonderenEmail: gonderenEmail,
        kisiListesiIds: kisiler.map((kisi) => kisi.id),
      }
      console.log('E-posta bilgileri:', epostaBilgileri)
      const response = await axios.post(
        'https://localhost:7012/api/EpostaAdresiGonderim/Gonder',
        epostaBilgileri,
      )

      console.log('E-posta gönderme başarılı:', response.data)

      // Form alanlarını sıfırla
      setEpostaKonu('')
      setGonderenEmail('')
      setEpostaIcerik('')
      setKisiler([])

      // Snackbar'ı aç
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Error sending e-posta:', error)
    }
  }

  const handleChange = (e) => {
    setFiltre({ ...filtre, [e.target.name]: e.target.value })
  }

  const handleGonderenEmailChange = (e) => {
    setGonderenEmail(e.target.value)
  }

  const handleIcerikChange = (e) => {
    setEpostaIcerik(e.target.value)
  }

  const handleKonuChange = (e) => {
    setEpostaKonu(e.target.value)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
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
                  <TableCell>{kisi.yas}</TableCell>
                  <TableCell>{kisi.cinsiyet}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <h2>Filtreleme</h2>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Cinsiyet"
              name="cinsiyet"
              value={filtre.cinsiyet}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Yaş Min"
              name="yasMin"
              type="number"
              value={filtre.yasMin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Yaş Max"
              name="yasMax"
              type="number"
              value={filtre.yasMax}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFiltrele}
            >
              Filtrele
            </Button>
          </Grid>
        </Grid>
        <div>
          <h2>E-posta Gönderimi</h2>
          {/* E-posta gönderme formu */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Konu"
                name="konu"
                value={epostaKonu}
                onChange={handleKonuChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="gonderen-email-label">
                  Gönderen E-posta Adresi
                </InputLabel>
                <Select
                  labelId="gonderen-email-label"
                  id="gonderen-email-select"
                  value={gonderenEmail}
                  onChange={handleGonderenEmailChange}
                >
                  {epostaAdresleri.map((epostaAdres) => (
                    <MenuItem key={epostaAdres.id} value={epostaAdres.adres}>
                      {epostaAdres.adres}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="İçerik"
                name="icerik"
                value={epostaIcerik}
                onChange={handleIcerikChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEpostaGonder}
              >
                E-posta Gönder
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="E-posta başarıyla gönderildi."
      />
    </div>
  )
}

export default Epostagonderim
