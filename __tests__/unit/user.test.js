const { User } = require('../../src/database/models');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    })
    it('Should encrypt user password', async () => {
        const user = await User.create({
            name: 'Gustavo Olivera',
            email: 'gustavo.oliveira@silkendevelopment.com.br',
            password: '123123'
        })
        const compareHash = await bcrypt.compare(user.password, user.password_hash) 
        expect(compareHash).toBe(true);
    })
})