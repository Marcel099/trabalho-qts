import { Request, Response } from 'express';

import { connection } from '../database/connection'
import { generateUniqueId } from '../utils/generateUniqueId';

interface OngData {
  id?: string
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}

class OngController {
  async index(request: Request, response: Response) {
    const { id } = request.query
    
    if (id === undefined) {
      const ongs = await connection<OngData>('ongs')
        .select('*')
        
      return response.json( ongs )
    } else {
      const ongs = await connection<OngData>('ongs')
        .select('*')
        .where('id', String(id))
  
      if (ongs.length === 0) {
        return response.status(400).json({errorCode: "ONG not found"})
      }

      response.json( ongs[0] )
    }
  }

  async create(request: Request, response: Response) {
    const { name, email, whatsapp, city, uf } = request.body
    const id = generateUniqueId()

    const ong: OngData = {
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    }

    await connection<OngData>('ongs')
      .insert(ong)

    return response.json({ id })
  }

  async update(request: Request, response: Response) {
    const { id } = request.query
    const { name, email, whatsapp, city, uf } = request.body

    const ongs = await connection<OngData>('ongs')
      .select('*')
      .where('id', String(id))

    if (ongs.length === 0) {
      return response.status(400).json({errorCode: "ONG not found"})
    }

    const ong: OngData = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }

    await connection<OngData>('ongs')
      .where('id', String(id))
      .update(ong)

    return response.status(204).send()
  }

  async delete(request: Request, response: Response) {
    const { id } = request.query

    const ongs = await connection<OngData>('ongs')
      .select('*')
      .where('id', String(id))

    if (ongs.length === 0) {
      return response.status(400).json({errorCode: "ONG not found"})
    }

    
    await connection<OngData>('ongs')
      .where('id', String(id))
      .delete()

    return response.status(204).send()
  }
}

export { OngController }