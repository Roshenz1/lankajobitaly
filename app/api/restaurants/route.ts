import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase.from('restaurants').select('*', { count: 'exact' })

    if (city) {
      query = query.eq('city', city)
    }

    const { data, count, error } = await query
      .order('rating', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        offset,
        limit,
        total: count,
        hasMore: (offset + limit) < (count || 0),
      },
    })
  } catch (error) {
    console.error('Restaurants API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()

    const { name, description, city, image_url } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('restaurants')
      .insert({
        name,
        description,
        city,
        image_url,
      })
      .select()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data: data?.[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Restaurants POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
