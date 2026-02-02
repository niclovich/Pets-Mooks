
export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = (params) =>{
        return this.dao.get(params);
    }

    getById = (id) =>{
        return this.dao.getBy({_id: id});
    }

    getBy = (params) =>{
        return this.dao.getBy(params);
    }

    create = (doc) =>{
        return this.dao.save(doc);
    }

    update = (id,doc) =>{
        return this.dao.update(id,doc);
    }

    delete = (id) =>{
        return this.dao.delete(id);
    }
}