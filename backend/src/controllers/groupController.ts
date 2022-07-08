import fs from 'fs'
import { RequestHandler, RequestParamHandler } from 'express'
import { Group } from '../models/group'

const groups: Group[] = JSON.parse(
  fs.readFileSync(`${__dirname}/../../src/data/all_groups.json`, 'utf-8')
)

const firstGroup: number = groups[0].Id
const lastGroup: number = groups[groups.length - 1].Id

export const checkId: RequestParamHandler = (req, res, next, value) => {
  if (value * 1 < firstGroup || value * 1 > lastGroup) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID.'
    })
  }
  next()
}

export const getAllGroups: RequestHandler = (req, res, next) => {
  let results: Group[] = []

  if (req.query.q) {
    let q: string = req.query.q as string
    let query: string = decodeURIComponent(q)

    let searchResults: Group[] = groups.filter((item) => {
      return (
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.ShortName.toLowerCase().includes(query.toLowerCase()) ||
        item.KoreanName.toLowerCase().includes(query.toLowerCase())
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
    results = groups
  }

  res.status(200).json({
    status: 'success',
    count: results.length,
    results: results
  })
}

export const getGroup: RequestHandler<{ id: string }> = (req, res, next) => {
  const group: Group = groups.find(
    (item) => item.Id.toString() === req.params.id
  )!

  res.status(200).json({
    status: 'success',
    results: group
  })
}
