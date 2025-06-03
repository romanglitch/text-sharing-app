import type { NextApiRequest, NextApiResponse } from 'next';
import { texts } from '../generate-link';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (!id || Array.isArray(id) || !texts[id]) {
            return res.status(404).json({ error: 'Текст не найден или уже удалён' });
        }

        const text = texts[id];
        res.status(200).json({ text });

        setTimeout(() => {
            delete texts[id];
        }, 60000);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Метод ${req.method} не разрешён`);
    }
}