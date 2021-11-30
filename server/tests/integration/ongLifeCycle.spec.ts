
import request from 'supertest'

import { app } from '../../src/app'

type OngData = {
  id: string
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}
let list_ong_id: string[] = []

describe('ONG', () => {

  let ongs = [
    { 
      name: 'APAEE',
      email: 'contato@apae.com',
      whatsapp: '078901521548',
      city: 'Soledade',
      uf: 'RS'
    },
    { 
      name: 'APAD',
      email: 'contato@apad.com',
      whatsapp: '012345678901',
      city: 'Fontoura Xavier',
      uf: 'RS'
    },
    { 
      name: 'Renascer da Esperança',
      email: 'contato@renascer_esperanca.com',
      whatsapp: '042158154848',
      city: 'Porto Alegre',
      uf: 'RS'
    },
  ]

  let new_ongs = [
    { 
      name: 'APAE',
      email: 'contato@apae.com',
      whatsapp: '078901521548',
      city: 'Soledade',
      uf: 'RS'
    },
    { 
      name: 'Centro Social da Rua',
      email: 'contato@social_rua.com',
      whatsapp: '015484548484',
      city: 'Porto Alegre',
      uf: 'RS'
    },
  ]
  
  
  ongs.forEach(ong => {
    it(`should be able to create a new ONG`, async () => {
      const response = await request(app)
        .post('/ongs')
        .send(ong)
        .expect(200)
      
      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)

      list_ong_id.push(response.body.id)
    })
  })


  it(`should be able to list the ONGs`, async () => {
    const response = await request(app)
      .get('/ongs')
      .expect(200)

    expect(response.body).toHaveLength(3)

    response.body.forEach(ong => {

      expect(ong).toHaveProperty('id')
      expect(ong).toHaveProperty('name')
      expect(ong).toHaveProperty('email')
      expect(ong).toHaveProperty('whatsapp')
      expect(ong).toHaveProperty('city')
      expect(ong).toHaveProperty('uf')

      expect(ong.id).toHaveLength(8)
      expect(ong.uf).toHaveLength(2)
    })
  })

  it(`should be able to get an ONG`, async () => {
    const response = await request(app)
      .get('/ongs')
      .query({id: list_ong_id[0]})
      .expect(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('whatsapp')
    expect(response.body).toHaveProperty('city')
    expect(response.body).toHaveProperty('uf')
  })

  it(`should not be able to get an ONG that doesn't exist`, async () => {
    const response: any = await request(app)
      .get('/ongs')
      .query({id: 'itsnotacode'})
      .expect(400)

    expect(response.body).toHaveProperty('errorCode')
    expect(response.body.errorCode).toBe('ONG not found')
  })


  it(`should be able to update the second ONG created`, async () => {
    const ongId = list_ong_id[1]

    const responsePut = await request(app)
      .put('/ongs')
      .query({id: ongId})
      .send(new_ongs[1])
      .expect(204)

    expect(responsePut.body).toStrictEqual({})


    const responseGet: any = await request(app)
      .get('/ongs')
      .query({id: ongId})
      .expect(200)

    expect(responseGet.body.id).toBe(ongId)
    expect(responseGet.body.name).toBe('Centro Social da Rua')
    expect(responseGet.body.email).toBe('contato@social_rua.com')
    expect(responseGet.body.whatsapp).toBe('015484548484')
    expect(responseGet.body.city).toBe('Porto Alegre')
    expect(responseGet.body.uf).toBe('RS')
  })

  it(`should not be able to update an ONG that doesn't exist`, async () => {
    const response = await request(app)
      .put('/ongs')
      .query({id: 'itsnotacode'})
      .send(new_ongs[0])
      .expect(400)

    expect(response.body).toHaveProperty('errorCode')
    expect(response.body.errorCode).toBe('ONG not found')
  })


  it(`should be able to delete the first ONG created`, async () => {
    const ongId = list_ong_id[0]

    const responseDelete = await request(app)
      .delete('/ongs')
      .query({id: ongId})
      .expect(204)

    expect(responseDelete.body).toStrictEqual({})


    const responseGet = await request(app)
      .delete('/ongs')
      .query({id: ongId})
      .expect(400)

    expect(responseGet.body).toHaveProperty('errorCode')
    expect(responseGet.body.errorCode).toBe('ONG not found')
  })

  it(`should not be able to delete an ONG that doesn't exist`, async () => {
    const response = await request(app)
      .delete('/ongs')
      .query({id: 'itsnotacode'})
      .expect(400)

    expect(response.body).toHaveProperty('errorCode')
    expect(response.body.errorCode).toBe('ONG not found')
  })
})
