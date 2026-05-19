import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { type Job } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase.from('jobs').select('*', { count: 'exact' })

    if (type) {
      query = query.eq('type', type)
    }

    if (city) {
      query = query.eq('city', city)
    }

    const { data, count, error } = await query
      .order('is_featured', { ascending: false })
      .order('is_urgent', { ascending: false })
      .order('created_at', { ascending: false })
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
    console.error('Jobs API error:', error)
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

    const {
      title,
      company,
      city,
      type,
      salary,
      description,
      is_permanent,
      is_urgent,
      is_featured,
    } = body

    // Validate required fields
    if (!title || !company || !description || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title,
        company,
        city,
        type,
        salary,
        description,
        is_permanent: is_permanent ?? true,
        is_urgent: is_urgent ?? false,
        is_featured: is_featured ?? false,
        is_new: true,
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
    console.error('Jobs POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
