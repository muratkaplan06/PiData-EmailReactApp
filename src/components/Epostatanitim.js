import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Grid } from '@mui/material'

export default function EpostaTanitim() {
  const [formData, setFormData] = useState({
    adres: '',
    mailSunucuAdresi: '',
    kullaniciAdi: '',
    sifre: '',
    port: 0,
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

    fetch('https://localhost:7012/api/EpostaAdresi/EpostaAdresiEkle', {
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
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Eposta Adres Tanımı
      </Typography>
      <Typography variant="body1" paragraph>
        İşletme IT yöneticisi, sahip oldukları Eposta adreslerini buraya
        kaydedecektir.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-posta Adresi"
              name="adres"
              value={formData.adres}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mail Sunucu Adresi"
              name="mailSunucuAdresi"
              value={formData.mailSunucuAdresi}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              name="kullaniciAdi"
              value={formData.kullaniciAdi}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Şifre"
              name="sifre"
              type="password"
              value={formData.sifre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Port"
              name="port"
              type="number"
              value={formData.port}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
