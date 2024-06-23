import { connectDB } from "../server";
import db from "../config/db";

jest.mock('../config/db')

describe('connectDb', () => {
    it('should handle database connection errors', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'.toUpperCase()))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la base de datos'.toUpperCase()
            )
        )
    })
})