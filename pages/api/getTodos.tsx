import { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifiedRecord, minifyRecords } from './utils/airtable.js';
import auth0 from './utils/auth0.js';

export default auth0.requireAuthentication(async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = await auth0.getSession(req);
    try {
        const records = await table
            .select({ filterByFormula: `userId = '${user.sub}'` })
            .firstPage();
        const formattedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(formattedRecords);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});
