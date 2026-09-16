import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { code } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawName = typeof body.name === 'string' ? body.name : '';
    const name = rawName.trim().slice(0, 30) || 'Invité';

    // 1. Vérification des questions dans la base de données
    const qs = await db.question.findMany({ select: { id: true } });
    if (!qs.length) {
      return NextResponse.json(
        { error: 'Aucune question. Lance npm run db:seed.' },
        { status: 400 }
      );
    }

    // 2. Génération d'un code unique pour la partie
    let c = code();
    while (await db.game.findUnique({ where: { code: c } })) {
      c = code();
    }

    // 3. Création de la partie dans la base de données
    const g = await db.game.create({
      data: {
        code: c,
        questionIds: JSON.stringify(qs.map((q) => q.id)),
        players: {
          create: [{ name }]
        }
      }
    });

    return NextResponse.json({ code: g.code }, { status: 201 });
  } catch (err) {
    console.error('Erreur API /api/games:', err);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}
