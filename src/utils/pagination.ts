export class Pagination {
    private model: any;
    private DTO: any;
    private sort: any;
    private context: any;
    private populate: Array<string>;
    private limit: number = 15;

    constructor(
        Model: any,
        DTO: any,
        sorting: { createdAt?: string, updatedAt?: string } = {createdAt: 'desc'},
        context: any = {}, populate: Array<string> = []) {
        this.model = Model;
        this.DTO = DTO;
        this.sort = sorting;
        this.context = context || {};
        this.populate = populate;
    }

    public toPublic(data: Array<object>) {
        return data.map((x: any) => this.DTO(x));
    }

    public async paginate(query: any, page: number) {
        const skip = (page - 1) * this.limit;

        const result = await this.model.find(query)
            .sort(this.sort)
            .skip(skip)
            .populate(this.populate.join(' '))
            .limit(this.limit);

        const count = await this.model.count(query);

        return {
            page,
            pages: Math.ceil(count / this.limit),
            result: this.toPublic(result),
        };

    }
}