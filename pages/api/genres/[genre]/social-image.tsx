/* eslint-disable @next/next/no-img-element */

import * as React from 'react'
import { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'

import * as appConfig from '@/lib/config'
import { genreTitleMap } from '@/lib/genres'

const interRegularFontP = fetch(
  new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const interSemiBoldFontP = fetch(
  new URL('../../../../public/fonts/Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export const config = {
  runtime: 'experimental-edge'
}

export default async function socialImageForGenre(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({
        error: 'method not allowed'
      }),
      {
        status: 405,
        headers: { 'content-type': 'application/json' }
      }
    )
  }

  const { searchParams } = new URL(req.url)
  const genre = searchParams.get('genre')
  const genreTitle = genreTitleMap[genre!]
  if (!genre || !genreTitle) {
    return new Response(JSON.stringify({ error: `invalid genre "${genre}"` }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    })
  }

  const [interRegularFont, interSemiBoldFont] = await Promise.all([
    interRegularFontP,
    interSemiBoldFontP
  ])

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1F2027',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          color: 'black'
        }}
      >
        <img
          src={appConfig.socialImageBgUrl}
          alt=''
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover'
          }}
        />

        <div
          style={{
            position: 'relative',
            width: 900,
            height: 465,
            display: 'flex',
            flexDirection: 'column',
            border: '16px solid rgba(0,0,0,0.3)',
            borderRadius: 8,
            zIndex: '1'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 24,
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 90,
                fontWeight: 600,
                fontFamily: 'Inter'
              }}
            >
              {genreTitle}
            </div>

            <div style={{ fontSize: 48, opacity: 0.7, display: 'flex' }}>
              The top {genreTitle.toLowerCase()} of all time
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 104,
            height: 128,
            width: 128,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            border: '8px solid rgba(0,0,0,0.3)',
            backgroundColor: '#fff',
            zIndex: '5'
          }}
        >
          <img
            src={appConfig.socialIconUrl}
            alt=''
            style={{
              width: '60%'
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          style: 'normal',
          weight: 400
        },
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 600
        }
      ]
    }
  )
}
