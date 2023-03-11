'use strict'

const { date, $filter, $jsonld, toRule } = require('@metascraper/helpers')

const toDate = toRule(date)

const dateRules = () => {
  return [
    toDate($ => $('meta[name="date" i]').attr('content')),
    toDate($ => $('[itemprop*="date" i]').attr('content')),
    toDate($ => $('time[itemprop*="date" i]').attr('datetime')),
    toDate($ => $('time[datetime]').attr('datetime')),
    toDate($ => $('meta[name*="dc.date" i]').attr('content')),
    toDate($ => $('meta[name*="dcterms.date" i]').attr('content')),
    toDate($ => $('[property*="dc:date" i]').attr('content')),
    toDate($ => $filter($, $('[class*="byline" i]'))),
    toDate($ => $filter($, $('[class*="dateline" i]'))),
    toDate($ => $filter($, $('[id*="metadata" i]'))),
    toDate($ => $filter($, $('[class*="metadata" i]'))), // twitter, move into a bundle of rules
    toDate($ => $filter($, $('[id*="date" i]'))),
    toDate($ => $filter($, $('[class*="date" i]'))),
    toDate($ => $filter($, $('[id*="post-timestamp" i]'))),
    toDate($ => $filter($, $('[class*="post-timestamp" i]'))),
    toDate($ => $filter($, $('[id*="post-meta" i]'))),
    toDate($ => $filter($, $('[class*="post-meta" i]'))),
    toDate($ => $filter($, $('[id*="time" i]'))),
    toDate($ => $filter($, $('[class*="time" i]')))
  ]
}

const datePublishedRules = () => {
  return [
    toDate($jsonld('datePublished')),
    toDate($jsonld('dateCreated')),
    toDate($ => $('meta[property*="published_time" i]').attr('content')),
    toDate($ => $('meta[property*="release_date" i]').attr('content')),
    toDate($ => $('[itemprop="datepublished" i]').attr('content')),
    toDate($ => $('time[datetime][pubdate]').attr('datetime')),
    toDate($ => $('meta[name*="dc.date.issued" i]').attr('content')),
    toDate($ => $('meta[name*="dc.date.created" i]').attr('content')),
    toDate($ => $('[property*="dc:created" i]').attr('content')),
    toDate($ => $filter($, $('[id*="publish" i]'))),
    toDate($ => $filter($, $('[class*="publish" i]')))
  ]
}

const dateModifiedRules = () => {
  return [
    toDate($jsonld('dateModified')),
    toDate($ => $('meta[property*="updated_time" i]').attr('content')),
    toDate($ => $('meta[property*="modified_time" i]').attr('content')),
    toDate($ => $('[itemprop*="datemodified" i]').attr('content'))
  ]
}

module.exports = ({ datePublished, dateModified } = { datePublished: false, dateModified: false }) => {
  const result = {
    date: dateModifiedRules().concat(datePublishedRules(), dateRules())
  }

  if (datePublished) {
    result.datePublished = datePublishedRules()
  }

  if (dateModified) {
    result.dateModified = dateModifiedRules()
  }

  return result
}
