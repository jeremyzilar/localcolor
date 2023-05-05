import { NextApiRequest, NextApiResponse } from 'next';
import { table } from './utils/airtable';
import auth0 from './utils/auth0';
import OwnsRecord from './middleware/OwnsRecord';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;

    try {
        const deletedRecord = await table.destroy([id]);
        res.statusCode = 200;
        res.json(deletedRecord);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};

export default auth0.requireAuthentication(OwnsRecord(handler));
