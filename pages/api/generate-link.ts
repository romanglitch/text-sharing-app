import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

type TextsStore = { [id: string]: string };
const texts: TextsStore = {};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { text } = req.body as { text?: string };

        if (!text) {
            return res.status(400).json({ error: 'Текст обязателен' });
        }

        const id = uuidv4();
        texts[id] = text;

        res.status(200).json({ link: `/view/${id}` });

        // Авто удаление ссылки через 60 сек
        setTimeout(() => {
            delete texts[id];
        }, 60000);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Метод ${req.method} не разрешён`);
    }
}

export { texts };