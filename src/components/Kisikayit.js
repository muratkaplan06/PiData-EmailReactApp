import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Grid } from '@mui/material'

function Kisikayit() {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    telefon: '',
    eposta: '',
    dogumTarihi: '',
    epostaAdresi: '',
    cinsiyet: '',
    unvan: '',
    isyeri: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://localhost:44331/api/Kisi/KisiEkle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data)
      })
      .catch((error) => {
        console.error('API error:', error)
      })
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        2. Kişi Kayıtları
      </Typography>
      <Typography variant="body1" paragraph>
        Eposta gönderilecek kişilerin kaydedildiği bölümdür. İşletme, buraya
        kişileri kaydedecektir.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Ad"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Soyad"
              name="soyad"
              value={formData.soyad}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="E-posta"
              name="eposta"
              value={formData.eposta}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Doğum Tarihi"
              name="dogumTarihi"
              type="date"
              value={formData.dogumTarihi}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cinsiyet"
              name="cinsiyet"
              value={formData.cinsiyet}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Unvan"
              name="unvan"
              value={formData.unvan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="İş Yeri"
              name="isyeri"
              value={formData.isyeri}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Kisikayit
