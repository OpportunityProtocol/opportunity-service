import IPFS from 'ipfs-core';

class OpportunityStorageProvider {
    private ipfsProvider = null;

    constructor() {
        this.ipfsProvider = IPFS.create();
    }

    async storeContent(content: any): Promise<string> {
        const { cid } = await this.ipfsProvider.add(content)
        return cid;
    }

    async storeRawContent(content : any) {
        const parsedContent = JSON.stringify(content);
        const cid = await this.ipfsProvider.add(parsedContent);
        console.log('Storage Provider: ' + 'Storing raw content with cid: ' + cid);
    }

    async retrieveContent(cid: string): Promise<AsyncIterable<Object>> | Promise<number> {
        const file = this.ipfsProvider.get(cid);
        console.log(file.type, file.path)

        if (!file.content) return -1;

        const content = []

        for await (const chunk of file.content) {
            content.push(chunk)
        }

        console.log('Returning content from storage provider: ' + content);
    }
}

const opportunityStorageProvider: OpportunityStorageProvider = new OpportunityStorageProvider();
export default opportunityStorageProvider;