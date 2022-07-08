import fs from 'fs'
import { RequestHandler, RequestParamHandler } from 'express'
import { Actor } from '../models/actor'

const actors: Actor[] = JSON.parse(
  fs.readFileSync(`${__dirname}/../../src/data/all_actors.json`, 'utf-8')
)

const firstActor: number = actors[0].Id
const lastActor: number = actors[actors.length - 1].Id

export const checkId: RequestParamHandler = (req, res, next, value) => {
  if (value * 1 < firstActor || value * 1 > lastActor) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID.'
    })
  }
  next()
}

export const getAllActors: RequestHandler = (req, res, next) => {
  let results: Actor[] = []

  if (req.query.q) {
    let q: string = req.query.q as string
    let query: string = decodeURIComponent(q)

    let searchResults: Actor[] = actors.filter((item) => {
      return (
        item.FullName.toLowerCase().includes(query.toLowerCase()) ||
        item.StageName.toLowerCase().includes(query.toLowerCase()) ||
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
    results = actors
  }

  res.status(200).json({
    status: 'success',
    count: results.length,
    results: results
  })
}

export const getActor: RequestHandler<{ id: string }> = (req, res, next) => {
  const actor: Actor = actors.find(
    (item) => item.Id.toString() === req.params.id
  )!

  res.status(200).json({
    status: 'success',
    results: actor
  })
}
