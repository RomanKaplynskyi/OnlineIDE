export interface IRepository<T> {
    /**
     * This function make select from table where fieldName = field and return first val
     * @ K - field type
     * @param field { K } - search filter in select
     * @param fieldName {string} - name of colon in select
     * */
    findByField<K>( fieldName: string, field: K ) : Promise<T>;

    /** This function must save data to DB
     * @param entity - object with field to save */
    saveEntity(entity: T) : Promise<T>;

    /**
     * This function make select from table where fieldName = field
     * @ K - field type
     * @param field { K } - search filter in select
     * @param fieldName {string} - name of colon in select
     * */
    findAllByField<K>(fieldName: string, field: K | null) : Promise<Array<T>>;
}
