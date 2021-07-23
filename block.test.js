
const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () =>{
    const timestamp = 'a-date';
    const lastHash = 'lasthash';
    const hash = 'hash';
    const data = ['blockchain','data'];
    const block = new Block({timestamp, lastHash, hash, data});

    it('has a timestamp, lastHash, hash and data property', () =>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
        expect(genesisBlock instanceof Block).toBe(true);
    });
    
    it('returns the genesis data', () => {
        expect(genesisBlock).toEqual(GENESIS_DATA);
    });
});

describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mind data';
    const minedBlock = Block.mineBlock({lastBlock, data});

    it('returns a Block instance', () => {
     expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` variable to be the `hash` to the next Block', () =>{
        expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
        expect(minedBlock.data).toEqual(data);
    });

    it('sets a `timestamp`', () => {
        expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
        expect(minedBlock.hash)
        .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
    });
});

});