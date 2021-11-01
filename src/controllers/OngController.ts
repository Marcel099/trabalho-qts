import { Request, Response } from 'express';

import { generateUniqueId } from '../utils/generateUniqueId';

class Ong {
  constructor(
    id: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.whatsapp = whatsapp
    this.city = city
    this.uf = uf
  }

  id: string
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}

const listOng = [];


class OngController {
  async index(request: Request, response: Response) {
    return response.json( [...listOng] )
  }

  async create(request: Request, response: Response) {
    const { name, email, whatsapp, city, uf } = request.body
    const id = generateUniqueId()

    const ong = new Ong(
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    )

    listOng.push(ong)

    return response.json({ id })
  }

  async update(request: Request, response: Response) {
    const { id } = request.query
    const { name, email, whatsapp, city, uf } = request.body

    const ongFound = listOng.find((ong) => {
      if (ong.id === id) {
        return true;
      }
    })

    if (ongFound === undefined) {
      return response.status(400).json({errorCode: "ONG not found"})
    }

    ongFound.name = name
    ongFound.email = email
    ongFound.whatsapp = whatsapp
    ongFound.city = city
    ongFound.uf = uf

    return response.status(204).send()
  }

  async delete(request: Request, response: Response) {
    const { id } = request.query

    const ongIndex = listOng.findIndex((ong) => {
      if (ong.id === id) {
        return true;
      }
    })

    if (ongIndex === -1) {
      return response.status(400).json({errorCode: "ONG not found"})
    }

    listOng.splice(ongIndex, 1)

    return response.status(204).send()
  }
}

export { OngController }