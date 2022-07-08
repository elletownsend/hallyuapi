import fs from 'fs'
import { RequestHandler, RequestParamHandler } from 'express'
import { Artist } from '../models/artist'

const artists: Artist[] = JSON.parse(
  fs.readFileSync(`${__dirname}/../../src/data/all_artists.json`, 'utf-8')
)

const firstArtist: number = artists[0].Id
const lastArtist: number = artists[artists.length - 1].Id

export const checkId: RequestParamHandler = (req, res, next, value) => {
  if (value * 1 < firstArtist || value * 1 > lastArtist) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID.'
    })
  }
  next()
}

export const getAllArtists: RequestHandler = (req, res, next) => {
  let results: Artist[] = []

  if (req.query.q) {
    let q: string = req.query.q as string
    let query: string = decodeURIComponent(q)

    let searchResults: Artist[] = artists.filter((item) => {
      return (
        item.FullName.toLowerCase().includes(query.toLowerCase()) ||
        item.StageName.toLowerCase().includes(query.toLowerCase()) ||
        item.Group.toLowerCase().includes(query.toLowerCase()) ||
        item.KoreanName.toLowerCase().includes(query.toLowerCase()) ||
        item.KoreanStageName.toLowerCase().includes(query.toLowerCase())
      )
    })

    if (searchResults.length === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'No entry found matching given criteria.'
      })
    } else {
      results = searchResults
    }
  } else {
    results = artists
  }

  res.status(200).json({
    status: 'success',
    count: results.length,
    results: results
  })
}

export const getArtist: RequestHandler<{ id: string }> = (req, res, next) => {
  const artist: Artist = artists.find(
    (item) => item.Id.toString() === req.params.id
  )!

  res.status(200).json({
    status: 'success',
    results: artist
  })
}
