import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'

function Kisikayit() {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    telefon: '',
    eposta: '',
    yas: '',
    cinsiyet: '', // Cinsiyet alanı eklendi
    unvan: '',
    isyeri: '',
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://localhost:7012/api/Kisi/KisiEkle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data)
        setOpenSnackbar(true)
        setFormData({
          ad: '',
          soyad: '',
          telefon: '',
          eposta: '',
          yas: '',
          cinsiyet: '',
          unvan: '',
          isyeri: '',
        })
      })
      .catch((error) => {
        console.error('API error:', error)
      })
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
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
              label="Yaş"
              name="yas"
              type="number"
              value={formData.yas}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="cinsiyet-label">Cinsiyet</InputLabel>
              <Select
                labelId="cinsiyet-label"
                id="cinsiyet-select"
                value={formData.cinsiyet}
                onChange={handleChange}
                name="cinsiyet"
                required // Cinsiyet alanı gerekli olduğu belirtildi
              >
                <MenuItem value="Erkek">Erkek</MenuItem>
                <MenuItem value="Kadın">Kadın</MenuItem>
              </Select>
            </FormControl>
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Kişi kaydedildi."
      />
    </Container>
  )
}

export default Kisikayit
