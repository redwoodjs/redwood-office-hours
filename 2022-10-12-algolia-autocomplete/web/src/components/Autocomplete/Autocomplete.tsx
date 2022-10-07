import React, { createElement, Fragment, useEffect, useRef } from 'react'

import { autocomplete } from '@algolia/autocomplete-js'
import type { ApolloClient } from '@apollo/client'
import '@algolia/autocomplete-theme-classic'
import { render } from 'react-dom'

export interface AutocompleteProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  client: ApolloClient<Object>
  query: string
}

export const debouncePromise = (fn, time) => {
  let timerId = undefined

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId)
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time)
    })
  }
}

export const debounced = debouncePromise((items) => Promise.resolve(items), 300)

export const Autocomplete = (props) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div ref={containerRef} />
}
