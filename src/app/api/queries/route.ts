import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { clientName, clientEmail, title, description, reference, followUpDate } = await request.json();

    // First, create or get the client
    const client = await prisma.client.upsert({
      where: { email: clientEmail },
      update: { name: clientName },
      create: {
        name: clientName,
        email: clientEmail,
      },
    });

    // Then create the query
    const query = await prisma.clientQuery.create({
      data: {
        title: title,
        description: description,
        status: 'PENDING',
        reference: reference,
        clientId: client.id,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
      },
    });

    return NextResponse.json({ query });
  } catch (error) {
    console.error('Error saving query:', error);
    return NextResponse.json(
      { error: 'Failed to save query' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const queries = await prisma.clientQuery.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Error fetching queries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch queries' },
      { status: 500 }
    );
  }
}
